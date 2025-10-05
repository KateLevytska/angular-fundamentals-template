import { Injectable, Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>(
    'Window object',
    {
        providedIn: 'root',
        factory: () => window
    }
);

@Injectable({
    providedIn: 'root'
})

export class SessionStorageService {
    token: string = '';
    TOKEN : string = 'SESSION_TOKEN';

    constructor(@Inject(WINDOW) private window: Window) {}

    setToken(token: string) {
        this.token = token;
        this.window.sessionStorage.setItem(this.TOKEN, token);
    }

    getToken(): string | null {
        return this.window.sessionStorage.getItem(this.TOKEN);
    }

    deleteToken() {
        this.window.sessionStorage.removeItem(this.TOKEN);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }
}