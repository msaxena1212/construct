import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Master } from './master/master';

const routes: Routes = [
  {
    path: '', component: Master,
    children: [
      {
        path: 'user-management',
        loadChildren: () => import('./user-management-module').then(m => m.UserManagementModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dasboard-module').then(m => m.DasboardModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
