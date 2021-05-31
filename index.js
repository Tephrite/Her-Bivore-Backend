const express = require('express')
const scrapers = require('./scrapers')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/recipeTypes', async (req, res) => {
    const recipeTypes = await scrapers.scrapeRecipeTypes()
    res.send(recipeTypes)
})

app.get('/recipeLists/mains', async (req, res) => {
    const recipeLists = await scrapers.scrapeRecipeLists("mains")
    res.send(recipeLists)
})

app.get('/recipeLists/snacks', async (req, res) => {
    const recipeLists = await scrapers.scrapeRecipeLists("snacks")
    res.send(recipeLists)
})

app.get('/recipeLists/sweet-treats', async (req, res) => {
    const recipeLists = await scrapers.scrapeRecipeLists("sweet-treats")
    res.send(recipeLists)
})

app.listen(port, () => console.log('Example app listening on port', port, '!'))