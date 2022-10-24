"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imported functions and libraries.
var express_1 = __importDefault(require("express"));
var Images_1 = __importDefault(require("./api/Images"));
var routes = express_1.default.Router();
//Home route
routes.get('/', function (req, res) {
    res.send('This is the home page, nothing can be found here!');
    res.status(200);
});
//Adding nested routes as middleware to my main route, to make the applicaiton more organized.
routes.use('/images', Images_1.default);
exports.default = routes;
