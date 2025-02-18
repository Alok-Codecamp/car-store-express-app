import mongoose from 'mongoose';
import app from './app';
import config from './app/config/config';
import { Server } from 'http';
// define the main function for run this application server
let server: Server;
async function main() {
  try {
    // connect mongodb atlas using moonges connect method.

    await mongoose.connect(config.db_uri as string);

    server = app.listen(config.port, () => {
      console.log(
        `car_store app server running ${config.appMood} mood on port: ${config.port}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected,🤢 server is shutting down`);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
})

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected,🤢 server is shutting down`);
  process.exit();

})