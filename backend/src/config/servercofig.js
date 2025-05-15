require('dotenv').config();

module.exports={
    PORT:process.env.PORT,
    DB_URL:process.env.db_URL,
    GEMINI_API_KEY : process.env.GEMINI_API_KEY,
    GEMINI_API_URL : process.env.GEMINI_API_URL           //export all env variable 
}