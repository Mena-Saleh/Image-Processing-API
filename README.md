# Image Processing API

## Table of Contents

1. Project Description 
2. Usage, Endpoints and Testing
3. Dependencies And About The Project
6. Copyrights And Acknowledgements

## Project Description 

This project presents a simple API that can be used to resize images through the NPM package sharp. Resized images are also cached for future use.

## Usage

- The node_modules folder was ignored in the making of this repository because of its massive size, so in order to make use of the scripts and the packages, you have to install the required packages using npm i packagename command. Packages can be found in the package.json file.

- Endpoints structure

To use this API, first, run the script "npm run start", then navigate to any web browser and write a URL with the following format:
 localhost:3000/api/images?filename=NAME&width=WIDTH&height=HEIGHT

The route that contains most of the functionality is the "/api/images" route. In there you can pass three parameters, and depending on the parameters passed, you'll get a different response.

This API relies on images that can be found in the main directory in the "images" folder, the API only works on this set of images in there. Resized images are saved in the "resized" folder.

- Use case scenarios

    - No file name is passed: error with status 400 (bad request)
    - Incorrect file name is passed: error with status 404 (not found)
    - Correct file name is passed but no width or height is passed: response with status 200 (ok) returing the original image back to the user.
    - Passing file name that has been passed before: response with status 302 (found) returning a cached image.
    - Correct file name is passed as well as both width and height parametrs: response with status 201 (created) indicating that a new image just got cached.
    - correct file name is passed for the first time but one parameter is missing (width/height): error with status 400 (bad request) because the API doesn't support scaling with one paramter as of now. (can easily be updated)

All test cases can be tested using jasmine and supertest by running the simple script: "npm run test", pay attention that the script will only work once, because once it is ran, an image is cached which alters the outcome of the testing conditions.

## Dependencies And About The Project

This is a list of the dependencies and scripts that were used to power this nodeJS javascript web API.


- Scripts included in this project:
    - "build": "npx tsc",
    - "jasmine": "jasmine",
    - "test": "npm run build && npm run jasmine",
    - "lint": "eslint . --ext .ts",
    - "prettier": "prettier --config .prettierrc {,!(node_modules)/**/}*.ts --write",
    - "startjs": "npm run build && nodemon dist/.",
    - "start": "nodemon src/index.ts"

- To start the project, you can use the "start" script to test the dev version. To test the build version just run the script "startjs"
- The scripts test, prettier and lint were used throughout the development process to test and maintain code readability and maintainability.


- Dependencies and modules used (type definitions were also added):
    
    - TypeScript
    - Nodemon
    - SuperTest and Jasmine
    - Express
    - Prettier
    - Lint
    - Sharp
    - FileSystem
    - Path




## Copyrights And Acknowledgements

    The source code for this project is done entirely by me, without any help of other parties. This code was written as a submission for the Image Processing API project for the Udacity Advanced full stack developer nanodegree program.

    - About The Author
        - Name: Mena Ashraf Mikhael Saleh
        - Email: Mena.a.saleh.2001@gmail.com
        - GitHub: https://github.com/Mena-Ibrahim
        - LinkedIn: https://www.linkedin.com/in/mena-saleh-23b947167/


