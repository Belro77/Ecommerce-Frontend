
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://eccomerce-backend-0750.onrender.com/cart';

  private userId = 'usuario-prueba';

  constructor(private http: HttpClient) {}


  // Obtener carrito
  getCart(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${this.userId}`
    );
  }


  // Agregar producto
  addToCart(productId: string): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/${this.userId}/add`,
      {
        productId: productId,
        quantity: 1
      }
    );
  }


  // Eliminar producto
  removeFromCart(productId: string): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/${this.userId}/remove`,
      {
        productId: productId
      }
    );
  }

}