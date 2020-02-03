import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriaClinicaNuevoPage } from './historia-clinica-nuevo.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriaClinicaNuevoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriaClinicaNuevoPageRoutingModule {}
