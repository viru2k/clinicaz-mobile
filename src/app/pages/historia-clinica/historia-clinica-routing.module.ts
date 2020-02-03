import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriaClinicaPage } from './historia-clinica.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriaClinicaPage
  },
  {
    path: 'estudio',
    loadChildren: () => import('./estudio/estudio.module').then( m => m.EstudioPageModule)
  },
  {
    path: 'historia-clinica-nuevo',
    loadChildren: () => import('./historia-clinica-nuevo/historia-clinica-nuevo.module').then( m => m.HistoriaClinicaNuevoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriaClinicaPageRoutingModule {}
