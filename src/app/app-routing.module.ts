import {RouterModule, Routes} from '@angular/router';
import {AuthorizedGuard} from './auth/guards/authorized.guard';
import {NotAuthorizedGuard} from './auth/guards/not-authorized.guard';
import {AdminGuard} from './user/guards/admin.guard';
import {ROUTES} from '@shared/constants/routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
    },
    {
        path: `${ROUTES.LOGIN}`,
        canActivate: [NotAuthorizedGuard],
        loadChildren: () => import('./shared/components/login-form/login-form.module')
            .then(m => m.LoginModule)
    },
    {
        path: `${ROUTES.REGISTER}`,
        canActivate: [NotAuthorizedGuard],
        loadChildren: () => import('./shared/components/registration-form/registration-form.module')
            .then(m => m.RegistrationModule)
    },
    {
        path: `${ROUTES.COURSES}`,
        canLoad: [AuthorizedGuard],
        canActivate: [AuthorizedGuard],
        loadChildren: () => import('./features/courses/courses.module')
            .then(m => m.CoursesModule)
    },
    {
        path: 'courses/add',
        canLoad: [AuthorizedGuard],
        canActivate: [AuthorizedGuard, AdminGuard],
        loadChildren: () => import('./shared/components/course-form/course-form.module')
            .then(m => m.CourseFormModule)
    },
    {
        path: `${ROUTES.COURSE_INFO}/:id`,
        canLoad: [AuthorizedGuard],
        canActivate: [AuthorizedGuard],
        loadChildren: () =>
            import('./features/course-info/course-info.module').then(
                (m) => m.CourseInfoModule
            ),
    },
    {
        path: `${ROUTES.COURSE_EDIT}/:id`,
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard, AuthorizedGuard],
        loadChildren: () => import('./shared/components/course-form/course-form.module')
            .then(m => m.CourseFormModule)
    }
];

export const routing = RouterModule.forRoot(routes);
