import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Cart } from '../models/cart.model';


// Obtener carrito
export const getCart = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId })
      .populate('items.productId');

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: []
      });
    }

    res.json(cart);

  } catch (error) {
    console.error('Error obteniendo carrito:', error);

    res.status(500).json({
      message: 'Error obteniendo el carrito'
    });
  }
};


// Agregar producto
export const addToCart = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: 'productId inválido'
      });
    }

    let cart = await Cart.findOne({ userId });

    // Si no existe carrito, lo creamos
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId: new mongoose.Types.ObjectId(productId),
            quantity
          }
        ]
      });

      return res.status(201).json(cart);
    }

    // Buscar si el producto ya está en el carrito
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      cart.items.push({
        productId: new mongoose.Types.ObjectId(productId),
        quantity
      });

    }

    await cart.save();

    await cart.populate('items.productId');

    res.json(cart);

  } catch (error) {
    console.error('Error agregando producto:', error);

    res.status(500).json({
      message: 'Error agregando producto al carrito'
    });
  }
};


// Eliminar producto
export const removeFromCart = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: 'Carrito no encontrado'
      });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    await cart.populate('items.productId');

    res.json(cart);

  } catch (error) {
    console.error('Error eliminando producto:', error);

    res.status(500).json({
      message: 'Error eliminando producto'
    });
  }
};