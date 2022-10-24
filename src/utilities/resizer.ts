//Imports
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

//Function that resizes image using sharp.
const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
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
    await fs.mkdirSync(outputPath);
  }

  //Await the modification process of the image and catch any errors.
  await sharp(sourcePath)
    .resize(width, height)
    .toFile(path.join(outputPath, filename + '.jpg'), (err) => {
      if (err != null) console.log(err);
    });
};

//Exports
export default resizeImage;
