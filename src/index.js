import express from 'express';
import cors from 'cors';
// Import path if needed elsewhere
// import path from 'path';
import { PORT, company_name } from './config.js';
import mockdataRouter from './mockdata.js';
import ejsHandler from './ejsHandler.js'; // Import EJS handler  
import { renderFile } from 'ejs'; // Import renderFile from EJS  

const app = express();

// Enable CORS for specific origin (uncomment if needed)
// app.use(cors({
//   origin: "https://example.com"
// }));
app.set('views', path.join(dirname(fileURLToPath(import.meta.url)), 'views'));  
  
// Set view engine as EJS  
app.engine('ejs', renderFile);  
app.set('view engine', 'ejs'); 


// Built-in body parsing for Express 4.16.0 and above
app.use(express.json({ limit: '1mb' })); // Parse JSON bodies
app.use(express.urlencoded({ limit: '1mb', extended: true })); // Parse URL-encoded bodies

// Employ mockdataRouter (place after body parsing for POST requests)
app.use('/', mockdataRouter);

app.use('/', ejsHandler); // EJS handler route  

// Start server with proper error handling
app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
})
.on('error', (err) => {
  console.error(`Error starting server: ${err}`);
  process.exit(1); // Optionally exit with an error code
});
