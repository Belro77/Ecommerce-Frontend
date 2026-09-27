
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import cartRoutes from './routes/cart.routes';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


// Rutas
app.use('/cart', cartRoutes);


// MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas conectado');

    app.listen(4000, () => {
      console.log('Servidor funcionando en puerto 4000');
    });
  })
  .catch((error) => {
    console.error('Error conectando MongoDB:', error);
  });
