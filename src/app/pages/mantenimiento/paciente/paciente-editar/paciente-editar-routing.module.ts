import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteEditarPage } from './paciente-editar.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteEditarPageRoutingModule {}
