import { Component, OnInit } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mocks';
import { AuthService } from './auth/services/auth.service';
import { UserStoreService } from './user/services/user-store.service';
import { ROUTES } from './shared/constants/routes';
import { Router } from '@angular/router';
import { take, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  isLoggedIn = false;
  isAdmin = this.UserStoreService.isAdmin;
  userName = this.isLoggedIn? this.UserStoreService.name$ : null;


  constructor(private AuthService: AuthService, private UserStoreService: UserStoreService, private router: Router) { }

  ngOnInit(): void {
    this.AuthService.isAuthorized$.pipe().subscribe(e => {
      this.isLoggedIn = e;
    })
    if(this.isLoggedIn) this.UserStoreService.getUser();
    this.UserStoreService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      console.log(this.isAdmin)
    });
  }

  handleShowCourse() {
    console.log('Show Course button clicked!');
  }

  handleLogout() {

    this.isLoggedIn = false;
    this.AuthService.removeToken();
    this.UserStoreService.isAdmin = false;
        console.log(this.UserStoreService.isAdmin)
    this.router.navigate([ROUTES.LOGIN]);
  }

  handleEditCourse() {
    console.log('Edit Course button clicked!');
  }

  handleDeleteCourse() {
    console.log('Delete Course button clicked!');
  }
}
