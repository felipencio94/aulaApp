import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/interface/alumno';
import { ApiService } from 'src/app/sevices/api.service';
import { format, parseISO } from 'date-fns';
import { Curso } from 'src/app/interface/curso';
import { Asistencia } from 'src/app/interface/asistencia';

@Component({
  selector: 'app-asistencia-alumnos',
  templateUrl: './asistencia-alumnos.page.html',
  styleUrls: ['./asistencia-alumnos.page.scss'],
})
export class AsistenciaAlumnosPage implements OnInit {

  listaAlumnos: Alumno[] = [];
  listaAsistencia: Asistencia[] = [];

  alumnoPresente: boolean;
  alumnoPresenteNum: number;
  
  
  formato = '';
  lista: [{}]; 
  

  constructor(public apiService: ApiService) {
    // this.obtenerAlumnosApi()
    this.setHoy();
    this.listarAlumnos();
    this.listaAsistencia;
    console.log(this.listaAsistencia);
    this.apiService.recuperarDatosUsuario(this.apiService.usuarioAuth).subscribe(data=>{
      this.lista = [this.apiService.usuarioLogueado];
      // console.log(this.apiService.usuarioLogueado.runUsuario);

      }
      );
    
    // this.confirmarAsistencia();
   }

  ngOnInit() {

  }
  setHoy() {
    this.formato = format(parseISO(format(new Date(),  'yyyy-MM-dd')), ' dd-MM-yyyy');
    console.log(this.formato);

    // this.formato;
  }

  listarAlumnos(){
    this.listaAsistencia = this.apiService.listaAlumnos; 
    for(let atrib of this.listaAsistencia){
      atrib.PRESENTE = false;
      atrib.PRESENTE_NUM = 0;
      atrib.FECHA_CREACION = this.formato;
      atrib.FECHA_ASISTENCIA = this.formato;
      atrib.USR_CREACION = this.apiService.usuarioLogueado.runUsuario;
      this.alumnoPresente = atrib.PRESENTE;

      this.alumnoPresenteNum = Number(atrib.PRESENTE);
      atrib.PRESENTE_NUM = Number(atrib.PRESENTE);
      
      // console.log(this.alumnoPresente);
      console.log(atrib.FECHA_ASISTENCIA);
      console.log(atrib.USR_CREACION);
      console.log(this.listaAsistencia);
      
    }

    // console.log(this.apiService.listaAlumnos);
    // console.log(this.asistenciaAlumnoCambiada());
    
    // for(let elemento of this.listaAsistencia){
    //   elemento.PRESENTE = this.alumnoPresente;
    //   this.alumnoPresente = !this.alumnoPresente;
    //   console.log(elemento.PRESENTE = this.alumnoPresente);
      
    // }
    
    
    
  }

  asistenciaAlumnoCambiada(){  
    // this.alumnoPresente;
    // this.alumnoPresente = !this.alumnoPresente;
    // console.log(this.alumnoPresente);  
    // this.alumnoPresente = false;  
    
    for(let elemento of this.listaAsistencia){
      
      this.alumnoPresente = elemento.PRESENTE;
      this.alumnoPresente = !this.alumnoPresente;
      if(!this.alumnoPresente){
        elemento.PRESENTE_NUM = 1;
      }else{
        elemento.PRESENTE_NUM = 0;
      }  
      console.log(this.listaAsistencia);
      
    }    
    
  }

  // obtenerAlumnosApi(){
  //   let that = this;
  //   let contador = 0;
  //   this.apiService.obtenerAlumnos().subscribe(data => {
  //     data.forEach(element =>{
  //       let x: Alumno = {RUNALUMNO: '', NOMBREALUMNO: '',ESTADO: '',CURSOACTUAL: '', ANIO: 0,
  //       DIRECCION: '', SEXO: '', DISCAPACIDAD: '', NIVELALUMNO: '', FECHANACIMIENTO: '', 
  //       EDAD: 0, PUEBLOORIGINARIO: ''};
  //       x.RUNALUMNO = element[0];
  //       x.NOMBREALUMNO= element[1];
  //       x.CURSOACTUAL = element[3];

  //       if(contador === 0){
  //         that.listaAlumnos = [x];
  //       } else {
  //         that.listaAlumnos.push(x);
  //       }

  //       contador++;
  //     });

  //     console.log(this.listaAlumnos);
      
  //   });  

  // }


  confirmarAsistencia(){
    // metodo post que envía la info de la asistencia a bbdd
    let DIAS_BLOQUEO = 7;
    for(let elemento of this.listaAsistencia){
            
      console.log("fecha creacion: " + elemento.FECHA_CREACION)
      console.log("fecha asistencia: " + elemento.FECHA_ASISTENCIA);
      console.log("Presente (Bool): " + elemento.PRESENTE);
      console.log("Presente (Num): " + elemento.PRESENTE_NUM);
      console.log("Run usuario: " + elemento.USR_CREACION);
      console.log("Run alumno: " + elemento.RUN);
      console.log("ID Curso: " + elemento.ID_CURSO);
      
      
      
      
      
      // this.apiService.confirmarAsistencia(elemento.FECHA_ASISTENCIA, elemento.PRESENTE, elemento.USR_CREACION, elemento.RUN, elemento.ID_CURSO, DIAS_BLOQUEO).subscribe(data=> {
      //   console.log(data);    
      // })
    } 
  }
  
}
