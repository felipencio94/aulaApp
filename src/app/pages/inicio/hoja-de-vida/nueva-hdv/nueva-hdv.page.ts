import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-nueva-hdv',
  templateUrl: './nueva-hdv.page.html',
  styleUrls: ['./nueva-hdv.page.scss'],
})
export class NuevaHdvPage implements OnInit {
  mostrarPickerFecha = false;
  dateValue = format(new Date(),  'yyyy-MM-dd') + 'T09:00:00.000Z';
  formato = '';
  formatoNivel ='';
  formatoCurso ='';
  formatoAlum ='';
  @ViewChild(IonDatetime) datetime: IonDatetime

  constructor(public _pickerCtrl: PickerController) {
    this.setHoy()
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

  confirmarObservacion() {
    console.log('confirma cambios')
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
