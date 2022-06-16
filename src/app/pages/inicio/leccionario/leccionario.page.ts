import { Attribute, Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';
import { Asignatura } from 'src/app/interface/asignatura';
import { Leccionario } from 'src/app/interface/leccionario';

@Component({
  selector: 'app-leccionario',
  templateUrl: './leccionario.page.html',
  styleUrls: ['./leccionario.page.scss'],
})
export class LeccionarioPage implements OnInit {

  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  listaAsignatura: Asignatura[] = [];
  listaLeccionario: Leccionario[] = [];
  mdl_curso: Curso;
  mdl_nivel: number;
  mostrarCurso: boolean= false; 
  mostrarAsignatura: boolean = false;
  mostrarPickerFecha = false;
  txt_descLeccionario = '';
  id_asignatura: number;
  dateValue = format(new Date(),  'yyyy-MM-dd');
  formato = '';
  fechaSys='';
  nivel:Nivel;
  formatoAsignatura = '';
  @ViewChild(IonDatetime) datetime: IonDatetime

  constructor( public _pickerCtrl: PickerController,
    public apiService: ApiService,
    public toastController: ToastController) {
      this.fechaSyst();
      this.setHoy();
      console.log(this.formato);
    
  }

  ngOnInit() {
    this.obtenerNIvelApi()
  }

  setHoy() {
    this.formato = format(parseISO(format(new Date(),  'yyyy-MM-dd')), ' dd-MM-yyyy');
  }

  fechaSyst(){
    this.fechaSys = format(parseISO(format(new Date(),  'yyyy-MM-dd')), ' dd-MM-yyyy');
  }

  fechaCambiada(value) {
    console.log(value);
    this.dateValue = value;
    this.formato = format(parseISO(value),' dd-MM-yyyy'); 
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
    if(this.mostrarCurso === true){
      this.mostrarAsignatura = true;
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

  obtenerAsignaturaApi(){
    this.listaAsignatura =[];
    this.apiService.obtenerAsignatura(this.mdl_curso).subscribe(data =>{
      for(let elemento in data){
        this.listaAsignatura.push(data[elemento]); 
        this.listaLeccionario = this.listaAsignatura;
        for(let atrib of this.listaLeccionario){
          this.id_asignatura = atrib.ID_ASIGNATURA;
          console.log(atrib.ID_ASIGNATURA);
          
        }
        
        
      }
      
      console.log(this.listaAsignatura);
      // console.log(this.id_curso);
      
      
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



  confirmaLeccionario(){
    this.txt_descLeccionario;
    for(let atrib of this.listaLeccionario){
      atrib.DESCRIPCION = this.txt_descLeccionario;
      this.txt_descLeccionario = atrib.DESCRIPCION;
      atrib.FECHA = this.fechaSys;
      this.fechaSys = atrib.FECHA;
      atrib.FECHA_CREACION = this.formato;
      this.formato = atrib.FECHA_CREACION;
      //usuario creador obs
      atrib.ID_ASIGNATURA = this.id_asignatura;
      this.id_asignatura = atrib.ID_ASIGNATURA;
      //firma
      //fecha modificacion
      //usuario modificacion
      //fecha firma
    }
    //id_leccion
    console.log('desc leccionario: ' + this.txt_descLeccionario);//descripcion  
    console.log('fecha sys: ' + this.fechaSys);//fecha sys
    console.log('fecha leccionario: ' + this.formato);//fecha leccionario
    // console.log('usuario creador observacion: ' + this.usr_creacion);//usuario creador observacion
    console.log('id_asignatura: ' + this.id_asignatura);//id asignatura
    // console.log('id curso: ' + this.id_curso);//firma (nombre usuario?)
    // console.log('id curso: ' + this.id_curso);//fecha modificacion
    // console.log('id curso: ' + this.id_curso);//usuario modificacion
    // console.log('id curso: ' + this.id_curso);//fecha firma
    console.log(this.listaLeccionario);
    
    
    
    
  }
}
