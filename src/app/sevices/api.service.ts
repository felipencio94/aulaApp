import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/usuario.models';
import { Respuesta } from '../interface/Respuesta';
import { map, withLatestFrom } from 'rxjs/operators';
// import { HttpHeaders } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { Persona } from '../interface/persona';
import { Nivel } from '../interface/nivel';
import { Curso } from '../interface/curso';
import { Alumno } from '../interface/alumno';
import { Asignatura } from '../interface/asignatura';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  listaAlumnos: Alumno[] = [];

  constructor(private http: HttpClient,  
    public alertController:AlertController, 
    public navController: NavController) { }
  rutaBase: string = 'http://localhost:3000';

 

  public usuarioAuth : string;
  public claveAuth : string;
  public usuarioLogueado : Persona;
  public usuarioRecuperar: Persona;
  obtenerUsuarios(){
    return this.http.get<Usuario[]>(this.rutaBase + '/usuario');
  }

  cambiarClave(run, nuevaContrasena){
    // console.log(run);
    // console.log(nuevaContrasena);
    return this.http.post(this.rutaBase + '/cambiarClave',{clave:nuevaContrasena,run:run})//////////////ojito
    
  }

  obtenerNiveles(){
    return this.http.get<Nivel>(this.rutaBase + '/nivel');
  }

  obtenerCursos(ID_NIVEL){
    return this.http.get<Curso>(this.rutaBase + '/cursos?ID_NIVEL=' + ID_NIVEL);
  }

  obtenerAlumnos(idCurso){
    return this.http.get<Alumno[]>(this.rutaBase + '/cursoAlumno?idCurso=' + idCurso);
  }

  obtenerAsignatura(idCurso){
    return this.http.get<Asignatura[]>(this.rutaBase + '/asignatura?idCurso=' + idCurso);
  }

  validarLogin(usuario, contrasena) {
    return this.http.get<Respuesta>(this.rutaBase + '/loginusuario?run=' + usuario + '&pass=' + contrasena)
      .pipe( map(auth => {
        if(auth.result === 'LOGIN OK'){
          ///console.log(usuario + contrasena);
          this.usuarioAuth=usuario;
          this.claveAuth=contrasena;
       }
      return auth;
     }));
    }

    recuperarDatosUsuario(run) {
      return this.http.get<Respuesta>(this.rutaBase + '/datosUsuario?run=' + run)
        .pipe( map(auth => {
          
          if(auth != null){
            // console.log(auth.result);
            // debugger;
            try{

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
                passwordUsuario: auth.result[0][10],
                runUsuario: auth.result[0][11]
              }
            }catch{
              console.log('error');
              this.usuarioLogueado = {runCompleto:''
              };
            }
         }
        return auth;
       }));
      }

      enviarCorreo(nombres, mail, codigoOtp){
        return this.http.post(this.rutaBase+ '/send-email',{nombres, mail, codigoOtp})
      }

      crearCodigoOtp(run, mail){
        return this.http.post(this.rutaBase+ '/crearCodigo',{run, mail})
      }

      validarCodigo(codigoOtp, mail, run){
        return this.http.post(this.rutaBase+ '/validarCodigo',{codigoOtp, mail, run})
      }

}
