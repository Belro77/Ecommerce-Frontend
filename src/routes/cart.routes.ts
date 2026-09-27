import { Router } from 'express';

import {
  getCart,
  addToCart,
  removeFromCart
} from '../controllers/cart.controllers';

const router = Router();

router.get('/:userId', getCart);

router.post('/:userId/add', addToCart);

router.post('/:userId/remove', removeFromCart);

export default router;