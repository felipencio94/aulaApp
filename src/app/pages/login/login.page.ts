import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { AutenticacionService } from 'src/app/sevices/autenticacion.service';
import { Usuario } from 'src/app/models/usuario.models';
import { Nivel } from 'src/app/interface/nivel';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarioForm = {
    run: '',
    password: ''
  }

  listaUsuarios: [Usuario]
  listaNiveles: [Nivel]
  public mostrarInfo: boolean = false;

  constructor(public alertController: AlertController,
    public servicio: AutenticacionService,
    public router: Router,
    public apiService: ApiService,
    public toastController: ToastController) {

    }

  ngOnInit() {
  }

  mostrarInfoButton(){
    
    this.mostrarInfo = !this.mostrarInfo;
  }


  validarLogin(){
    let run= this.usuarioForm.run;
    let contrasena = btoa(this.usuarioForm.password);
    this.apiService.validarLogin(run, contrasena).subscribe( data =>{
      if(this.usuarioForm.run === '' || this.usuarioForm.password === ''){

      this.presentarAlertaOpciones('Atención!','Los campos no pueden estar vacíos');
   
    }else if(data.result ==='LOGIN NOK'){
      this.presentarAlertaOpciones('Credenciales incorrectas','Usuario o clave incorrectos, por favor reintente.');
      
      }else{
 
        this.presentarAlerta('Bienvenido!');
        this.router.navigate(['inicio']);
        this.usuarioForm.run ="";
        this.usuarioForm.password ="";
        
      }
    });

  } 
  recuperarContrasena(){
    this.router.navigate(['recuperar']);
  }


  async errorGenerico(tipo, mensaje) {  //Usar este mensaje para evitar crear una por cada tipo.
    const alert = await this.alertController.create({
      header: tipo,
      message: mensaje,
      buttons: ['Ok']
    });
}



  async presentarAlerta(message) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentarAlertaOpciones(header, message) {
    const toast = await this.toastController.create({
      message: message,
      icon: 'information-circle',
      position: 'top',
      duration: 3500,
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
