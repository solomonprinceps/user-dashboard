import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'loans',
        children: [
          {
            path: 'all',
            loadChildren: () => import('./loans/all-loans/all-loans.module').then(m => m.AllLoansModule)
          },
          {
            path: 'view/:id',
            loadChildren: () => import('./loans/single-loan/single-loan.module').then(m => m.SingleLoanModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./loans/new-loan/new-loan.module').then(m => m.NewLoanModule)
          }
        ]
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
