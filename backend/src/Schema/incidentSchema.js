// models/tempData.model.js
const mongoose = require('mongoose');

const IncidentTableSchema = new mongoose.Schema({
  incidentId: { type: mongoose.Schema.Types.ObjectId, required: true},
  source: { type: String},
  receivedAt: { type: Date, default: Date.now },
  processed: { type: Boolean, default: false },
  processedAt: { type: Date, default: null },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model('IncidentTable', IncidentTableSchema);


