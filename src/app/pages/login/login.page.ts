import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { AutenticacionService } from 'src/app/sevices/autenticacion.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertController: AlertController,
    public servicio: AutenticacionService,
    public router: Router,
    private apiService: ApiService) {
      this.obtenerUsuariosApi();
    }

  ngOnInit() {
  }
  
  modeloUsuario: string = "";
  modeloContrasena: string = "";
  listaUsuarios: [Usuario]
  public mostrarInfo: boolean = false;

  mostrarInfoButton(){
    
    this.mostrarInfo = !this.mostrarInfo;
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

  validarLogin() {
    var respuesta = this.servicio.login(this.modeloUsuario, this.modeloContrasena);
    if(respuesta){
      console.log('login ok');
      var navigationExtras: NavigationExtras = {
        state: {
          user: this.modeloUsuario,
          pass: this.modeloContrasena
        }
      }

      this.router.navigate(['inicio'], navigationExtras);
    } else{
        console.log('login not ok')
        this.presentarAlerta();
      }
    }
  

  async presentarAlerta() {
    const alert = await this.alertController.create({
      header: 'Login Incorrecto',
      message: 'Las credenciales no son correctas, favor intentarlo nuevamente',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
