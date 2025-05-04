const mongoose=require('mongoose')
const serverconfig=require("./servercofig")



// The below fuction helps
// us to connect db

async function connectdb(params) {

    try {
       await mongoose.connect(serverconfig.DB_URL) 
       console.log("successfully connected to mongodb");
    } catch (error) {
        console.log("NOT connected to mongodb");
        console.log(error);
    }
    
}

module.exports=connectdb;