import express from 'express';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { PORT, company_name } from './config.js';
import mockdataRouter from './routes/mockdata.js';
import ejsHandler from './ejsHandler.js';
import { renderFile } from 'ejs';

const app = express();

// View setup (adjust paths if needed)
app.set('views', path.join(dirname(fileURLToPath(import.meta.url)), 'views'));
app.engine('ejs', renderFile);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());

// Middleware modifications
app.use((req, res, next) => {
  const { method, url } = req;
  const ipAddress = req.ip;

  // Replace file logging with console logging
  console.log(`IP: ${ipAddress}, Method: ${method}, URL: ${url}`);
  next();
});

// Routes
app.use('/', mockdataRouter);
app.use('/', ejsHandler);

// Listen on provided PORT (Vercel handles IP address)
app.listen(PORT, () => {
  console.log(`${company_name} Server started on port ${PORT}`);
});
