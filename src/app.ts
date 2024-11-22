import express, { Application } from 'express';
import cors from 'cors';
import { carRoutes } from './app/module/cars/cars.routes';

const app: Application = express();

//  middleware setup
app.use(express.json());
app.use(cors());

// base URL path for carRoutes module

app.use('/api/v1/cars', carRoutes)

export default app;
