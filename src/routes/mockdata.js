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
  const filePath = path.join(__dirname, '../../public/mockdata', route + '.json');
  const jsonData = require(filePath); 

  let routeRouter = express.Router();

  // Create a route for each key in the JSON data
  Object.keys(jsonData).forEach((key) => {
    routeRouter.get(`/${key}`, (req, res) => {
      res.json(jsonData[key]);
    });
  });

  // Create a route to get all data
  routeRouter.get('/', (req, res) => {
    res.json(jsonData);
  });

  mockdataRouter.use(`/${mockrouters[route]}`, routeRouter);
});

export default mockdataRouter;
