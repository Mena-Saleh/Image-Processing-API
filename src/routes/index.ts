//Imported functions and libraries.
import express from 'express';
import images from './api/Images';

const routes = express.Router();

//Home route
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('This is the home page, nothing can be found here!');
  res.status(200);
});

//Adding nested routes as middleware to my main route, to make the applicaiton more organized.
routes.use('/images', images);

export default routes;
