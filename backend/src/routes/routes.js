const express = require("express");
const Router = express.Router();
const IngestMiddleware=require('../Controller/ingest.js');
const AlertController=require('../Controller/Alert.js');

Router.post("/api/ingest",IngestMiddleware.handleIngest); 
Router.get("/api/fetchalert",AlertController.fetchAlerts);
// Router.get("/api/getThreats",AlertController.getThreats);
module.exports = Router;