import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
    HeaderComponent,
    ButtonComponent,
    SearchComponent,
    CourseCardComponent,
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { AuthorsPipe } from './pipes/authors-ids.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { RouterLink } from "@angular/router";

const components = [
    HeaderComponent,
    ButtonComponent,
    SearchComponent,
    ModalComponent,
    CourseCardComponent,
    DurationPipe,
    CustomDatePipe,
    AuthorsPipe,
    EmailValidatorDirective
];

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterLink
    ],
    exports: [components]
})
export class SharedModule { }
