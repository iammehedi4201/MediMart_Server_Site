/* eslint-disable no-console */
import app from './app';
import mongoose from 'mongoose';
import { Server } from 'http';
import config from './app/config';
import seedSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    //: seed super admin to db
    await seedSuperAdmin();

    server = app.listen(config.port, () =>
      console.log(`app listening on port ${config.port}!`),
    );
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('UnhandledPromiseRejection!  Server is Shoutdowning....');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  console.log('uncaughtException is detected! Server is shoutdowning....');
  process.exit(1);
});
