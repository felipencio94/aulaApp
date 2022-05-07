import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { ApiService } from 'src/app/sevices/api.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router,
    private apiService: ApiService) {
      this.obtenerUsuariosApi();
     }

  ngOnInit() {
  }

  listaUsuarios: [Usuario]

  obtenerUsuariosApi(){
    let that = this;
    let contador = 0;
    this.apiService.obtenerUsuarios().subscribe(data => {
      data.forEach(element => {
        let x: Usuario = {RUN: 0 , COD_USUARIO: '', MAIL: '', PASSWORD: '', ESTADO: ''};
        x.RUN = element[0];
        x.COD_USUARIO = element[1];
        x.MAIL= element[2];
        x.PASSWORD= element[3];
        x.ESTADO= element[4];

        if(contador === 0) {
          that.listaUsuarios = [x];
        } else{
          that.listaUsuarios.push(x);
        }
        contador++;
      });      
    });

  }

  mostrarPerfilUsuario() {
    this.router.navigate(['inicio/perfil-usuario'])
  }

}
