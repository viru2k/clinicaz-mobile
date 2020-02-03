import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObrasocialPage } from './obrasocial.page';

const routes: Routes = [
  {
    path: '',
    component: ObrasocialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObrasocialPageRoutingModule {}
