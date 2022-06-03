import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/interface/alumno';
import { ApiService } from 'src/app/sevices/api.service';

@Component({
  selector: 'app-asistencia-alumnos',
  templateUrl: './asistencia-alumnos.page.html',
  styleUrls: ['./asistencia-alumnos.page.scss'],
})
export class AsistenciaAlumnosPage implements OnInit {

  listaAlumnos: [Alumno]

  constructor(public apiService: ApiService) {
    this.obtenerAlumnosApi()
   }

  ngOnInit() {
  }

  obtenerAlumnosApi(){
    let that = this;
    let contador = 0;
    this.apiService.obtenerAlumnos().subscribe(data => {
      data.forEach(element =>{
        let x: Alumno = {RUNALUMNO: '', NOMBREALUMNO: '',ESTADO: '',CURSOACTUAL: '', ANIO: 0,
        DIRECCION: '', SEXO: '', DISCAPACIDAD: '', NIVELALUMNO: '', FECHANACIMIENTO: '', 
        EDAD: 0, PUEBLOORIGINARIO: ''};
        x.RUNALUMNO = element[0];
        x.NOMBREALUMNO= element[1];

        if(contador === 0){
          that.listaAlumnos = [x];
        } else {
          that.listaAlumnos.push(x);
        }

        contador++;
      });

      console.log(this.listaAlumnos);
      
    });  

  }

}
