import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';
import { Alumno } from 'src/app/interface/alumno';
import { Observacion } from 'src/app/interface/observacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-hdv',
  templateUrl: './nueva-hdv.page.html',
  styleUrls: ['./nueva-hdv.page.scss'],
})
export class NuevaHdvPage implements OnInit {
  mostrarCurso: boolean= false;
  mostrarAlumno: boolean = false;
  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  listaAlumnos: Alumno[] = [];
  listaObservacion: Observacion[] = [];
  mdl_curso: Curso;
  mdl_nivel: number;
  mdl_alumno: any;
  box_positiva: boolean = false;
  box_negativa: boolean = false;
  box_alumnoFinalString = '';
  id_curso: number;
  txt_observacion: string = '';
  usr_creacion:string;
  mostrarPickerFecha = false;
  dateValue = format(new Date(),  'yyyy-MM-dd');
  formato = '';
  nivel:Nivel;
  lista: [{}]; 
  @ViewChild(IonDatetime) datetime: IonDatetime

  constructor(public _pickerCtrl: PickerController,
    public apiService: ApiService,
    public toastController: ToastController,
    public router: Router) {
    this.setHoy();
    this.listaObservacion;
    this.apiService.recuperarDatosUsuario(this.apiService.usuarioAuth).subscribe(data=>{
      this.lista = [this.apiService.usuarioLogueado];
      console.log(this.apiService.usuarioLogueado.runUsuario);

      });
      this.usr_creacion = this.apiService.usuarioLogueado.runUsuario;
    // this.obtenerNIvelApi();
    // this.obtenerAlumnosApi();
    // this.listarAlumnos();
   }

  ngOnInit() {
    this.obtenerNIvelApi();
    
    
  }

  setHoy() {
    this.formato = format(parseISO(format(new Date(),  'yyyy-MM-dd')), 'dd-MM-yyyy');
  }
  fechaCambiada(value) {
    console.log(value);
    this.dateValue = value;
    this.formato = format(parseISO(value), 'dd-MM-yyyy'); 
    this.mostrarPickerFecha = false;

  }
  cerrar() {
    this.datetime.cancel(true);
  }

  seleccionar() {
    this.datetime.confirm(true);
  }

  

  obtenerNIvelApi(){

    this.apiService.obtenerNiveles().subscribe(data => {
      for(let elemento in data){
        
        this.listaNivel.push(data[elemento]);
        // console.log(data);
        
      }
    });    

  }

  onChange(selectedValue){
    console.log(selectedValue);
    this.mostrarCurso = true;
    if(this.mostrarCurso === true){
      this.mostrarAlumno = true;
      // console.log(this.mostrarAlumno);      
    }
  }

  obtenerCursoApi(){
    this.listaCursos=[];
    this.apiService.obtenerCursos(this.mdl_nivel).subscribe(data => {
      for(let elemento in data){
        this.listaCursos.push(data[elemento]);}
    }, err =>{
      this.presentToastWithOptions('Sin resultados','La búsqueda no arrojó resultados.')
    })
    ;    

  }
  obtenerValor(valor){
    this.mdl_nivel = valor;
  }

  obtenerAlumnosApi(){
 
    this.listaAlumnos =[];
    this.apiService.obtenerAlumnos(this.mdl_curso).subscribe(data =>{
      for(let elemento in data){
        this.listaAlumnos.push(data[elemento]); 
        this.listaObservacion = this.listaAlumnos; 
        for(let atrib of this.listaObservacion){
          this.id_curso = atrib.ID_CURSO;
        }        
            
      }
      // console.log(data);
      // console.log(this.mdl_curso.ID_CURSO);
      // this.apiService.listaAlumnos = this.listaAlumnos;
      // this.listaObservacion = this.listaAlumnos;
      // this.mdl_alumno = this.listaAlumnos;
      console.log(this.listaObservacion);
      console.log(this.id_curso);
      
      
    }, err =>{
      this.presentToastWithOptions('Sin resultados','La búsqueda no arrojó resultados.');
    })
    
  }
  listarAlumnos(){
    
    this.listaObservacion = this.apiService.listaAlumnos; 
    for(let atrib of this.listaObservacion){
      atrib.USR_CREACION = this.apiService.usuarioLogueado.runUsuario;
      this.usr_creacion = atrib.USR_CREACION;
    }

    // console.log(this.apiService.listaAlumnos);
    // console.log(this.asistenciaAlumnoCambiada());
    
    // for(let elemento of this.listaAsistencia){
    //   elemento.PRESENTE = this.alumnoPresente;
    //   this.alumnoPresente = !this.alumnoPresente;
    //   console.log(elemento.PRESENTE = this.alumnoPresente);
      
    // }
    
    
    
  }

  

  actualizaNegativaPositiva(){
    if(this.box_negativa === true){
      this.box_alumnoFinalString = String(this.box_negativa);
      this.box_alumnoFinalString = '-';
      
    }else if(this.box_positiva === true){
      this.box_alumnoFinalString = String(this.box_positiva);
      this.box_alumnoFinalString = '+';
    }    

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(header, message) {
    const toast = await this.toastController.create({
      message: message,
      icon: 'information-circle',
      position: 'top',
      buttons: [
       {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  confirmarObservacion() {
    this.box_alumnoFinalString;
    this.txt_observacion;
    this.formato;
    this.usr_creacion;
    this.mdl_alumno;
    this.id_curso;
    //id observacion
    console.log('tipo de observacion: ' + this.box_alumnoFinalString);//tipo de observacion   
    console.log('desc. observacion: ' + this.txt_observacion);//desc. observacion
    console.log('fecha observacion: ' + this.formato);//fecha observacion
    console.log('usuario creador observacion: ' + this.usr_creacion);//usuario creador observacion
    console.log('run alumno: ' + this.mdl_alumno);//run alumno
    console.log('id curso: ' + this.id_curso);//id curso
    console.log(this.listaObservacion);
    
    this.apiService.confirmarObservacion(this.box_alumnoFinalString, this.txt_observacion, this.usr_creacion, this.mdl_alumno, this.id_curso).subscribe(data=>{
      console.log(data);
      console.log('confirma cambios')
    this.box_alumnoFinalString= '';
    this.txt_observacion= '';
    this.formato= '';
    this.mdl_alumno= '';
    this.id_curso= 0;
    this.router.navigate(['inicio/hoja-de-vida']);
    this.presentToast('Exito! Observación registrada correctamente.');
      
    })

    
  }
  
 

}