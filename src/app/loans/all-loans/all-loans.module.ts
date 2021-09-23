import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllLoansComponent } from './all-loans.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const route: Routes = [
  {
    path: '',
    component: AllLoansComponent
  }
];

@NgModule({
  declarations: [AllLoansComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class AllLoansModule { }
