import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    // private tokenExpirationTimer: any;

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxT5kCdhuyereHJ30jwATv2-rY6XFVEvI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxT5kCdhuyereHJ30jwATv2-rY6XFVEvI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(resData => this.handleAuthentication
                (resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )));
    }

    private handleError(errorRes: HttpErrorResponse) {
        // console.log(errorRes);
        let errorMessage = 'An unknown error occurred !';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email was not found!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found!';
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        // this.autoLogout(expiresIn * 1000);
        // localStorage.setItem('userData', JSON.stringify(user));
    }
}