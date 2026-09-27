
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product.model';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  addToCart(product: any): void {

    console.log('Producto seleccionado:', product);
    console.log('ID del producto:', product._id);

    this.cartService.addToCart(product._id).subscribe({
      next: (response) => {
        console.log('✅ Producto agregado al carrito:', response);
      },
      error: (error) => {
        console.error('❌ Error agregando al carrito:', error);
      }
    });
  }

  ngOnInit(): void {

    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {

        this.route.paramMap.subscribe(params => {

          const category = params.get('category');

          if (category) {

            this.products = res.filter(
              product =>
                product.category?.toLowerCase() === category.toLowerCase()
            );

          } else {

            this.products = res;

          }

        });

      },

      error: (err) => {
        console.error('❌ Error al cargar productos:', err);
      }
    });

  }
}

