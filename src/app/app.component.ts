import { Component } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  courses = mockedCoursesList;
  isLoggedIn = false;
  userName = 'User Name';

  handleShowCourse() {
    console.log('Show Course button clicked!');
  }

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  handleEditCourse() {
    console.log('Edit Course button clicked!');
  }

  handleDeleteCourse() {
    console.log('Delete Course button clicked!');
  }
}
