import express from 'express';
import cors from 'cors';
import path from 'path';   
import { fileURLToPath } from 'url';  
import { dirname } from 'path';  
     
import fs from 'fs'; // Add this line  
const __filename = fileURLToPath(import.meta.url);  
const dirPath = dirname(__filename);  
import { PORT, company_name } from './config.js';
import mockdataRouter from './mockdata.js';
import ejsHandler from './ejsHandler.js';
const app = express();

// Enable CORS for specific origin (uncomment if needed)
// app.use(cors({
//   origin: "https://example.com"
// }));

// Built-in body parsing for Express 4.16.0 and above
app.use(express.json({ limit: '1mb' })); // Parse JSON bodies
app.use(express.urlencoded({ limit: '1mb', extended: true })); // Parse URL-encoded bodies
 
  
 app.set('views',path.join(dirPath, '/src/views');

app.set('view engine', 'ejs');

// Employ mockdataRouter (place after body parsing for POST requests)
app.use('/', mockdataRouter);
app.get('/', ejsHandler);

// POST route (example logic)
app.post("/", (req, res) => {
  console.log("POST request received");
  let data = {};
  data["POST"] = req.body;
  data["company_name"] = company_name; // Access config variable
  res.json(data); // Send JSON response
});

// Start server with proper error handling
app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
})
.on('error', (err) => {
  console.error(`Error starting server: ${err}`);
  process.exit(1); // Optionally exit with an error code
});
