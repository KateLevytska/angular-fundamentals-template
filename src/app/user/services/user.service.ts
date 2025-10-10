import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '@app/interfaces';
import { httpOptions } from '@app/service.data';
import {
    BASE_URL,
    ENDPOINTS
} from '@shared/constants/api.constants';
import { SessionStorageService } from "@app/auth/services/session-storage.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient, private SessionStorageService: SessionStorageService) { }

    private getAuthOptions() {
        const token = this.SessionStorageService.getToken();
        return { headers: httpOptions.headers.set('Authorization', `${token}`) };
    }

    getUser() {
        return this.http.get<UserResponse>(BASE_URL + ENDPOINTS.USER, this.getAuthOptions());
    }
}

