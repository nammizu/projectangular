import { Injectable } from '@angular/core';
import { Product, PRODUCTS } from './product/productList';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class ProductService {
  getProducts(): Observable<Product[]> {
    this.messageService.add('ProductService: fetched products');
    return of(PRODUCTS);
  }

  getProduct(id: number): Observable<Product> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`ProductService: fetched product id=${id}`);
    return of(PRODUCTS.find(hero => hero.id === id));
  }

  constructor(private messageService: MessageService) { }

}
