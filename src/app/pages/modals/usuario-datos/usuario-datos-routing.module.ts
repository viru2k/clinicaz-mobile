import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioDatosPage } from './usuario-datos.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioDatosPageRoutingModule {}
