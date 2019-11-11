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

        for(let i = 0; i < packageList.length-1; i++) {
            const packageString = packageList[i]
            this._fetchPackageDetails(packageString)
        }
        this._packageNames.sort();
    }

    _fetchPackageDetails(str) {
        let re = /Package:.*\n/
        const name = str.match(re)[0].trim().replace('Package: ', '')

        re = /Description:[\s\S]*\n\S/
        let description = '';
        if(str.match(re)) {
            description = str.match(re)[0].slice(0, -1).trim()
                .replace('Description: ', '');
        }

        re = /Depends:.*\n/
        let depends = [];
        if(str.match(re)) {
            const dependsStr = str.match(re)[0].slice(0, -1).trim()
                .replace('Depends: ', '').replace(/\([^\)]*\)/g,'');
            depends = dependsStr.split(',')
        }

        re = /Provides:.*\n/
        let provides = [];
        if(str.match(re)) {
            const names = str.match(re)[0].slice(0, -1).trim()
                .replace('Provides: ', '');
            provides = names.split(',')
        }

        this._packageData[name] = {name, description, depends, provides};
        this._packageNames.push(name);
    }

    getPackageList() {
        return this._packageNames;
    }

    getPackageInfo(packageName) {
        console.log(packageName)
        return this._packageData[packageName]
    }
}

module.exports = PackageData