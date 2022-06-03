import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';

@Component({
  selector: 'app-leccionario',
  templateUrl: './leccionario.page.html',
  styleUrls: ['./leccionario.page.scss'],
})
export class LeccionarioPage implements OnInit {

  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  mdl_curso: Curso;
  mdl_nivel: number;
  mostrarPickerFecha = false;
  dateValue = format(new Date(),  'yyyy-MM-dd') + 'T09:00:00.000Z';
  formato = '';
  nivel:Nivel;
  
  formatoAsignatura = '';
  @ViewChild(IonDatetime) datetime: IonDatetime

  constructor( public _pickerCtrl: PickerController,
    public apiService: ApiService,
    public toastController: ToastController) { 
    this.setHoy();
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


  async mostrarPickerAsignatura(){
    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Asignatura',
          options:[
            { text: 'Lenguaje', value:'lenguaje'},
            { text: 'Matemática', value:'matematica'},
            { text: 'Biología', value:'biologia'}
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {
            console.log('se cacela', value);
            this.formatoAsignatura ='';
          }
        },
        {
          text: 'Confirmar',
          handler: (selected) => {
            console.log('tiene que acepta', selected);
            this.formatoAsignatura = selected.Asignatura.text;
          }
        }
      ]
    });

    await picker.present();
  }
}
