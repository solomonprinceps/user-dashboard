import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleLoanComponent } from './single-loan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  {
    path: '',
    component: SingleLoanComponent
  }
];

@NgModule({
  declarations: [SingleLoanComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class SingleLoanModule { }
