// models/tempData.model.js
const mongoose = require('mongoose');

const TempDataSchema = new mongoose.Schema({
  source: { type: String},
  receivedAt: { type: Date, default: Date.now },
  processed: { type: Boolean, default: false },
  processedAt: { type: Date, default: null },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model('TempData', TempDataSchema);


