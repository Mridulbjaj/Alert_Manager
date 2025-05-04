const express=require('express');
// const bodyparser=require('body-parser');
const User=require('./Schema/userSchema.js');

const ServerConfig=require('./config/servercofig');
const connectdb=require("./config/dbConfig");



const app=express();

// app.use(bodyparser.json());   //json body acceptable
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(ServerConfig.PORT,async ()=>{
     
      await connectdb();
      console.log(`server started at PORT ${ServerConfig.PORT}..`);
     

      // const newUser=await User.create({
      //       email:"a@b.com",
      //       mobilenumber:"8850795147",
      //       firstname:"satyam",
      //       lastname:"chauhan"
      // });

      // console.log("created new user");
      // console.log(newUser);
})