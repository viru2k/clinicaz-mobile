import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioAgendaPage } from './usuario-agenda.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioAgendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioAgendaPageRoutingModule {}
