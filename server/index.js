const express = require('express')
const path = require('path')
const hbs = require('hbs');

const PackageData = require('./PackageData')
const { ifNotLast, breakLines } = require('./helpers/hbs')

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000;
let packageData = null;

// HBS helpers for rendering information in wanted format. 
hbs.registerHelper('ifNotLast', ifNotLast);
hbs.registerHelper('breaklines', breakLines);

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

    // Only render depedencies which are in package name list as links.
    // If name is not on the list render it just as a plain text.
    const packageNames = packageData.getPackageList();
    const packageInfo = packageData.getPackageInfo(req.params.packageName);
    packageInfo.depends = packageInfo.depends.map(pkgList=> {
        return pkgList.map(pkgName => {
            if(packageNames.includes(pkgName)) {
                return `<a href="/package/${pkgName}">${pkgName}</a>`;
            }
            return pkgName;
        })
    });

    res.render(
        'packageDetail', 
        {packageInfo}
    );
})

app.listen(port, () => {
    console.log(`Running on port: ${port}/`)
});