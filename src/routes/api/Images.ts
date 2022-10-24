//Imports
import express from 'express';
import resizeImage from '../../utilities/resizer';
import path from 'path';
import fs from 'fs';

//Instance of router:
const images = express.Router();

//Routes
images.get('/', (req, res) => {
  const filename = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;

  //url query parameters
  const name: string = filename as unknown as string;
  const x: number = parseInt(width as string);
  const y: number = parseInt(height as string);

  //file paths for input and output
  const sourcePath: fs.PathLike = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'images',
    name + '.jpg'
  );
  const outputPath: fs.PathLike = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'images',
    'resized',
    name + '.jpg'
  );

  if (filename != null) {
    //filename is entered in query string.
    if (!fs.existsSync(sourcePath)) {
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
        //first check if a resized image is cached, if not then resize it using sharp
        if (!fs.existsSync(outputPath)) {
          //if a resized image doesn't exist, resize a new image using sharp and save it to the /resized directory
          if (width != null && height != null) {
            //both width and height are entered
            try {
              console.log('resizing now');
              resizeImage(name, x, y);
              //To make sure it is saved before sending it.
              setTimeout(() => {
                res.sendFile(outputPath);
              }, 100);
              res.status(201);
            } catch (error) {
              console.log(error);
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
  } else {
    //bad request, because filename is a crucial parameter.
    res.status(400).send('Bad request, please enter an image name.');
  }
});

//exports
export default images;
