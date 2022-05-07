import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { ApiService } from 'src/app/sevices/api.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  listaUsuarios: [Usuario]

  constructor(private apiService: ApiService) {
    this.obtenerUsuariosApi();
   }

  ngOnInit() {
  }

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

}
