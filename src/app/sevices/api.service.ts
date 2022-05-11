import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/usuario.models';
import { Respuesta } from '../interface/Respuesta';
import { map, withLatestFrom } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { Persona } from '../interface/persona';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient,  public alertController:AlertController, public navController: NavController) { }
  rutaBase: string = 'http://localhost:3000';

 

  public usuarioAuth : string;
  public claveAuth : string;
  public usuarioLogueado : Persona;
  obtenerUsuarios(){
    return this.http.get<Usuario[]>(this.rutaBase + '/usuario');
  }

  validarLogin(usuario, contrasena) {
    return this.http.get<Respuesta>(this.rutaBase + '/loginusuario?run=' + usuario + '&pass=' + contrasena)
      .pipe( map(auth => {
        if(auth.result === 'LOGIN OK'){
          console.log(usuario + contrasena);
          this.usuarioAuth=usuario;
          this.claveAuth=contrasena;
       }
      return auth;
     }));
    }

    recuperarDatosUsuario(run) {
      return this.http.get<Respuesta>(this.rutaBase + '/datosUsuario?run=' + run)
        .pipe( map(auth => {
          if(auth.result !== null){
            console.log(auth.result);
            this.usuarioLogueado = {
              runCompleto:auth.result[0][0],
              nombreCompleto:auth.result[0] [1],
              fecNacimiento: auth.result[0][2] ,
              sexo:auth.result[0][3],
              pueblo: auth.result[0][4],
              direccion: auth.result[0][5],
              correo : auth.result[0][6],
              codigoUsuario : auth.result[0][7],
              rolUsuario: auth.result[0][8],
              estadoUsuario: auth.result[0][9],
              passwordUsuario: auth.result[0][10]}
         }
        return auth;
       }));
      }

}
