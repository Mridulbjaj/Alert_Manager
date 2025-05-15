const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Replace this with your actual endpoint
const URL = 'http://localhost:8000/api/ingest';

// Path to the data folder
const dataFolder = path.join(__dirname, 'data/threats_data');
// Read all JSON files in the folder
fs.readdir(dataFolder, async (err, files) => {
  if (err) {
    console.error('Failed to read data folder:', err);
    return;
  }
 for (const file of files) {
    const filePath = path.join(dataFolder, file);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);

      const response = await axios.post(URL, jsonData);

      console.log(`✅ Sent ${file}:`, "document with id " , response.data.docId, "is collected successfully");
    } catch (error) {
      console.error(`❌ Failed to send ${file}:`, error);
    }
  }
});

// const URL = 'http://localhost:8000/api/fetchalert';
// const response = axios.post(URL)
// .then((response) => {
// console.log(response.data);
// })
// .catch((error) => {
// console.error(error);
// }
// );