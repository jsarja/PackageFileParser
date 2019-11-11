const express = require('express')
const PackageData = require('./PackageData')

const app = express();
const port = process.env.PORT || 3000;
let packageData = null;

app.get('/', (req, res) => {
    if(!packageData) {
        try {
            packageData = new PackageData();
        }
        catch (e) {
            res.send('Error in reading the package file.');
        }
    }
    res.send(packageData.getPackageList());
});

app.get('/package/:packageName', (req, res) => {
    if(!packageData) {
        try {
            packageData = new PackageData();
        }
        catch (e) {
            res.send('Error in reading the package file.');
        }
    }

    res.send(packageData.getPackageInfo(req.params.packageName));
})

app.listen(port, () => {
    console.log(`Running on: http://localhost:${port}/`)
});