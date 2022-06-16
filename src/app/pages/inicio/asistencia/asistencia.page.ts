import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';
import { Alumno } from 'src/app/interface/alumno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  
  mostrarPickerFecha = false;
  mdl_nivel: number;
  dateValue = format(new Date(),  'yyyy-MM-dd');
  formato = '';
  mostrarCurso: boolean=false; 
  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  mdl_curso: Curso;
  nivel:Nivel;
  listaAlumnos: Alumno[] = [];
  @ViewChild(IonDatetime,) datetime: IonDatetime


  constructor( public _pickerCtrl: PickerController,
    public alertController: AlertController,
    public apiService: ApiService,
    public toastController: ToastController,
    public router: Router) { 
    this.setHoy();
  }

  ngOnInit() {
    this.obtenerNIvelApi();
 
  }

  setHoy() {
    this.formato = format(parseISO(format(new Date(),  'yyyy-MM-dd')), ' dd-MM-yyyy');
    console.log(this.formato);
    
  }

  fechaCambiada(value) {
    console.log(value);
    this.dateValue = value;
    this.formato = format(parseISO(value),'dd-MM-yyyy'); 
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
        
        
      }
    });    

  }

  onChange(selectedValue){
    console.log("Selected:",selectedValue);
    this.mostrarCurso = true;
  }

  obtenerCursoApi(){
    this.listaCursos=[];
    this.apiService.obtenerCursos(this.mdl_nivel).subscribe(data => {
      for(let elemento in data){
        console.log(this.mdl_curso);
        
        this.listaCursos.push(data[elemento]);}
    }, err =>{
      this.presentToastWithOptions('Sin resultados','La búsqueda no arrojó resultados.')
    })
    ;    

  }
  obtenerValor(valor){
    this.mdl_nivel = valor;
  }

  obtenerValorCurso(valor){
    this.mdl_curso = valor;
  }

  // obtenerAlumnosApi(){
  //   let that = this;
  //   let contador = 0;
  //   this.apiService.obtenerAlumnos(this.mdl_curso).subscribe(data => {
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
  
  obtenerAlumnosApi(){
 
    this.listaAlumnos =[];
    this.apiService.obtenerAlumnos(this.mdl_curso).subscribe(data =>{
      for(let elemento in data){
        this.listaAlumnos.push(data[elemento]);   
        console.log(data[elemento]);
            
      }
      // console.log(data);
      // console.log(this.mdl_curso.ID_CURSO);
      // console.log(this.listaAlumnos);
      this.apiService.listaAlumnos = this.listaAlumnos;
      console.log(this.listaAlumnos);
      
      this.router.navigate(['inicio/asistencia/asistencia-alumnos']);
      
    }, err =>{
      this.presentToastWithOptions('Sin resultados','La búsqueda no arrojó resultados.');
    })
    
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



}



