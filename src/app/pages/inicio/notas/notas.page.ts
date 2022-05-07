import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  formatoNivel: string ='';
  formatoCurso: string ='';
  formatoAsignatura: string = '';
  formatoAlum: string = '';
  formatoPeriodo: string = '';

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

  async mostrarPickerAsignatura(){
    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Asignatura',
          options:[
            { text: 'Lenguaje', value:'lenguaje'},
            { text: 'Matemática', value:'matematica'},
            { text: 'Biología', value:'biologia'},
            { text: 'Todas', value:'Todas'}
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {
            console.log('se cacela', value);
            this.formatoAsignatura = '';
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

  async mostrarPickerPeriodo(){

    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Periodo',
          options:[
            { text: '1er Semestre', value:'1er-semestre'},
            { text: '2do Semestre', value:'2do-semestre'},
            { text: 'Anual', value:'anual'}
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (value) => {
            this.formatoPeriodo = '';
          }
        },
        {
          text: 'Confirmar',
          handler: (selected) => {
            console.log('tiene que acepta', selected);
            this.formatoPeriodo = selected.Periodo.text;
          }
        }
      ]
    });

    await picker.present();
  }
}
