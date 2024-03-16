import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export const readdata = async (req, res, filePath) => {
  try {
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(jsonData);

    res.json(parsedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading or parsing JSON file');
  }
};