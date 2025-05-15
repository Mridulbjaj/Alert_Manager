const { ObjectId } = require('mongodb');
const TempDataSchema = require('../Schema/temporalSchema'); // Assuming you have a schema for tempData
const IncidentSchema = require('../Schema/incidentSchema'); // Assuming you have a schema for incidentData

class Alert {
 
  constructor(id){
    this.id = id;
  }

  async updateAlert(verdict, report) {
    try {
      const alert = await IncidentSchema.findOne({ _id: this.id });
      if (!alert) {
        throw new Error('Alert not found');
      }
      alert.processed = true;
      alert.processedAt = new Date();
      alert.Agent_Verdict = verdict;
      alert.Report = report;
      await alert.save();
      return alert;
    } catch (error) {
      console.error('Error fetching alert:', error);
      throw new Error('Error fetching alert');
    }
  }

  static async fetchAlerts(query, limit) {
  try{
      const alerts = await IncidentSchema.find(query).sort({ createdAt: -1 }).limit(limit);
       return alerts;
    }catch (error) {
      console.error('Error fetching alerts:', error);
      throw new Error('Error fetching alerts');
    }
  }

  static async setIncident(incident) {
    const alert = {
      incidentId : new ObjectId(),
      createdAt : new Date(),
      temporaryId : incident._id,
      source : incident.source || 'unknown',
      receivedAt : incident.receivedAt || new Date(),
      processed : incident.processed || false,
      processedAt : incident.processedAt || null,
      threatName : incident.payload.threatInfo.threatName || 'unknown',
      filePath : incident.payload.threatInfo.filePath || 'unknown',
      fileVerificationType : incident.payload.threatInfo.fileVerificationType || 'unknown',
      originatorProcess : incident.payload.threatInfo.originatorProcess || 'unknown',
      confidenceLevel : incident.payload.threatInfo.confidenceLevel || 'unknown',
      processUser : incident.payload.threatInfo.processUser || 'unknown',
      computerName : incident.payload.agentRealtimeInfo.agentComputerName || 'unknown',
      loggedInUser : incident.payload.agentDetectionInfo.agentLastLoggedInUserName || 'unknown',
      Agent_Verdict :  'pending',
      Report : null,
    }
    try{
        const result = await IncidentSchema.create(alert);
      
        if (result) {
          incident.processed = true;
          incident.processedAt = alert.createdAt;
          // This line will throw if something goes wrong
          const storingResult = await TempDataSchema.updateOne(
            { _id: incident._id },
            { $set: { processed: true, processedAt: alert.createdAt } }
          );
      //Will use storingResult later
           return {
            success: true,
            message: 'TempData updated successfully',
            data : result
          };
        }
      } catch (error) {
        // This catches errors from both `create` and `updateOne`
        console.error('Error:', error);
        return {
          success: false,
          message: 'An error occurred',
          error: error.message
        };
      }
  }

 
}

module.exports = Alert;