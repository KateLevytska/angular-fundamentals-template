import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { routing } from './app-routing.module';
import { StoreModule } from "@ngrx/store";
import { effects, reducers } from "@app/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        FontAwesomeModule,
        routing,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects)
    ],
    providers: [
        AuthorizedGuard,
        NotAuthorizedGuard,
        CoursesService,
        CoursesStoreService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}