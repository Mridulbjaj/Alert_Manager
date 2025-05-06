const express = require("express");
const Router = express.Router();
const IngestMiddleware=require('../Middleware/ingest.js');
const AlertController=require('../controller/Alert.js');

Router.post("/api/ingest",IngestMiddleware.handleIngest); 
Router.get("/api/fetchalert",AlertController.fetchAlerts);

module.exports = Router;