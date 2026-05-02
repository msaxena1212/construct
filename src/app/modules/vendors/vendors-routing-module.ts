import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vendors } from './vendors';

const routes: Routes = [{ path: '', component: Vendors },
{
  path: ':id',
  component: Vendors
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule { }
