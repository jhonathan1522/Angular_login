import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  {
    path:'home',
    component:InicioComponent
  },

  {
    path: '',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path: 'administracion',
    loadChildren: () => import('./modulos/administracion/administracion.module').then(a => a.AdministracionModule)
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(s => s.SeguridadModule)
  },
  {
    path:'**',
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
