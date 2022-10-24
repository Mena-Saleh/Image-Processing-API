//Imports
import express from 'express';
import routes from './routes/index';

//Server Initialization
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log('server is listening on port ' + port);
});

//Routes.
app.use('/api', routes);

//Exports

export default app;
