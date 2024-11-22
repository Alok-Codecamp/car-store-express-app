import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  appMood: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DATABASE_URL,
};
