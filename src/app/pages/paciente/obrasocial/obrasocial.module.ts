import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObrasocialPageRoutingModule } from './obrasocial-routing.module';

import { ObrasocialPage } from './obrasocial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObrasocialPageRoutingModule
  ],
  declarations: [ObrasocialPage]
})
export class ObrasocialPageModule {}
