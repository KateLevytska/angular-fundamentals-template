import { Injectable } from '@angular/core';
import {
    Observable,
    BehaviorSubject,
    take,
    tap
} from "rxjs";
import { UserService } from "./user.service";
import { UserResponse } from '@app/interfaces';
import { ROUTES } from '@shared/constants/routes';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private courseUrl: string = ROUTES.COURSES;
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    private name$$ = new BehaviorSubject<string>('');
    name$: Observable<string> = this.name$$.asObservable();
    isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private UserService: UserService) { }

    getUser(): Observable<UserResponse> {
        return this.UserService.getUser().pipe(
            take(1),
            tap((e: UserResponse) => {
                this.setName = e.result.name;
                this.isAdmin = e.result.role === 'admin';
            })
        );
    }


    set setName(value: string) {
        this.name$$.next(value);
    }

    get getName() : string {
        return this.name$$.value;
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
