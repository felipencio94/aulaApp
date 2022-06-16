import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { Nivel } from 'src/app/interface/nivel';
import { Curso } from 'src/app/interface/curso';
import { Alumno } from 'src/app/interface/alumno';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  listaNivel: Nivel[] = [];
  listaCursos: Curso[] =[];
  listaAlumnos: Alumno[] = [];
  mdl_curso: Curso;
  mdl_nivel: number;
  mdl_alumno: Alumno;
  mostrarCurso: boolean= false;
  mostrarAlumno: boolean= false;
  mostrarAsignatura: boolean= false;
  mostrarPeriodo: boolean= false;
  nivel:Nivel;
  formatoAsignatura: string = '';
  formatoAlum: string = '';
  formatoPeriodo: string = '';

  constructor(public apiService: ApiService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.obtenerNIvelApi();
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
    this.mostrarCurso = true;
    if(this.mostrarCurso === true){
      this.mostrarAlumno = true;
      this.mostrarAsignatura = true;
      this.mostrarPeriodo = true;
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
  obtenerValor(valor){
    this.mdl_nivel = valor;
  }

  obtenerAlumnosApi(){
 
    this.listaAlumnos =[];
    this.apiService.obtenerAlumnos(this.mdl_curso).subscribe(data =>{
      for(let elemento in data){
        this.listaAlumnos.push(data[elemento]);       
      }
      console.log(data);
      console.log(this.mdl_curso.ID_CURSO);
      console.log(this.listaAlumnos);
      this.apiService.listaAlumnos = this.listaAlumnos;
      
      
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

  
}
