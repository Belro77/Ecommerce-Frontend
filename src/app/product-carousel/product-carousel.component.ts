
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit {

  productos: any[] = [];
  productosCarrusel: any[] = [];

  currentIndex = 0;
  cardWidth = 0;

  @ViewChild('carouselWindow', { static: false })
  carouselWindow!: ElementRef;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit(): void {

    if (this.carouselWindow) {
      this.cardWidth =
        this.carouselWindow.nativeElement.offsetWidth;
    }

    window.addEventListener('resize', () => {

      if (this.carouselWindow) {
        this.cardWidth =
          this.carouselWindow.nativeElement.offsetWidth;
      }

    });
  }


  // Mover el carrusel
  get transformStyle(): string {
    return `translateX(-${this.currentIndex * this.cardWidth}px)`;
  }


  // Avanzar
  nextSlide(): void {

    if (
      this.currentIndex <
      this.productosCarrusel.length - 1
    ) {

      this.currentIndex++;

    }

  }


  // Retroceder
  prevSlide(): void {

    if (this.currentIndex > 0) {

      this.currentIndex--;

    }

  }


  // Cargar productos desde el backend
  cargarProductos(): void {

    this.productService.getProducts().subscribe({

      next: (data) => {

        console.log(
          'PRODUCTOS DEL CARRUSEL:',
          data
        );

        this.productos = data;

        this.productosCarrusel = data;

      },

      error: (error) => {

        console.error(
          'Error al cargar los productos:',
          error
        );

      }

    });

  }

}

