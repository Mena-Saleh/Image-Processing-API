"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
//Function that resizes image using sharp.
var resizeImage = function (filename, width, height) {
    return new Promise(function (resolve, reject) {
        //Get pathes for input and out (works in TS or JS and also cross platform.
        var sourcePath = path_1.default.join(__dirname, '..', '..', 'images', filename + '.jpg');
        var outputPath = path_1.default.join(__dirname, '..', '..', 'images', 'resized');
        //Check if directory exists, and make it if it doesn't.
        if (!fs_1.default.existsSync(outputPath)) {
            fs_1.default.mkdirSync(outputPath);
        }
        //Await the modification process of the image and catch any errors.
        try {
            (0, sharp_1.default)(sourcePath)
                .resize(width, height)
                .toFile(path_1.default.join(outputPath, filename + width + 'x' + height + '.jpg'))
                .then(function () {
                resolve('success');
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
//Exports
exports.default = resizeImage;
