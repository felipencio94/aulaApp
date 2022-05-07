import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  formatoNivel ='';
  formatoCurso ='';

  constructor(public _pickerCtrl: PickerController) { }

  ngOnInit() {
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
            console.log('se cacela', value);
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
            console.log('se cacela', value);
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

}
