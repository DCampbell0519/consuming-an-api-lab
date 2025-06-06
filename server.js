const express = require('express');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;


////////////////////////
// MIDDLEWARE
////////////////////////
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const fetchResults = async (zipSearch) =>{
    try{
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipSearch}&units=imperial&appid=${process.env.API_KEY}`;
        const response = await fetch(apiUrl)

        const data = await response.json()

        return data

    }catch (error){
        console.log("Danger D-Money, Danger!", error)
    }
}
////////////////////////
// ROUTES
////////////////////////
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/weather', async (req, res) => {
    const zipCode = req.body.zipCode
    const data = await fetchResults(req.body.zipCode)
    console.log('data:', data)
    console.log('req.body:', req.body)
    if (!data || data.cod != 200) {
        return res.render('index.ejs', { results: []});
    }
    res.render('show.ejs', { data })
})

// app.get('/weather/show', (req, res) => {
//     const zipCode = req.body.zipCode
//     const data = fetchResults(req.body.zipCode)
//     res.render('show.ejs', { data })
// })



app.listen(PORT, () => {
    console.log('Welcome to the Thunderdome!')
})