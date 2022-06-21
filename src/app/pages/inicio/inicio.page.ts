import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/interface/persona';
import { ApiService } from 'src/app/sevices/api.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router, private ApiService: ApiService) { }
  lista: [{}];
  ngOnInit() {
    

    
    this.ApiService.recuperarDatosUsuario(this.ApiService.usuarioAuth).subscribe(data=>{
      this.lista = [this.ApiService.usuarioLogueado];
      console.log(this.lista);
      }
      );
      
  }

  mostrarPerfilUsuario() {
    this.router.navigate(['inicio/perfil-usuario'])
  }

  irAsistencia(){
    this.router.navigate(['inicio/asistencia'])
  }

  irLeccionario(){
    this.router.navigate(['inicio/leccionario'])
  }
  
  irHojaDeVida(){
    this.router.navigate(['inicio/hoja-de-vida'])
  }

  irNotas(){
    this.router.navigate(['inicio/notas'])
  }

  irHorarios(){
    this.router.navigate(['inicio/horarios'])
  }

  
}
