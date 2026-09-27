import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.API_URL}/products`);
  }

  getCart(userId: string) {
    return this.http.get(`${this.API_URL}/cart/${userId}`);
  }

  addToCart(userId: string, productId: string) {
    return this.http.post(`${this.API_URL}/cart/add`, {
      userId,
      productId,
      quantity: 1
    });
  }
}
