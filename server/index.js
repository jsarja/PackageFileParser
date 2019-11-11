const express = require('express')
const path = require('path')
const hbs = require('hbs');

const PackageData = require('./PackageData')

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000;
let packageData = null;

// HBS helper for recreating dependency name strings which are separated with | 
hbs.registerHelper('ifNotLast', function(v1, v2, options) {
    if(v1 < v2-1) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.get('/', (req, res) => {
    // Fetch all package data if it is not yet done.
    if(!packageData) {
        try {
            packageData = new PackageData();
        }
        catch (e) {
            return res.send('Error in reading the package file.');
        }
    }

    res.render('index', {packageList: packageData.getPackageList()});
});

app.get('/package/:packageName', (req, res) => {
    // Fetch all package data if it is not yet done.
    if(!packageData) {
        try {
            packageData = new PackageData();
        }
        catch (e) {
            res.send('Error in reading the package file.');
        }
    }

    res.render(
        'packageDetail', 
        {packageInfo: packageData.getPackageInfo(req.params.packageName)}
    );
})

app.listen(port, () => {
    console.log(`Running on port: ${port}/`)
});