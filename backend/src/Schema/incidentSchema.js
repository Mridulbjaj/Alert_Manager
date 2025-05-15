const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  incidentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  temporaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TemporaryIncident', // Replace with your actual referenced model name
    default: null
  },
  source: {
    type: String,
    default: 'unknown'
  },
  receivedAt: {
    type: Date,
    default: Date.now
  },
  processed: {
    type: Boolean,
    default: false
  },
  processedAt: {
    type: Date,
    default: null
  },
  threatName: {
    type: String,
    default: 'unknown'
  },
  filePath: {
    type: String,
    default: 'unknown'
  },
  fileVerificationType: {
    type: String,
    default: 'unknown'
  },
  originatorProcess: {
    type: String,
    default: 'unknown'
  },
  confidenceLevel: {
    type: String,
    default: 'unknown'
  },
  processUser: {
    type: String,
    default: 'unknown'
  },
  computerName: {
    type: String,
    default: 'unknown'
  },
  loggedInUser: {
    type: String,
    default: 'unknown'
  },
  Agent_Verdict: {
    type: String,
    default: 'pending'
  },
  Report: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Incident = mongoose.model('IncidentTable', incidentSchema);

module.exports = Incident;


