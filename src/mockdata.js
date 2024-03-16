
import express from 'express';      
import path from 'path';      
     
import fs from 'fs'; // Add this line  
      
const mockdataRouter = express.Router();      
      
const mockrouters = {      
  electronics: 'electronics',      
  apparels: 'apparels',      
  grocery: 'grocery',      
  mandi: 'mandi',      
  promotion: 'promotion',      
};      
      
Object.keys(mockrouters).forEach((route) => {      
  const filePath = path.join('', `../public/${route}.json`);      
  
  let routeRouter = express.Router();      
  
  fs.readFile(filePath, (err, data) => {  
    if (err) throw err;  
    let jsonData = JSON.parse(data);  
  
    // Create a route for each key in the JSON file  
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
});      
      
export default mockdataRouter;  
