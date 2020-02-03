import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioDatosPageRoutingModule } from './usuario-datos-routing.module';

import { UsuarioDatosPage } from './usuario-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioDatosPageRoutingModule
  ],
  declarations: [UsuarioDatosPage]
})
export class UsuarioDatosPageModule {}
