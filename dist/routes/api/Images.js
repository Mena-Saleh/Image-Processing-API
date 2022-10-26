"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var express_1 = __importDefault(require("express"));
var resizer_1 = __importDefault(require("../../utilities/resizer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
//Instance of router:
var images = express_1.default.Router();
//Routes
images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, width, height, name, x, y, sourcePath, outputPath;
    return __generator(this, function (_a) {
        filename = req.query.filename;
        width = req.query.width;
        height = req.query.height;
        name = filename;
        x = parseInt(width);
        y = parseInt(height);
        sourcePath = path_1.default.join(__dirname, '..', '..', '..', 'images', name + '.jpg');
        outputPath = path_1.default.join(__dirname, '..', '..', '..', 'images', 'resized', name + x + 'x' + y + '.jpg');
        if (filename != null) {
            //filename is entered in query string.
            if (!fs_1.default.existsSync(sourcePath)) {
                //check if that file exists or not
                //if the file doesn't exist, return error 404 file not found.
                res
                    .status(404)
                    .send('File not found, make sure you entered a correct image name');
            }
            //file exists
            else {
                //if no width or height are entered, return original image.
                if (width == null && height == null) {
                    //return original image.
                    console.log('No width or height entered, returning original image');
                    res.sendFile(sourcePath);
                    res.status(200);
                }
                //Width and/or height parameters are entered:
                else {
                    //first check if a resized image is cached, if not then resize it using sharp.
                    if (!fs_1.default.existsSync(outputPath)) {
                        //if a resized image doesn't exist, resize a new image using sharp and save it to the /resized directory.
                        if (width != null && height != null) {
                            //both width and height are entered
                            //if width and height are not numbers, return bad request.
                            if (isNaN(x) || isNaN(y)) {
                                res
                                    .status(400)
                                    .send('Bad request, please input a correct number for width and height');
                            }
                            else {
                                //resize the image and return the result.
                                console.log('Resizing now!');
                                try {
                                    (0, resizer_1.default)(name, x, y).then(function () {
                                        res.status(201).sendFile(outputPath);
                                    });
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            }
                        }
                        //Make it so that the user has to enter both width and height for now (can be updated later to support one entry only)
                        else {
                            res
                                .status(400)
                                .send('Please specify both width and height to get a response');
                        }
                    }
                    //there already exists a cached image, just retrieve it without using sharp
                    else {
                        console.log('retrieving cached image');
                        res.sendFile(outputPath);
                        res.status(302);
                    }
                }
            }
        }
        else {
            //bad request, because filename is a crucial parameter.
            res.status(400).send('Bad request, please enter an image name.');
        }
        return [2 /*return*/];
    });
}); });
//exports
exports.default = images;
