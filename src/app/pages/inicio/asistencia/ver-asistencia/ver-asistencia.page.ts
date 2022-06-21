import { Component, OnInit, ViewChild } from '@angular/core';
import { PickerController, ModalController, ToastController, IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';
import { Alumno } from 'src/app/interface/alumno';
import { Asistencia } from 'src/app/interface/asistencia';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  listaAlumnos: Alumno[] = [];
  listaAsistencia: Asistencia[] =[];

  mdl_curso: Curso;
  mdl_nivel: number;
  mdl_alumno: Alumno;
  nivel:Nivel;
  mostrarCurso: boolean= false;
  mostrarAlumno: boolean = false;
  formatoAlum ='';
  mostrarPickerFecha = false;
  dateValue = format(new Date(),  'yyyy-MM-dd');
  formato = '';
  fechaSys='';
  @ViewChild(ModalController,) modalhdv: ModalController;
  @ViewChild(IonDatetime) datetime: IonDatetime
 
  constructor(public _pickerCtrl: PickerController, 
    public modalController: ModalController,
    public apiService: ApiService,
    public toastController: ToastController,
    public router: Router) {
      this.fechaSyst();
      this.setHoy();
      console.log(this.formato);
     }

  

  ngOnInit() {
    this.obtenerNIvelApi()
  }
  setHoy() {
    this.formato = format(parseISO(format(new Date(),  'yyyy-MM-dd')), 'dd-MM-yyyy');
  }

  fechaSyst(){
    this.fechaSys = format(parseISO(format(new Date(),  'yyyy-MM-dd')), 'dd-MM-yyyy');
  }

  fechaCambiada(value) {
    console.log(value);
    this.dateValue = value;
    this.formato = format(parseISO(value),'dd-MM-yyyy');
    console.log('value: '+this.dateValue);
    console.log('formato: '+this.formato);
     
    this.mostrarPickerFecha = false;

  }

  cerrar() {
    this.datetime.cancel(true);
  }

  seleccionar() {
    this.datetime.confirm(true);
  }

  cerrarModal() {
    this.listaAsistencia = [];
    this.modalController.dismiss({
      'dismissed': true
    });
    this.router.navigate(['inicio/asistencia'])
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
    // if(this.mostrarCurso === true){
    //   this.mostrarAlumno = true;
    // }
  }

  obtenerCursoApi(){
    this.listaCursos=[];
    this.apiService.obtenerCursos(this.mdl_nivel).subscribe(data => {
      for(let elemento in data){
        this.listaCursos.push(data[elemento]);}
    }, err =>{
      this.errorGenerico('Sin resultados','La búsqueda no arrojó resultados.')
    });    
  }
  
  obtenerValor(valor){
    this.mdl_nivel = valor;
  }

  // obtenerValorCurso(valor){
  //   this.mdl_curso = valor;
  // }

  obtenerAsistencia(){
    this.listaAsistencia = []; 
    this.apiService.obtenerAsistencia(this.mdl_curso,this.formato).subscribe(data =>{
    // this.apiService.obtenerAsistencia(this.mdl_curso, fechaAsistencia).subscribe(data =>{
      for(let elemento in data){
        this.listaAsistencia.push(data[elemento]);
        console.log(this.listaAsistencia);
      }
      
    },err =>{
      this.errorGenerico('Sin resultados','La búsqueda no arrojó resultados.')
    });
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
