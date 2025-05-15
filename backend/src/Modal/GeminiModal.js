// serverconfig.js or a config file
const {GEMINI_API_KEY} = require('../config/servercofig');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); // ensure this is set

module.exports = {
  geminiClient: genAI
};
