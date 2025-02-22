import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorhandler from './app/middleware/globalErrorHandler';
import cookieParser from "cookie-parser";
const app: Application = express();

//  middleware setup
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());

// base URL path for carRoutes module
app.use('/api', router)



app.get('/', (req, res) => {
    res.send('car-store-server is running')
})



// use global error handler
app.use(globalErrorhandler);
export default app;
