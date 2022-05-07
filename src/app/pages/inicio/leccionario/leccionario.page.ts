import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-leccionario',
  templateUrl: './leccionario.page.html',
  styleUrls: ['./leccionario.page.scss'],
})
export class LeccionarioPage implements OnInit {

  mostrarPickerFecha = false;
  dateValue = format(new Date(),  'yyyy-MM-dd') + 'T09:00:00.000Z';
  formato = '';
  formatoNivel ='';
  formatoCurso ='';
  formatoAsignatura = '';
  @ViewChild(IonDatetime) datetime: IonDatetime

  constructor( public _pickerCtrl: PickerController) { 
    this.setHoy();
  }

  ngOnInit() {
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


  async mostrarPickerNivel() {
    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Nivel',
          options:[
            { text: 'Prebasica', value:'prebasica'},
            { text: 'Basica', value:'Basica'},
            { text: 'Media', value:'Media'}
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
            this.formatoCurso ='';
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
