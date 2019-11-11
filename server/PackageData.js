class PackageData {
    constructor() {
        this._packageNames = [];
        this._packageData = {};
    }

    _fetchPackageList() {
        const fileBuffer = fs.readFileSync(process.env.PACKAGE_FILE_PATH)
        const fileString = fileBuffer.toString();


    }

    _fetchPackageDetails() {

    }

    getPackageList() {
        return this._packageNames;
    }

    getPackageInfo(packageName) {
        return this._packageData[packageName]
    }
}

module.exports = PackageData