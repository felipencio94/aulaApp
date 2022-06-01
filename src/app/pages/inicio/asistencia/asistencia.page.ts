import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, PickerController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  nivel2: Nivel;
  mostrarPickerFecha = false;
  mdl_nivel: Nivel;
  dateValue = format(new Date(),  'yyyy-MM-dd') + 'T09:00:00.000Z';
  formato = '';
  formatoNivel ='';
  formatoCurso ='';
  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  mdl_curso: Curso;
  nivel:Nivel;
  @ViewChild(IonDatetime,) datetime: IonDatetime


  constructor( public _pickerCtrl: PickerController,
    public alertController: AlertController,
    public apiService: ApiService) { 
    this.setHoy();
  }

  ngOnInit() {
    this.obtenerNIvelApi();
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

  // obtenerNIvelApi(){
  //   let that = this;
  //   let contador = 0;
  //   this.apiService.obtenerNiveles().subscribe(data => {
  //     data.forEach(element => {
  //       let x: Nivel = {ID_NIVEL: 0, DESCRIPCION: ''};
  //       x.ID_NIVEL = element[0];
  //       //x.DESCRIPCION = element[1];
  //       if(contador === 0) {
  //         that.listaNiveles = [x];
  //       } else{
  //         that.listaNiveles.push(x);
  //       }
  //       contador++;
  //     });      
  //   });    

  // }

  obtenerNIvelApi(){
    this.apiService.obtenerNiveles().subscribe(data => {
      for(let elemento in data){
        
        this.listaNivel.push(data[elemento]);
        console.log(data[elemento]);
        
      }
    });    

  }

  onChange(selectedValue){
    console.log("Selected:",selectedValue);
  }

  obtenerCursoApi(){
    this.apiService.obtenerCursos(4).subscribe(data => {
      for(let elemento in data){
        
        this.listaCursos.push(data[elemento]);
        console.log(data[elemento]);
        
      }
    });    

  }

  async mostrarPickerNivel() {
    const picker = await this._pickerCtrl.create({
      columns: [
        {
          name:'Nivel',
          options:[
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
          handler: (value) => {
            console.log('tiene que acepta', value);
            this.listaNivel = value.Nivel.descripcion;
          }
        }
      ]
    });

    await picker.present();
  
  }



}



