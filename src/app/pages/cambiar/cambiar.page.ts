import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { closestTo } from 'date-fns';
import { ApiService } from 'src/app/sevices/api.service';
import { AutenticacionService } from 'src/app/sevices/autenticacion.service';

@Component({
  selector: 'app-cambiar',
  templateUrl: './cambiar.page.html',
  styleUrls: ['./cambiar.page.scss'],
})
export class CambiarPage implements OnInit {

  usuarioFormCambiar = {
    usuario:'',
    password: '',
    nueva_password: '',
    conf_nueva_password:''
  }
  
  lista: [{}];
  constructor(public alertController: AlertController,
    public servicio: AutenticacionService,
    public router: Router,
    private apiService: ApiService,
    public toastController: ToastController,
    ) { }

  ngOnInit() {
    this.apiService.recuperarDatosUsuario(this.apiService.usuarioAuth).subscribe(data=>{
      this.lista = [this.apiService.usuarioLogueado];
      }
      );
      
      
  }
  cambiarContrasena(){
    let usuario = this.usuarioFormCambiar.usuario;
    let contrasena = btoa(this.usuarioFormCambiar.password);
    let nuevaContrasena = this.usuarioFormCambiar.nueva_password;
    let confNuevaContrasena = this.usuarioFormCambiar.conf_nueva_password;

    console.log(this.apiService.usuarioLogueado.runUsuario);
    console.log(this.apiService.usuarioLogueado.passwordUsuario);
    console.log(usuario);
    console.log(contrasena);
    
    if(usuario == this.apiService.usuarioLogueado.runUsuario && contrasena ==  this.apiService.usuarioLogueado.passwordUsuario){
      console.log('Usuario coincide');
      
      console.log('runCompleto: '+this.lista[0]['runCompleto']+' run: '+this.lista[0]['runUsuario']);
      this.apiService.cambiarContrasena(usuario, nuevaContrasena).subscribe(data=>{
        
        
      })

    }else{
      console.log('usuario no coincide');
      
    }
     

    // this.apiService.validarLogin(usuario, contrasena).subscribe( data =>{
    //   if(data.result ==='LOGIN NOK'){
    //     this.presentToastWithOptions('Credenciales incorrectas','Usuario o clave incorrectos, por favor reintente.');
    //   }else{
    //     this.presentToast('Bienvenido!');
        
    //   }
    // });


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
