import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.DB_HOST || 'surus.db.elephantsql.com',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'beuhoacx',
    password: process.env.DB_PASSWORD || '8ZGPxXuuF3kFpStJHFEyyqBpZ7ecoL4m',
    database: process.env.DB_NAME || 'beuhoacx',
  },
  jwtSecret: process.env.JWT_SECRET || 'startup',
}));
