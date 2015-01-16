var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/pms',
        rootPath: rootPath,
        port: 3030

    },
    production: {
        db: 'mongodb://arnar:g2dzGyMRumrGBStwX5sr@ds033831.mongolab.com:33831/pms',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
