import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriaClinicaBuscarPage } from './historia-clinica-buscar.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriaClinicaBuscarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriaClinicaBuscarPageRoutingModule {}
