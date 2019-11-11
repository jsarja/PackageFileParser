const fs = require('fs')

class PackageData {
    constructor() {
        this._packageNames = [];
        this._packageData = {};

        this._fetchPackageList();
    }

    _fetchPackageList() {
        const fileBuffer = fs.readFileSync(process.env.PACKAGE_FILE_PATH)
        const fileString = fileBuffer.toString();
        const packageList = fileString.split('\n\n')

        // Parse needed information from each package string.
        for(let i = 0; i < packageList.length-1; i++) {
            const packageString = packageList[i]
            this._fetchPackageDetails(packageString)
        }
        this._packageNames.sort();
    }

    _fetchPackageDetails(str) {
        // Search package name.
        let re = /Package:.*\n/
        const name = str.match(re)[0].trim().replace('Package: ', '')

        // Search package description if it is provided.
        re = /Description:[\s\S]*\n\S/
        let description = '';
        if(str.match(re)) {
            description = str.match(re)[0].slice(0, -1).trim()
                .replace('Description: ', '');
        }

        // Search package depedencies if they are provided.
        re = /Depends:.*\n/
        let depends = [];
        if(str.match(re)) {
            // Also remove version information from inside the brackets.
            const dependsStr = str.match(re)[0].slice(0, -1).trim()
                .replace('Depends: ', '').replace(/\([^\)]*\)/g,'');
            
            // Parse individual package names.
            depends = dependsStr.split(',')
            depends = depends.map(pkg => {
                // Some packages are separated with |.
                pkg = pkg.split(' | ');
                return pkg.map(name => name.trim());
            })
        }

        this._packageData[name] = {name, description, depends, provides: []};
        this._packageNames.push(name);
    }

    getPackageList() {
        return this._packageNames;
    }

    getPackageInfo(packageName) {
        return this._packageData[packageName]
    }
}

module.exports = PackageData