import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { AutenticacionService } from 'src/app/sevices/autenticacion.service';
import { Usuario } from 'src/app/models/usuario.models';
import { Nivel } from 'src/app/interface/nivel';
import { Alumno } from 'src/app/interface/alumno';
import { element } from 'protractor';


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

  //listaUsuarios: [Usuario]
  
  public mostrarInfo: boolean = false;

  constructor(public alertController: AlertController,
    public servicio: AutenticacionService,
    public router: Router,
    public apiService: ApiService,
    public toastController: ToastController) {
            
    }

  ngOnInit() {
    // this.limpiarFormulario();
  }

  // limpiarFormulario(){
  //   this.usuarioForm.password = "";
  //   this.usuarioForm.run = "";
  // }

  mostrarInfoButton(){
    
    this.mostrarInfo = !this.mostrarInfo;
  }


       
  validarLogin(){
    let run= this.usuarioForm.run;
    let contrasena = btoa(this.usuarioForm.password);
    this.apiService.validarLogin(run, contrasena).subscribe( data =>{
      if(this.usuarioForm.run === '' || this.usuarioForm.password === ''){

      this.presentToastWithOptions('Atención!','Los campos no pueden estar vacíos');
   
    }else if(data.result ==='LOGIN NOK'){
      this.presentToastWithOptions('Credenciales incorrectas','Usuario o clave incorrectos, por favor reintente.');
      
      }else{
 
        this.presentToast('Bienvenido!');
        this.router.navigate(['inicio']);
        
      }
    });

  }  

  recuperarContrasena(){
    this.router.navigate(['recuperar']);
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


  async errorGenerico(tipo, mensaje) {  //Usar este mensaje para evitar crear una por cada tipo.
    const alert = await this.alertController.create({
      header: tipo,
      message: mensaje,
      buttons: ['Ok']
    });
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
