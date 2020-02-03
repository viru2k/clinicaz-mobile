import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteListaPage } from './paciente-lista.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteListaPageRoutingModule {}
