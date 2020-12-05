import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

	private baseUrl:string = 'http://store.msou.com/api/user.php';
	userDetails:any;

  constructor(private http: HttpClient) { }

  getUserDetails(email:string) {
  	let action = 'user_details';
    return this.http.post<any>(this.baseUrl, { action, email });
  }
}
