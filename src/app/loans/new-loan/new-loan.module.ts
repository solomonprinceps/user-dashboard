import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLoanComponent } from './new-loan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  {
    path: '',
    component: NewLoanComponent
  }
];

@NgModule({
  declarations: [NewLoanComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class NewLoanModule { }
