import dotenv from 'dotenv';
dotenv.config();

const DB_TYPE = process.env.DB_TYPE || 'mysql'; // 'mysql' o 'mongodb'

let dbConfig;
try {
  dbConfig = DB_TYPE === 'mysql' 
    ? await import('./mysql.js') 
    : await import('./mongo.js');
} catch (error) {
  console.error('❌ Error loading DB config:', error);
  process.exit(1);
}

export default dbConfig.default;