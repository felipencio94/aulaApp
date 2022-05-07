import { Component, OnInit, ViewChild } from '@angular/core';
import { PickerController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-hdv',
  templateUrl: './ver-hdv.page.html',
  styleUrls: ['./ver-hdv.page.scss'],
})
export class VerHdvPage implements OnInit {

  constructor(public _pickerCtrl: PickerController, public modalController: ModalController) { }

  formatoNivel ='';
  formatoCurso ='';
  formatoAlum ='';
  @ViewChild(ModalController,) modalhdv: ModalController;

  ngOnInit() {
  }

  cerrar() {

    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async mostrarPickerNivel() {
    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Nivel',
          options:[
            { text: 'Prebasica', value:'prebasica'},
            { text: 'Basica', value:'basica'},
            { text: 'Media', value:'media'}
          ]
        }
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {
            console.log('se cacela', value)
            this.formatoNivel = '';
            
          }
        },
        {
          text: 'Confirmar',
          handler: (selected) => {
            console.log('tiene que acepta', selected);
            this.formatoNivel = selected.Nivel.text;
            
          }
        }
      ]
    });

    await picker.present();
  
  }

  async mostrarPickerCurso() {
    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Curso',
          options:[
            { text: 'IV° A', value:'IVa'},
            { text: 'IV° B', value:'IVb'},
            { text: 'IV° C', value:'IVc'}
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {
            this.formatoCurso = '';
          }
        },
        {
          text: 'Confirmar',
          handler: (selected) => {
            console.log('tiene que acepta', selected);
            this.formatoCurso = selected.Curso.text;
          }
        }
      ]
    });

    await picker.present();
  
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

