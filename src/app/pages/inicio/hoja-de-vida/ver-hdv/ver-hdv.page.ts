import { Component, OnInit, ViewChild } from '@angular/core';
import { PickerController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';

@Component({
  selector: 'app-ver-hdv',
  templateUrl: './ver-hdv.page.html',
  styleUrls: ['./ver-hdv.page.scss'],
})
export class VerHdvPage implements OnInit {

  constructor(public _pickerCtrl: PickerController, 
    public modalController: ModalController,
    public apiService: ApiService,
    public toastController: ToastController) { }

  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  mdl_curso: Curso;
  mdl_nivel: number;
  nivel:Nivel;

  formatoAlum ='';
  @ViewChild(ModalController,) modalhdv: ModalController;

  ngOnInit() {
    this.obtenerNIvelApi()
  }

  cerrar() {

    this.modalController.dismiss({
      'dismissed': true
    });
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

