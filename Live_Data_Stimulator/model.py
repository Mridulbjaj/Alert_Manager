
import os
import sys
import json
import time
import uuid
import shutil
import logging
import argparse
import threading
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, render_template, url_for
from werkzeug.utils import secure_filename

# Import the processing functions from the existing script
# Assuming the llm.py is in the same directory
from llm import process_directory, format_alert_json, extract_raw_json, analyze_with_gemini

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('alert-api')

app = Flask(_name_)

# Configuration
UPLOAD_FOLDER = 'uploads'
RESULTS_FOLDER = 'results'
ALLOWED_EXTENSIONS = {'json'}
MAX_WORKERS_DEFAULT = 20

# Create directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# Store job status information
jobs = {}

def allowed_file(filename):
    """Check if the file has an allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_job_sync(job_id, input_dir, output_dir, max_workers=1000):
    """Process a job synchronously and return the results"""
    try:
        logger.info(f"Starting job {job_id} with {max_workers} workers")
        
        # Update job status to 'processing'
        jobs[job_id]['status'] = 'processing'
        jobs[job_id]['start_time'] = datetime.now().isoformat()
        start_time = time.time()
        
        # Process the directory
        process_directory(input_dir, output_dir, max_workers)
        
        end_time = time.time()
        processing_time = end_time - start_time
        
        # Update job status to 'completed'
        jobs[job_id]['status'] = 'completed'
        jobs[job_id]['end_time'] = datetime.now().isoformat()
        jobs[job_id]['processing_time'] = processing_time
        
        # Scan output directory to get result files
        result_files = [f for f in os.listdir(output_dir) if os.path.isfile(os.path.join(output_dir, f))]
        jobs[job_id]['result_files'] = result_files
        jobs[job_id]['result_count'] = len(result_files)
        
        # Look for summary file
        summary = None
        summary_file = os.path.join(output_dir, "processing_summary.json")
        if os.path.exists(summary_file):
            with open(summary_file, 'r') as f:
                summary = json.load(f)
                jobs[job_id]['summary'] = summary
        
        logger.info(f"Job {job_id} completed successfully. Processed {len(result_files)} files in {processing_time:.2f} seconds.")
        
        # Prepare response data
        response_data = {
            'job_id': job_id,
            'status': 'completed',
            'message': f"Completed processing {len(result_files)} files in {processing_time:.2f} seconds",
            'processing_time': round(processing_time, 2),
            'successfully_processed': len(result_files),
            'failed': 0,  # This would need to be tracked during processing
            'input_folder': input_dir,
            'output_folder': output_dir,
            'result_url': f'/api/results/{job_id}'
        }
        
        # Add summary data if available
        if summary:
            response_data['unique_threat_ids'] = summary.get('unique_threat_ids', 0)
            response_data['summary_file'] = f"Summary saved to {output_dir}/processing_summary.json"
        
        return response_data
        
    except Exception as e:
        # Update job status to 'failed'
        logger.error(f"Job {job_id} failed: {str(e)}")
        jobs[job_id]['status'] = 'failed'
        jobs[job_id]['error'] = str(e)
        jobs[job_id]['end_time'] = datetime.now().isoformat()
        
        return {
            'job_id': job_id,
            'status': 'failed',
            'error': str(e)
        }


@app.route('/api/process-folder', methods=['POST'])
def process_folder():
    """
    API endpoint to process a folder path on the server
    
    Expected JSON format:
    {
        "input_folder": "/path/to/input/folder",
        "output_folder": "/path/to/output/folder", (optional)
        "max_workers": 20 (optional)
    }
    
    Returns complete processing results instead of just job ID
    """
    try:
        data = request.json
        
        if not data or 'input_folder' not in data:
            return jsonify({'error': 'Input folder path not specified'}), 400
        
        input_folder = data['input_folder']
        
        # Validate input folder
        if not os.path.exists(input_folder) or not os.path.isdir(input_folder):
            return jsonify({'error': f'Input folder does not exist or is not a directory: {input_folder}'}), 400
        
        # Create job ID
        job_id = str(uuid.uuid4())
        
        # Determine output folder - no longer creating subdirectories by default
        if 'output_folder' in data and data['output_folder']:
            output_folder = data['output_folder']
        else:
            output_folder = RESULTS_FOLDER  # Use the main results folder directly
        
        # Ensure output folder exists
        os.makedirs(output_folder, exist_ok=True)
        
        # Get max workers parameter
        max_workers = int(data.get('max_workers', MAX_WORKERS_DEFAULT))
        
        # Count JSON files in the input folder
        json_files = [f for f in os.listdir(input_folder) 
                     if f.lower().endswith('.json') and not f.startswith('_')]
        file_count = len(json_files)
        
        if file_count == 0:
            return jsonify({'error': 'No JSON files found in the input folder'}), 400
        
        # Initialize job data
        jobs[job_id] = {
            'id': job_id,
            'status': 'queued',
            'created_at': datetime.now().isoformat(),
            'file_count': file_count,
            'input_folder': input_folder,
            'output_folder': output_folder,
            'max_workers': max_workers
        }
        
        logger.info(f"Starting synchronous processing of {file_count} files from {input_folder}")
        
        # Process the job synchronously and get results
        results = process_job_sync(job_id, input_folder, output_folder, max_workers)
        
        # Return the completed processing results
        return jsonify(results)
        
    except Exception as e:
        logger.error(f"Error in process_folder: {str(e)}")
        return jsonify({'error': str(e)}), 500


if _name_ == "_main_":
    parser = argparse.ArgumentParser(description='Start the Flask API for alert processing')
    parser.add_argument('--port', '-p', type=int, default=5000, help='Port to run the API on')
    parser.add_argument('--host', type=str, default='127.0.0.1', help='Host to run the API on')
    parser.add_argument('--debug', action='store_true', help='Run in debug mode')
    
    args = parser.parse_args()
    
    print("="*50)
    print(f"Starting Alert Processing API on http://{args.host}:{args.port}")
    print(f"Upload folder: {os.path.abspath(UPLOAD_FOLDER)}")
    print(f"Results folder: {os.path.abspath(RESULTS_FOLDER)}")
    print("="*50)
    print("Available endpoints:")
    print("  POST /api/process-folder   - Process a folder of alerts")
    
    
    app.run(host=args.host, port=args.port, debug=args.debug)