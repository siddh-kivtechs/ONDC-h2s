import express from 'express';    
  
const router = express.Router();    
  
// Add a route to show the EJS file    
router.get('/', (req, res) => {  
  let latitude = req.headers['x-vercel-ip-latitude']||23;  
  let longitude = req.headers['x-vercel-ip-longitude']||85;  
  let location = req.headers['x-vercel-ip-city'] + ',' + req.headers['x-vercel-ip-country-region'] + ',' + req.headers['x-vercel-ip-country']||'DEL,DEL,INDIA';  
  let ip_address = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;  
  
  const data = {  
    latitude: latitude,  
    longitude: longitude,  
    location: location,  
    ip_address: ip_address,  
  };  
    
  res.render('main', data);  
});  

  
    
export default router;    
