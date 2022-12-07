import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {
  baseUrl: string = 'http://localhost:8080'

  constructor(private httpClient : HttpClient) { }

  getProducts(): Observable<Product[]> {
    let url = this.baseUrl+'/product';
    return this.httpClient.get<Product[]>(url);
  }

  getProductsByPrice(price: number): Observable<Product[]> {
    let url = this.baseUrl+`/product/price/${price}`;
    return this.httpClient.get<Product[]>(url);
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    let url = this.baseUrl+`/product/brand/${brand}`;
    return this.httpClient.get<Product[]>(url);
  }

  getProductByProductId(productId: number): Observable<Product> {
    let url = this.baseUrl+`/product/${productId}`;
    return this.httpClient.get<Product>(url);
  }
}
