"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var teachers = express_1.default.Router();
teachers.get('/', function (req, res) {
    res.send("teachers routes");
});
exports.default = teachers;
