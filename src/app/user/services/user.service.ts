import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpSentEvent } from '@angular/common/http';
import { UserResponse } from '../../interfaces';
import { httpOptions } from '../../service.data';
import { BASE_URL, ENDPOINTS } from '../../shared/constants/api.constants';
import { SessionStorageService } from "../../auth/services/session-storage.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    token = this.SessionStorageService.getToken();
    constructor(private http: HttpClient, private SessionStorageService: SessionStorageService) { }

    private getAuthOptions() {
        return {
            headers: httpOptions.headers.set('Authorization', `${this.token}`)
        };
    }

    getUser() {
        return this.http.get<UserResponse>(BASE_URL + ENDPOINTS.USER, this.getAuthOptions());
    }
}

