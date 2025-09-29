import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { AppModule } from './app.module';
import { CoursesComponent } from './features/courses/courses.component';
import { ROUTES } from './shared/constants/routes';

export const routes: Routes = [
    {
        path: '',
        canLoad: [AuthorizedGuard],
        redirectTo: 'courses',
        pathMatch: 'full'
    },
    {
        path: 'login',
        canActivate: [NotAuthorizedGuard],
        loadChildren: () => import('./shared/components/login-form/login-form.module')
            .then(m => m.LoginModule)
    },
    {
        path: 'registration',
        canActivate: [NotAuthorizedGuard],
        loadChildren: () => import('./shared/components/registration-form/registration-form.module')
            .then(m => m.RegistrationModule)
    },
    {
        path: 'courses',
        canLoad: [AuthorizedGuard],
        loadChildren: () => import('./features/courses/courses.module')
            .then(m => m.CoursesModule)
    },
    {
        path: 'courses/add',
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard],
        loadChildren: () => import('./shared/components/course-form/course-form.module')
            .then(m => m.CourseFormModule)
    },
    {
        path: `${ROUTES.COURSE_INFO}/:id`,
        canLoad: [AuthorizedGuard],
        loadChildren: () =>
            import('./features/course-info/course-info.module').then(
                (m) => m.CourseInfoModule
            ),
    },
    {
        path: `${ROUTES.COURSE_EDIT}/:id`,
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard],
        loadChildren: () => import('./shared/components/course-form/course-form.module')
            .then(m => m.CourseFormModule)
    }
    /*  {
         path: '**',
         loadChildren: () => import('./shared/components/page-not-found-component/page-not-found-component.component')
             .then(m => m.PageNotFoundComponent)
     }  */
];

export const routing = RouterModule.forRoot(routes);
