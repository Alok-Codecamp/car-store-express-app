import mongoose from 'mongoose';
import app from './app';
import config from './app/config/config';

// define the main function for run this application server
async function main() {
  try {
    // connect mongodb atlas using moonges connect method.

    await mongoose.connect(config.db_uri as string);

    app.listen(config.port, () => {
      console.log(
        `car_store app server running ${config.appMood} mood on port: ${config.port}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
