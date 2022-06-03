import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';

@Component({
  selector: 'app-nueva-hdv',
  templateUrl: './nueva-hdv.page.html',
  styleUrls: ['./nueva-hdv.page.scss'],
})
export class NuevaHdvPage implements OnInit {
  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  mdl_curso: Curso;
  mdl_nivel: number;
  mostrarPickerFecha = false;
  dateValue = format(new Date(),  'yyyy-MM-dd') + 'T09:00:00.000Z';
  formato = '';
  nivel:Nivel;
  
  formatoAlum ='';
  @ViewChild(IonDatetime) datetime: IonDatetime

  constructor(public _pickerCtrl: PickerController,
    public apiService: ApiService,
    public toastController: ToastController) {
    this.setHoy()
   }

  ngOnInit() {
    this.obtenerNIvelApi()
  }

  setHoy() {
    this.formato = format(parseISO(format(new Date(),  'yyyy-MM-dd') + 'T09:00:00.000Z'), ' dd/MM/yyyy');
  }
  fechaCambiada(value) {
    console.log(value);
    this.dateValue = value;
    this.formato = format(parseISO(value),' MMM d, yyyy'); 
    this.mostrarPickerFecha = false;

  }
  cerrar() {
    this.datetime.cancel(true);
  }

  seleccionar() {
    this.datetime.confirm(true);
  }

  confirmarObservacion() {
    console.log('confirma cambios')
  }

  obtenerNIvelApi(){

    this.apiService.obtenerNiveles().subscribe(data => {
      for(let elemento in data){
        
        this.listaNivel.push(data[elemento]);
        console.log(data);
        
      }
    });    

  }

  onChange(selectedValue){
    console.log("Selected:",selectedValue);
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


  
  async mostrarPickerAlumno() {
    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Alumno',
          options:[
            { text: 'David Arellano', value:'David Arellano'},
            { text: 'Brayan Cortés', value:'Brayan Cortes'},
            { text: 'Gabriel Suazo', value:'Gabriel Suazo'}
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {
            this.formatoAlum = '';
          }
        },
        {
          text: 'Confirmar',
          handler: (selected) => {
            console.log('tiene que acepta', selected);
            this.formatoAlum = selected.Alumno.text;
          }
        }
      ]
    });

    await picker.present();

  }

}
