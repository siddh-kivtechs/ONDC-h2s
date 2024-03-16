import express from 'express';
import path from 'path';

const mockdataRouter = express.Router();

const mockrouters = {
  electronics: 'electronics',
  apparels: 'apparels',
  grocery: 'grocery',
  mandi: 'mandi',
  promotion: 'promotion',
};

Object.keys(mockrouters).forEach((route) => {
  // Construct path using import.meta.url for ESM compatibility
  const filePath = path.join(new URL(import.meta.url).pathname, '../../public/mockdata', route + '.json');

  try {
    // Dynamically import JSON data as a module
    const jsonData = await import(filePath);

    let routeRouter = express.Router();

    // Create routes for each key and the entire data
    Object.keys(jsonData).forEach((key) => {
      routeRouter.get(`/${key}`, (req, res) => {
        res.json(jsonData[key]);
      });
    });
    routeRouter.get('/', (req, res) => {
      res.json(jsonData);
    });

    mockdataRouter.use(`/${mockrouters[route]}`, routeRouter);
  } catch (error) {
    console.error(`Error loading mock data for ${route}:`, error);
    // Handle errors gracefully, e.g., respond with a 404 or appropriate error message
  }
});

export default mockdataRouter;
