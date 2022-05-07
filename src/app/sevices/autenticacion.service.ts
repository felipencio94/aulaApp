import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    var rutaActual = this.router.getCurrentNavigation();
    var modeloUsuario = "";
    var modeloContrasena = "";

    try {
      modeloUsuario = rutaActual.extras.state.user;
      modeloContrasena = rutaActual.extras.state.pass;

      if (modeloUsuario == 'admin' && modeloContrasena == 'admin') {
        return true;
      }
    } catch (error) {
      
    }
    this.router.navigate(['login'])
    return false;
  }

  login(modeloUsuario, modeloContrasena): boolean{
    if(modeloUsuario == 'admin' && modeloContrasena == 'admin'){
      return true;
    } else{
    return false;
  }}

  loginApi(modeloUsuario, modeloContrasena){
    
  }
}
