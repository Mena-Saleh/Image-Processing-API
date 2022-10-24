"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    var url = req.url;
    console.log(url + ' was visited');
    next();
};
exports.default = logger;
