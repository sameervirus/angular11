import { Injectable } from '@angular/core';
import { Product, Item } from '../_models';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ItemService {

	private baseUrl:string = 'http://store.msou.com/api/product.php';

	constructor(private http: HttpClient) { }

	getItemDetails(id:number): Observable<Product> {
    let action = 'itemDetails';
		return this.http.post<Product>(this.baseUrl, {action, id} ).pipe(
			tap(_ => this.log(`fetched Product id=${id}`)),
			catchError(this.handleError<Product>(`getItemDetails id=${id}`))
		);
	}

  getRelatedItem(category:string, id:number): Observable<Item> {
    let action = 'related';
    return this.http.post<Item>(this.baseUrl, {action, category, id}).pipe(
      tap(_ => this.log(`fetched related id=${id}`)),
      catchError(this.handleError<Item>(`getRelatedItem id=${id}`))
    );
  }

  cartData(ids:[]): Observable<[]> {
    let action = 'cartData';
    return this.http.post<[]>(this.baseUrl,{action, ids}).pipe(
      tap(_ => this.log(`fetched Product id=${ids}`)),
      catchError(this.handleError<[]>(`getItemDetails id=${ids}`))
    );
  }

  getCategoriesNames() {
    let action = 'categories_name';
    return this.http.post(this.baseUrl, {action} ).pipe(
      tap(_ => this.log(`get category list`)),
      catchError(this.handleError(`get category list`))
    );
  }

  getCategory(category:string) {
    let action = 'category';
    return this.http.post(this.baseUrl,{action, category}).pipe(
      tap(_ => this.log(`get category items`)),
      catchError(this.handleError(`get category list`))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
