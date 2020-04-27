const express = require('express')
const app = express()
const port = 2699
const init = require('./init.js').initDatabase

const aids = require("./api/aidsHiv").aids;

init()

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/aids', aids)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))