import express from 'express';    
import cors from 'cors';    
import path from 'path';  
import { dirname } from 'path';    
import { fileURLToPath } from 'url';    
// import os from 'os';    
import { PORT, company_name } from './config.js';    
import { logToFile } from './middleware.js';    
import mockdataRouter from './routes/mockdata.js';    
import ejsHandler from './ejsHandler.js'; // Import EJS handler  
import { renderFile } from 'ejs'; // Import renderFile from EJS  
  
const app = express();    
  
// Set 'views' directory for any views   
// being rendered res.render()  
app.set('views', path.join(dirname(fileURLToPath(import.meta.url)), 'views'));  
  
// Set view engine as EJS  
app.engine('ejs', renderFile);  
app.set('view engine', 'ejs');  
  
app.use(express.json());    
app.use(cors());    
    
// Middleware    
app.use((req, res, next) => {    
  const { method, url } = req;    
  const ipAddress = req.ip;    
  logToFile(ipAddress, `[${method}] ${url}`);    
  next();    
});    
    
// Routes    
app.use('/', mockdataRouter); // Other routes  
app.use('/', ejsHandler); // EJS handler route  
  
// // Get the LAN IP address  
// const interfaces = os.networkInterfaces();    
// let ipAddress = 'localhost'; // Default to localhost if the IP address cannot be determined      
// for (const networkInterface of Object.values(interfaces)) {    
//   for (const network of networkInterface) {    
//     if (network.family === 'IPv4' && !network.internal) {    
//       ipAddress = network.address;    
//       break;    
//     }    
//   }    
// }    
 let ipAddress = '127.0.0.1';   
// Start the express server    
app.listen(PORT, ipAddress, () => {    
  console.log(`${company_name} Server started on http://${ipAddress}:${PORT}`);    
});  
