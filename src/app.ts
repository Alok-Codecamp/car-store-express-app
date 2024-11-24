import express, { Application } from 'express';
import cors from 'cors';
import { carRoutes } from './app/module/cars/cars.routes';
import { orderRoutes } from './app/module/orders/order.routes';

const app: Application = express();

//  middleware setup
app.use(express.json());
app.use(cors());

// base URL path for carRoutes module

app.use('/api/cars', carRoutes)

app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.send('car-store-server is running')
})

export default app;
