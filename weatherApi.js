const express = require('express');
const axios = require('axios'); 
const app = express();
require('dotenv').config();

app.use(express.json());

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('Weather API is running');
})

app.get('/weather',async (req,res)=>{
    const city = req.query.city;
    if(!city){
        return res.status(400).json({error:'City parameter is required'});
    }

    try{
        const apiKey = process.env.WEATHER_API;
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({error})
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})