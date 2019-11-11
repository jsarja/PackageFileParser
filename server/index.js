const express = require('express')
const PackageData = require('./PackageData')
const fs = require('fs')

const app = express();
const port = process.env.PORT || 3000;
let packageInfo = null;

app.get('/', (req, res) => {
    if(!packageInfo) {
        packageInfo = new PackageData();
    }
    res.send('hello worlds');
})

app.listen(port, () => {
    console.log(`Running on: http://localhost:${port}/`)
});