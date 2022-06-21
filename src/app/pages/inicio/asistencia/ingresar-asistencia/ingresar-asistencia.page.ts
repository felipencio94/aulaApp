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
  selector: 'app-ingresar-asistencia',
  templateUrl: './ingresar-asistencia.page.html',
  styleUrls: ['./ingresar-asistencia.page.scss'],
})
export class IngresarAsistenciaPage implements OnInit {

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
    // console.log(this.formato);
    
  }

  fechaCambiada(value) {
    console.log(value);
    this.dateValue = value;
    this.formato = format(parseISO(value),'dd-MM-yyyy'); 
    console.log(this.formato);
    
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
      this.errorGenerico('Sin resultados','La búsqueda no arrojó resultados.')
    })
    ;    

  }
  obtenerValor(valor){
    this.mdl_nivel = valor;
  }

  obtenerValorCurso(valor){
    this.mdl_curso = valor;
  }
  
  obtenerAlumnosApi(){
 
    this.listaAlumnos =[];
    this.apiService.obtenerAlumnos(this.mdl_curso).subscribe(data =>{
      // console.log(data[0].ID_CURSO);
      
      for(let elemento in data){
        this.listaAlumnos.push(data[elemento]);       
      }
      // console.log(data);
      // console.log(this.mdl_curso.ID_CURSO);
      // console.log(this.listaAlumnos[0].ID_CURSO);
      this.apiService.listaAlumnos = this.listaAlumnos;
    
      this.router.navigate(['inicio/asistencia/asistencia-alumnos']);
      
    }, err =>{
      this.errorGenerico('Sin resultados','La búsqueda no arrojó resultados.');
    })
    
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


  // async presentarAlerta(message) {
  //   const toast = await this.toastController.create({
  //     position: 'bottom',
  //     message: message,
  //     duration: 2000
  //   });
  //   toast.present();
  // }

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
