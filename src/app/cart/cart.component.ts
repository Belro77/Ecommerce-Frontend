
import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any = {
    items: []
  };

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.cargarCarrito();

  }


  // Obtener carrito
  cargarCarrito(): void {

    this.cartService.getCart().subscribe({

      next: (cart) => {

        console.log('Carrito recibido:', cart);

        this.cart = cart;

      },

      error: (error) => {

        console.error(
          'Error cargando carrito:',
          error
        );

      }

    });

  }


  // Eliminar producto
  eliminar(productId: string): void {

    this.cartService.removeFromCart(productId).subscribe({

      next: (cart) => {

        console.log(
          'Producto eliminado:',
          cart
        );

        this.cart = cart;

      },

      error: (error) => {

        console.error(
          'Error eliminando producto:',
          error
        );

      }

    });

  }


  // Calcular total
  calcularTotal(): number {

    return this.cart.items.reduce(
      (total: number, item: any) => {

        return total +
          (item.productId.price * item.quantity);

      },
      0
    );

  }

}
