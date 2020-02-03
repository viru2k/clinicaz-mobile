import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabagenda',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/agenda/agenda.module').then(m => m.AgendaPageModule)
          }
        ]
      },
      {
        path: 'tabturno',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/agenda/turno/turno.module').then(m => m.TurnoPageModule)
          }
        ]
      },
      {
        path: 'tabhistoriaclinica',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaPageModule)
          }
        ]
      },
      {
        path: 'tabajustes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/usuario/usuario.module').then(m => m.UsuarioPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],


exports: [RouterModule]
})
export class TabsPageRoutingModule {}
