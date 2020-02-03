import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteBuscarPage } from './paciente-buscar.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteBuscarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteBuscarPageRoutingModule {}
