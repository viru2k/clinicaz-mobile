import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HistoriaClinicaNuevoPageModule } from './pages/historia-clinica/historia-clinica-nuevo/historia-clinica-nuevo.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  { path:  'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  
  
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'agenda/turno',
    loadChildren: () => import('./pages/agenda/turno/turno.module').then( m => m.TurnoPageModule)
  },
  
  {
    path: 'paciente/editar',
    loadChildren: () => import('./pages/mantenimiento/paciente/paciente-editar/paciente-editar.module')
    .then( m => m.PacienteEditarPageModule)
  },
  {
    path: 'paciente/buscar',
    loadChildren: () => import('./pages/paciente/buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'paciente/obrasocial',
    loadChildren: () => import('./pages/paciente/obrasocial/obrasocial.module').then( m => m.ObrasocialPageModule)
  },
  {
    path: 'paciente-lista',
    loadChildren: () => import('./pages/mantenimiento/paciente/paciente-lista/paciente-lista.module').then( m => m.PacienteListaPageModule)
  },
  {
    path: 'historiaclinica',
    loadChildren: () => import('./pages/historia-clinica/historia-clinica.module').then( m => m.HistoriaClinicaPageModule)
  },
  {
    path: 'buscar',
    loadChildren: () => import('./pages/paciente/buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'obrasocial',
    loadChildren: () => import('./pages/paciente/obrasocial/obrasocial.module').then( m => m.ObrasocialPageModule)
  },
  {
    path: 'historiaclinica/buscar',
    loadChildren: () => import('./pages/modals/historia-clinica-buscar/historia-clinica-buscar.module').then( m => m.HistoriaClinicaBuscarPageModule)
  },
  {
    path: 'historiaclinica/nuevo',
    loadChildren: () => import('./pages/historia-clinica/historia-clinica-nuevo/historia-clinica-nuevo.module').then( m => m.HistoriaClinicaNuevoPageModule)
  },
  {
    path: 'usuario-datos',
    loadChildren: () => import('./pages/modals/usuario-datos/usuario-datos.module').then( m => m.UsuarioDatosPageModule)
  },
  {
    path: 'paciente-buscar',
    loadChildren: () => import('./pages/modals/paciente-buscar/paciente-buscar.module').then( m => m.PacienteBuscarPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'usuario-agenda',
    loadChildren: () => import('./pages/modals/usuario-agenda/usuario-agenda.module').then( m => m.UsuarioAgendaPageModule)
  },
  {
    path: 'usuario-horario',
    loadChildren: () => import('./pages/modals/usuario-horario/usuario-horario.module').then( m => m.UsuarioHorarioPageModule)
  }
];
@NgModule({
  imports: [
 
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
