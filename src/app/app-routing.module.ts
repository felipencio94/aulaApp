import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticacionService } from './sevices/autenticacion.service';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',///cambiar a 'login' luego de hacer pruebas en AndroidStudio (api no funciona en dispositivo)
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    redirectTo: 'recuperar',
    pathMatch: 'full'
  },
  {
    path: 'cambiar',
    redirectTo: 'cambiar',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'inicio/asistencia',
    redirectTo: 'inicio/asistencia',
    pathMatch: 'full'
  },

  {
    path: 'inicio/leccionario',
    redirectTo: 'inicio/leccionario',
    pathMatch: 'full'
  },
  {
    path: 'inicio/notas',
    redirectTo: 'inicio/notas',
    pathMatch: 'full'
  },
  {
    path: 'inicio/notas/mostrar-notas',
    redirectTo: 'inicio/notas/mostrar-notas',
    pathMatch: 'full'
  },
  {
    path: 'inicio/notas/ingresar-notas',
    redirectTo: 'inicio/notas/ingresar-notas',
    pathMatch: 'full'
  },

  {
    path: 'inicio/horarios',
    redirectTo: 'inicio/horarios',
    pathMatch: 'full'
  },

  {
    path: 'inicio/perfil-usuario',
    redirectTo: 'inicio/perfil-usuario',
    pathMatch: 'full'
  },

  {
    path: 'inicio/asistencia/asistencia-alumnos',
    redirectTo: 'inicio/asistencia/asistencia-alumnos',
    pathMatch: 'full'
  },
  {
    path: 'inicio/asistencia/ingresar-asistencia',
    redirectTo: 'inicio/asistencia/ingresar-asistencia',
    pathMatch: 'full'
  },
  {
    path: 'inicio/asistencia/ver-asistencia',
    redirectTo: 'inicio/asistencia/ver-asistencia',
    pathMatch: 'full'
  },

  {
    path: 'inicio/horarios/horario-selected',
    redirectTo: 'inicio/horarios/horario-selected',
    pathMatch: 'full'
  },
  {
    path: 'inicio/hoja-de-vida',
    redirectTo: 'inicio/hoja-de-vida',
    pathMatch: 'full'
  },
  {
    path: 'inicio/hoja-de-vida/nueva-hdv',
    redirectTo: 'inicio/hoja-de-vida/nueva-hdv',
    pathMatch: 'full'
  },

  {
    path: 'inicio/hoja-de-vida/ver-hdv',
    redirectTo: 'inicio/hoja-de-vida/ver-hdv',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    ///canActivate: [AutenticacionService]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/inicio/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'cambiar',
    loadChildren: () => import('./pages/cambiar/cambiar.module').then( m => m.CambiarPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
