//Imports
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

//Function that resizes image using sharp.
const resizeImage = (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve , reject) => {
    //Get pathes for input and out (works in TS or JS and also cross platform.
    const sourcePath: fs.PathLike = path.join(
      __dirname,
      '..',
      '..',
      'images',
      filename + '.jpg'
    );
    const outputPath: fs.PathLike = path.join(
      __dirname,
      '..',
      '..',
      'images',
      'resized'
    );
    //Check if directory exists, and make it if it doesn't.
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    //Await the modification process of the image and catch any errors.
    try {
      sharp(sourcePath)
        .resize(width, height)
        .toFile(path.join(outputPath, filename + width + 'x' + height + '.jpg'))
        .then((): void => {
          resolve('success');
        });
    } catch (error) {
      reject(error as string);
    }
  });
};

//Exports
export default resizeImage;
