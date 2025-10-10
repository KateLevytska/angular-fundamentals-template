import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    Observable,
    BehaviorSubject
} from "rxjs";
import { tap } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";
import {
    LoginResponse,
    User
} from '@app/interfaces';
import { httpOptions } from '@app/service.data';
import {
    BASE_URL,
    ENDPOINTS
} from '@shared/constants/api.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject(this.SessionStorageService.hasToken());
    isAuthorized$ : Observable<boolean> = this.isAuthorized$$.asObservable();
    token = this.SessionStorageService.getToken() as string;



    private getAuthOptions() {
        return {
            headers: httpOptions.headers.set('Authorization', `${this.token}`)
        };
    }

    constructor(private http: HttpClient, private SessionStorageService: SessionStorageService) { }

    login(user: User) {
        return this.http.post<LoginResponse>(BASE_URL + ENDPOINTS.LOGIN, user, httpOptions)
        .pipe(tap((result) => {
            this.SessionStorageService.setToken(result.result)
            this.isAuthorised = result.successful;
        } ));
    }

    logout() {
        this.http.delete(BASE_URL + ENDPOINTS.LOGOUT, this.getAuthOptions());
    }

    register(user: User) {
        return this.http.post<User>(BASE_URL + ENDPOINTS.REGISTER, user, httpOptions)
    }


    get isAuthorised() {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    removeToken() {
       this.SessionStorageService.deleteToken(),
        this.isAuthorized$$.next(false);
    }
}
