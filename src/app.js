import express from 'express';
import roleRoutes from './routes/roleRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/roles', roleRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;