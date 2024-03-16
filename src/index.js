import express from 'express';
import cors from 'cors';
import path from 'path';
import { PORT, company_name } from './config.js';

import mockdataRouter from './mockdata.js';


const app = express();


app.use(express.json());
app.use(cors());

// Middleware (adjusted for Vercel)
app.use((req, res, next) => {
  const { method, url } = req;
  const ipAddress = req.ip;

  // Log to console in Vercel, use logToFile in local if available
  if (process.env.VERCEL) {
    console.log(`IP: ${ipAddress}, Method: ${method}, URL: ${url}`);
  } else {
    if (typeof logToFile === 'function') {
      logToFile(ipAddress, `[${method}] ${url}`);
    } else {
      console.warn('logToFile function not found. Logging to console instead.');
      console.log(`IP: ${ipAddress}, Method: ${method}, URL: ${url}`);
    }
  }

  next();
});

// Routes
app.use('/', mockdataRouter);


// Server start (adjusted for Vercel)
app.listen(PORT, () => {
  console.log(`$ Server started on http://localhost:${PORT}`);
});
