require('dotenv').config()

module.exports = {
  // App status
  IN_PROD: process.env.NODE_ENV === 'production',
  // Server
  SERVER_PORT: process.env.SERVER_PORT || 4000,
  SERVER_HOST: process.env.SERVER_HOST || 'localhost',
  // Database
  DB_NAME: process.env.DB_NAME || 'growpad',
  DB_USERNAME: process.env.DB_USERNAME || 'admin',
  DB_PASSWORD: process.env.DB_PASSWORD || 'growpad123',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_HOST: process.env.DB_HOST || 'localhost',
  // Bcrypt
  HASH_SALT_AROUNDS: process.env.HASH_SALT_AROUNDS || 10,
  // Session
  SESS_NAME: process.env.SESS_NAME || 'sid',
  SESS_SECRET: process.env.SESS_NAME || 'ssh!secret',
  SESS_LIFETIME: process.env.SESS_LIFETIME || 1000 * 60 * 60 * 2, // 2 hours

  // Redis
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'secret'
}
