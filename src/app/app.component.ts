
import { Component } from '@angular/core';
import { CartService } from './core/services/cart.service';
import { ProductService } from './core/services/product.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showCart = false;

  cart: any = {
    items: []
  };

  cartProducts: any[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  // Abrir / cerrar carrito
  toggleCart(): void {

    this.showCart = !this.showCart;

    if (this.showCart) {
      this.loadCart();
    }

  }

  // Cerrar carrito
  closeCart(): void {

    this.showCart = false;

  }

  // Obtener carrito
  loadCart(): void {

    this.cartService.getCart().subscribe({

      next: (data) => {

        this.cart = data;

        console.log('🛒 Carrito:', this.cart);

        this.loadCartProducts();

      },

      error: (error) => {

        console.error(
          '❌ Error al obtener el carrito:',
          error
        );

      }

    });

  }

  // Buscar los productos correspondientes a los productId

loadCartProducts(): void {

  this.productService.getProducts().subscribe({

    next: (products: Product[]) => {

      this.cartProducts = this.cart.items.map((item: any) => {

        // Si productId viene como objeto poblado,
        // usamos directamente ese producto
        if (typeof item.productId === 'object' && item.productId !== null) {

          return {
            product: item.productId,
            quantity: item.quantity
          };

        }

        // Si productId viene como string,
        // buscamos el producto en la lista
        const product = products.find(
          p => p._id?.toString() === item.productId?.toString()
        );

        return {
          product: product,
          quantity: item.quantity
        };

      });

      console.log(
        '🛍️ Productos del carrito:',
        this.cartProducts
      );

    },

    error: (error) => {

      console.error(
        '❌ Error al obtener los productos:',
        error
      );

    }

  });
}


removeFromCart(productId: string): void {

  this.cartService.removeFromCart(productId).subscribe({

    next: (response) => {

      console.log('🗑️ Producto eliminado:', response);

      // Volvemos a cargar el carrito
      this.loadCart();

    },

    error: (error) => {

      console.error(
        '❌ Error al eliminar producto:',
        error
      );

    }

  });

}


}
