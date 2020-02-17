import { NgModule , LOCALE_ID, Injector} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {  IonicRouteStrategy,IonicModule,NavController, NavParams  } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS,HttpClientModule  } from '@angular/common/http';
import { DatePipe ,registerLocaleData} from '@angular/common';


// ==============================================
// LIBRERIAS DE TERCEROS
// ==============================================
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';

// ==============================================
// CLASES PROPIAS
// ==============================================

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { BuscarPageModule } from './pages/paciente/buscar/buscar.module';
import { HistoriaClinicaBuscarPageModule } from './pages/modals/historia-clinica-buscar/historia-clinica-buscar.module';
import { PacienteBuscarPageModule } from './pages/modals/paciente-buscar/paciente-buscar.module';
import { UsuarioDatosPageModule } from './pages/modals/usuario-datos/usuario-datos.module';
import localeEsAR from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAR, 'es-Ar');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
 

  
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, SweetAlert2Module.forRoot(),
    FontAwesomeModule,
    BuscarPageModule,
    FileUploadModule,
    HistoriaClinicaBuscarPageModule,
    PacienteBuscarPageModule,
    UsuarioDatosPageModule,
    CalendarModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function(injector: Injector) {
          return new JwtInterceptor(injector);
      },
      multi: true,
      deps: [Injector]
    },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },{ provide: LOCALE_ID, useValue: 'es-Ar' }],
  
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
