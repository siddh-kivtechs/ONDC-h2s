import express from 'express';
import cors from 'cors';
// Import path if needed elsewhere
// import path from 'path';
import { PORT, company_name } from './config.js';
//import mockdataRouter from './mockdata.js';

const app = express();

// Enable CORS for specific origin (uncomment if needed)
// app.use(cors({
//   origin: "https://example.com"
// }));

// Built-in body parsing for Express 4.16.0 and above
app.use(express.json({ limit: '1mb' })); // Parse JSON bodies
app.use(express.urlencoded({ limit: '1mb', extended: true })); // Parse URL-encoded bodies

// Employ mockdataRouter (place after body parsing for POST requests)
app.use('/', mockdataRouter);

// GET route (example logic)
app.get("/", (req, res) => {
  let data = {};
  data["GET"] = req.query;
  data["company_name"] = company_name; // Access config variable
  res.json(data); // Send JSON response
});

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
