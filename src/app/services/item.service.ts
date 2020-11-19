import { Injectable } from '@angular/core';
import { Product, Item } from '../models/Product';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ItemService {

	private productUrl:string = 'https://www.msou.com/3.php';

	httpOptions = {
	    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private http: HttpClient) { }

	getItemDetails(id:number): Observable<Product> {
		const url = `${this.productUrl}?action=itemDetails&item=${id}`;
		return this.http.get<Product>(url, this.httpOptions).pipe(
			tap(_ => this.log(`fetched Product id=${id}`)),
			catchError(this.handleError<Product>(`getItemDetails id=${id}`))
		);
	}

  getRelatedItem(category:string, id:number): Observable<Item> {
    const url = `${this.productUrl}?action=related&categoryId=${category}&itemId=${id}`;
    return this.http.get<Item>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched related id=${id}`)),
      catchError(this.handleError<Item>(`getRelatedItem id=${id}`))
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
