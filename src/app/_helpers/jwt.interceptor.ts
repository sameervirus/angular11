import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/';
const apiUrl = 'http://store.msou.com/api/';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.jwt;
        const isApiUrl = request.url.startsWith(apiUrl);
        if (isLoggedIn) {
            console.log('yes had header')
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.jwt}`
                }
            });
        }

        return next.handle(request);
    }
}