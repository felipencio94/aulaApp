import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { format, parseISO } from 'date-fns';
import { Alumno } from 'src/app/interface/alumno';
import { Asistencia } from 'src/app/interface/asistencia';
import { ApiService } from 'src/app/sevices/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia-alumnos',
  templateUrl: './asistencia-alumnos.page.html',
  styleUrls: ['./asistencia-alumnos.page.scss'],
})
export class AsistenciaAlumnosPage implements OnInit {

  listaAlumnos: Alumno[] = [];
  // listaAlumnos: [Alumno]
  listaAsistencia: Asistencia[]=[];
  alumnoPresente: boolean;
  alumnoPresenteNum: number;
  
  
  formato: any;
  lista: [{}];

  constructor(public apiService: ApiService,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    private route: ActivatedRoute) {
    this.setHoy();
    // this.obtenerAlumnosApi()
    this.listarAlumnos();
    this.listaAsistencia;
    this.apiService.recuperarDatosUsuario(this.apiService.usuarioAuth).subscribe(data=>{
      this.lista = [this.apiService.usuarioLogueado];
      // console.log(this.apiService.usuarioLogueado.runUsuario);
      }
      );
  }
  
  ngOnInit() {
  }
  setHoy() {
    this.formato = format(parseISO(format(new Date(),  'yyyy-MM-dd') ), ' dd-MM-yyyy');
    console.log(this.formato);

    // return this.formato;
  }
  listarAlumnos(){
    // this.listaAlumnos = this.apiService.listaAlumnos;
    this.listaAsistencia = this.apiService.listaAlumnos;
    for(let atrib of this.listaAsistencia){
      atrib.PRESENTE = false;
      atrib.PRESENTE_NUM = 0;

      atrib.FECHA_CREACION = this.formato;
      atrib.FECHA_ASISTENCIA = this.formato;
      atrib.USR_CREACION = this.apiService.usuarioLogueado.runUsuario
      // console.log(this.apiService.usuarioLogueado.runUsuario);      
      console.log(atrib.FECHA_ASISTENCIA);      
      // console.log(atrib.FECHA_ASISTENCIA);
      
      this.alumnoPresente = atrib.PRESENTE;
      // if(this.alumnoPresente){
      //   atrib.PRESENTE ===
      // } 
      this.alumnoPresenteNum = Number(atrib.PRESENTE); 

      atrib.PRESENTE_NUM = Number(atrib.PRESENTE);
      

      
    }   // console.log(this.listaAlumnos);
    console.log(this.listaAsistencia);
    // for(let elemento of this.listaAsistencia){
    //   elemento.PRESENTE = this.alumnoPresente;
    //   // this.alumnoPresente = !this.alumnoPresente;
    //   console.log(elemento.PRESENTE= this.alumnoPresente );
      
    // }
    
  }

  // listarAlumnos(){
  //   this.listaAlumnos = this.apiService.listaAlumnos; 
  //   console.log(this.listaAlumnos);
    

  //   let that: this;
  //   this.apiService.obtenerAlumnos(this.listaAlumnos[0].ID_CURSO).subscribe(data=>{
  //     console.log(data);
  //     data.forEach(element => {
  //       let contador = 0;
  //       let x:Alumno = {RUNALUMNO:'', NOMBREALUMNO:'', ESTADO:'', CURSOACTUAL:'', ANIO:0, DIRECCION:'', SEXO:'', DISCAPACIDAD:'', NIVELALUMNO:'', FECHANACIMIENTO:'', EDAD:0, PUEBLOORIGINARIO:'', ID_CURSO:0};
  //       x.ANIO = element[0];
  //             x.CURSOACTUAL = element[0];
  //             x.DIRECCION = element[0];
  //             x.DISCAPACIDAD = element[0];
  //             x.EDAD = element[0];
  //             x.ESTADO = element[0];
  //             x.FECHANACIMIENTO = element[0];
  //             x.NIVELALUMNO = element[0];
  //             x.NOMBREALUMNO = element[0];
  //             x.PUEBLOORIGINARIO = element[0];
  //             x.RUNALUMNO = element[0];
  //             x.SEXO = element[0];
  //             x.ID_CURSO = element[0];
               
  //     })
  //     // data.forEach(element => {
  //     //   let x:Alumno = {RUNALUMNO:'', NOMBREALUMNO:'', ESTADO:'', CURSOACTUAL:'', ANIO:0, DIRECCION:'', SEXO:'', DISCAPACIDAD:'', NIVELALUMNO:'', FECHANACIMIENTO:'', EDAD:0, PUEBLOORIGINARIO:'', ID_CURSO:0};
  //     //       x.ANIO = element[0];
  //     //       x.CURSOACTUAL = element[1];
  //     //       x.DIRECCION = element[2];
  //     //       x.DISCAPACIDAD = element[3];
  //     //       x.EDAD = element[4];
  //     //       x.ESTADO = element[5];
  //     //       x.FECHANACIMIENTO = element[6];
  //     //       x.NIVELALUMNO = element[7];
  //     //       x.NOMBREALUMNO = element[8];
  //     //       x.PUEBLOORIGINARIO = element[9];
  //     //       x.RUNALUMNO = element[10];
  //     //       x.SEXO = element[11];
  //     //       x.ID_CURSO = element[12];
    
  //     //       if(contador === 0){
  //     //         that.listaAlumnos = [x];
  //     //       }else{
  //     //         that.listaAlumnos.push(x);
  //     //       }
  //     //       contador++;
  //     //   });
  //     //     console.log(this.listaAlumnos);   
  //     })
  //   }

  asistenciaAlumnoCambiada(){
    
    for(let elemento of this.listaAsistencia){
      // elemento.PRESENTE = false;
      
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
  confirmarAsistencia(){
    //metodo de post que envía la info de la asistencia a bbdd
    // console.log(this.listaAsistencia);
    
    let DIAS_BLOQUEO = 7;
    for(let elemento of this.listaAsistencia){
      
      // console.log(PRESENTE_NUM);
      
      console.log(elemento.FECHA_CREACION,
        elemento.FECHA_ASISTENCIA,
        elemento.PRESENTE,
        elemento.PRESENTE_NUM,
        elemento.USR_CREACION,
        elemento.RUN,
        elemento.ID_CURSO,
        );
      this.apiService.confirmarAsistencia(elemento.FECHA_ASISTENCIA, elemento.PRESENTE_NUM, elemento.USR_CREACION, elemento.RUN, elemento.ID_CURSO, DIAS_BLOQUEO).subscribe(data=>{
        console.log(data);
        this.presentarAlerta('Asistencia Registrada Correctamente')
        this.router.navigate(['inicio']);
      })

      
    }
    
    
  }

  async errorGenerico(tipo, mensaje) {  //Usar este mensaje para evitar crear una por cada tipo.
    const toast = await this.toastController.create({
      header: tipo,
      message: mensaje,
      position: 'top',
      icon: 'close',
      duration:3500,
      color: 'danger',
      buttons: ['Ok'],
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role)
}


  async presentarAlerta(message) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      icon: 'checkmark-circle',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }
}
