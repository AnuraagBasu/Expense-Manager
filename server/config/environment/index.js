/**
 * Created by anuraagbasu on 28/04/16.
 */

var path = require("path");
var _ = require("lodash");

var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 8000,

    mongo: {
        uri:    process.env.MONGOLAB_URI ||
                process.env.MONGODB_URI ||
                'mongodb://localhost/expense-manager'
    }
};

module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});