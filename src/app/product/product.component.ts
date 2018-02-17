import { Component, OnInit } from '@angular/core';
import { Product, PRODUCTS } from './productList';
import { NgModel } from '@angular/forms';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  show = 6;
  products: Product[];

  selectedProduct: Product;

  onSelect(data: Product): void {
    console.log('selected :', data);
    this.selectedProduct = data;
  }

  getProducts(): void {
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

}
