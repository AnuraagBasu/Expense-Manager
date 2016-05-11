/**
 * Created by anuraagbasu on 28/04/16.
 */

var express = require("express");
var config = require("./config/environment");

module.exports = function (app) {

    app.use('/v1/expense', require('./api/expense'));

    app.route("/")
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};