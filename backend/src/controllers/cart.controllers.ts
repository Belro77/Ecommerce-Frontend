
import { Request, Response } from 'express';
import { Cart } from '../models/cart.model';

// Obtener carrito
export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId })
      .populate('items.productId')
      .exec();

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: []
      });

      await newCart.save();

      return res.json(newCart);
    }

    return res.json(cart);

  } catch (error) {
    console.error('Error al obtener el carrito:', error);

    return res.status(500).json({
      message: 'Error al obtener el carrito',
      error
    });
  }
};


// Agregar producto
export const addToCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }

    cart.items.push({
      productId,
      quantity
    });

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: 'Error al agregar producto',
      error
    });
  }
};


// Eliminar producto
export const removeFromCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ items: [] });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar producto',
      error
    });
  }
};

