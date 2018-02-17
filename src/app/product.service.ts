import { Injectable } from '@angular/core';
import { Product, PRODUCTS } from './product/productList';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {
  private productsUrl = 'api/products';

  /** GET productes from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => this.log(`fetched Products`)),
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET product by id. Return `undefined` when id not found */
  getProductNo404<Data>(id: number): Observable<Product> {
    const url = `${this.productsUrl}/?id=${id}`;
    return this.http.get<Product[]>(url)
      .pipe(
        map(products => products[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} product id=${id}`);
        }),
        catchError(this.handleError<Product>(`getproduct id=${id}`))
      );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getproduct id=${id}`))
    );
  }

  /* GET productes whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(`api/products/?name=${term}`).pipe(
      tap(_ => this.log(`found products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a productService message with the MessageService */
  private log(message: string) {
    this.messageService.add('productService: ' + message);
  }

  constructor(private messageService: MessageService, private http: HttpClient) { }

}
