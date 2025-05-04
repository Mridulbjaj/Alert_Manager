const express = require("express");
const Router = express.Router();
const IngestMiddleware=require('./middleware/ingestMiddleware.js');
const AlertController=require('./controller/alert.js');

Router.get("/api/ingest",IngestMiddleware.HandleIngest); 
Router.post("/api/fetchalert",AlertController.fetchAlert);