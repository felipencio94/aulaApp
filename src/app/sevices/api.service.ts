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
import { Asistencia } from '../interface/asistencia';
import { Asignatura } from '../interface/asignatura';
import { Observacion } from '../interface/observacion';

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

  // modificarContrasena(usuario, contrasena) {
  //   return this.http.put(this.rutaBase, { nombreFuncion: "UsuarioModificarContrasena", parametros: { usuario: usuario, contrasena: contrasena } });
  // }

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
  obtenerAsistencia(idCurso, fechaAsistencia){
    return this.http.get<Asistencia[]>(this.rutaBase + '/obtenerAsistencia?idCurso=' + idCurso + '&fechaAsistencia='+ fechaAsistencia);
  }

  obtenerObservacion(run){
    return this.http.get<Observacion[]>(this.rutaBase + '/obtenerObservacion?run=' + run);
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
    
    // soloUsuario(run){
    //   return this.http.post<Usuario>(this.rutaBase + '/soloUsuario',{run:run})
      
    // }

    recuperarDatosUsuario(run) {
      return this.http.get<Respuesta>(this.rutaBase + '/datosUsuario?run=' + run)
        .pipe( map(auth => {
          
          console.log(auth);
          if(auth != null){
            // debugger;
            try{
              this.usuarioLogueado = {
                runCompleto:auth.result[0][0],
                nombreCompleto:auth.result[0][1],
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
              // console.log(this.usuarioLogueado);
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
      
      confirmarAsistencia(fecha_asistencia, estado, usr_creacion, run, id_curso, dias_bloqueo){
        return this.http.post(this.rutaBase+ '/confirmarAsistencia',{fecha_asistencia, estado, usr_creacion, run, id_curso, dias_bloqueo})
      }

      confirmarLeccionario(descripcion, fecha_asistencia, usr_creacion, id_asignatura){
        return this.http.post(this.rutaBase + '/confirmarLeccionario', {descripcion, fecha_asistencia, usr_creacion, id_asignatura})
      }

      confirmarObservacion(tipo, desc_obs, usr_creacion, run, id_curso){
        return this.http.post(this.rutaBase + '/confirmarObservacion', {tipo, desc_obs, usr_creacion, run, id_curso})
      }

}
