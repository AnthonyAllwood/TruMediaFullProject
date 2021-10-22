const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express()

app.use(cors()); // Allows server to be accessed by the same origin as localhost
app.use(express.json());// Use to pass JSON
app.use(express.urlencoded({extended: true}))// Helps handle form data

//Start Server-----------------------------------------------------------------------------
/*app.get('/', (req, res) => {
    res.send('Hello, World');
})*/
app.listen(process.env.PORT || 4000, err => {
    if (err) console.error(err)
    console.log('Server has started on port %s', 4000 || process.env.PORT)
})

//API Routes-------(USE POSTMAN TO TEST ROUTES)--------------------------------------------
//Route to get API Token using API KEY
app.get('/api/token', async (req, res) => {
    try{
        var myHeaders = new fetch.Headers();
        myHeaders.append("apiKey", process.env.APIKEY);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch("https://project.trumedianetworks.com/api/token", requestOptions)
        const json = await response.json();
        if(json){
            res.json({
                success: true,
                result: json,
                message: "Successfully obtained token!"
            })
            app.set('token', json.token);
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Route to get all NFL Players in API
app.get('/api/nfl/players', async (req, res) => {
    try{
        globalToken = app.get('token');
        console.log(globalToken);//Test to see if token was set and get successfully
        var myHeaders = new fetch.Headers();
        myHeaders.append("tempToken", globalToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch("https://project.trumedianetworks.com/api/nfl/players", requestOptions)
        const json = await response.json();
        if(json){
            res.json({
                success: true,
                result: json,
                message: "Successfully obtained NFL Players!"
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Route to get a specific player's data
app.get('/api/nfl/player/:id', async (req, res) => {
    try{
        globalToken = app.get('token');
        var myHeaders = new fetch.Headers();
        myHeaders.append("tempToken", globalToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`https://project.trumedianetworks.com/api/nfl/player/${req.params.id}`, requestOptions)
        const json = await response.json();
        if(json){
            res.json({
                success: true,
                result: json,
                message: "Successfully obtained NFL Player!"
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})