import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { InfoComponent } from './info.component';

const routes: Routes = [
  { path: '', component: InfoComponent }
];

@NgModule({
  declarations: [InfoComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule, 
    SharedModule,
    RouterModule.forChild(routes)
]
})
export class InfoModule {}
