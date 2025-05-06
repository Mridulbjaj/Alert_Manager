const express=require('express');
// const bodyparser=require('body-parser');
const ServerConfig=require('./config/servercofig');
const connectdb=require("./config/dbConfig");
const router = require('./routes/routes.js');
const cors=require('cors');

const app=express();

app.use(cors({
  origin: ["https://rgja-frontend-93qp.vercel.app", "http://localhost:5173"],// Frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies if needed
  }));

// app.use(bodyparser.json());   //json body acceptable
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router)


app.listen(ServerConfig.PORT,async ()=>{
     
      await connectdb();
      console.log(`server started at PORT ${ServerConfig.PORT}..`);
     
});