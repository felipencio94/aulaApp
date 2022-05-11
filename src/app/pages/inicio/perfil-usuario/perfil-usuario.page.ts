import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/sevices/api.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  lista: [{}];
  constructor (private ApiService:ApiService) { }

  ngOnInit() {
    this.ApiService.recuperarDatosUsuario(this.ApiService.usuarioAuth).subscribe(data=>{
      this.lista = [this.ApiService.usuarioLogueado];
      }
      );
      
  }

}
