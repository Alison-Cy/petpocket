import express from 'express';
import syncDB from './config/syncModels.js';
import User from './models/User.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Sincronizar modelos y luego iniciar servidor
syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
});