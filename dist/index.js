"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
//Server Initialization
var app = (0, express_1.default)();
var port = 3000;
app.listen(port, function () {
    console.log('server is listening on port ' + port);
});
//Routes.
app.use('/api', index_1.default);
//Exports
exports.default = app;
