import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, take } from "rxjs";
import { UserService } from "./user.service";
import { UserResponse, UserObject } from '@app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private courseUrl: string = '/course';
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    private name$$ = new BehaviorSubject<string>('');
    name$: Observable<string> = this.name$$.asObservable();
    isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private UserService: UserService) { }

    getUser() {
        return this.UserService.getUser().pipe(take(1)).subscribe(
            {
                next: (e : UserResponse) => {
                    this.name$$.next(e.result.name)
                    if(e.result.role === 'admin') this.isAdmin = true;
                }
            }
        );
    }

    get isAdmin() {
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }

    getCourseUrl() {
        return this.courseUrl;
    }
}
