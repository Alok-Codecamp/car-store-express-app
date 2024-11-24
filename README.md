# Car Store

## Over view

### car store is a back end application designed to manage car order, built using Tyepscript, express.js, mongodb, mongoose. This application allows client to add new car data , retrive specific car data, update car data and delete car data. client also can create car orders and client can get total revenue from all orders.

## Technology Stack

### TypeScript: used typescript for avoid type error.

### Express.js: very popurler node.js freamwork. Its lightweight easy to use and flexible for building api.

### MongoDB: noSql database it's vary eficient and scalable data storage.

### mongoose: object data modeling library for mongodb and node.js. it's make easy to manage mongodb database.

### node.js: javaScript runtime for serverside rendering .

# moduler design pattern

### moduler design pattern used for this application. This design pattern make easy to manage code of each file. In this application have two module car module and order module . The car module and the order module have inside module directory. Inside car module have all typescript file related car data. and thats in to 5 file thats are Interface, model, routes, controll and service. the same pattern use for orders module.

# Routes

## Method:GET

### API for add car data : https://car-store-express-app.vercel.app/api/cars

## Method:GET

### API for get All Car data :https://car-store-express-app.vercel.app/api/cars

## Method:GET

### API for query with brand, model and category : https://car-store-express-app.vercel.app/api/cars?searchTerm=SUV

## Method:GET

### API for get specific car by id : https://car-store-express-app.vercel.app/api/cars/:carId

## Method:PUT

### Api for update specific Car data by id: https://car-store-express-app.vercel.app/api/cars/:carId

## Method:DELETE

### API for delete specific Car data by id: https://car-store-express-app.vercel.app/api/cars/:carId

## Method:GET

### API for create an order :https://car-store-express-app.vercel.app/api/orders

## Method:GET

### API for get revenue from all orders: https://car-store-express-app.vercel.app/api/orders/revenue
