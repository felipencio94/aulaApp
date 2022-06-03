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
    // let usuario = this.usuarioFormCambiar.usuario;
    let contrasena = btoa(this.usuarioFormCambiar.password);
    let nuevaContrasena = btoa(this.usuarioFormCambiar.nueva_password);
    let confNuevaContrasena = btoa(this.usuarioFormCambiar.conf_nueva_password);

    // console.log(this.apiService.usuarioLogueado.runUsuario);
    // console.log(this.apiService.usuarioLogueado.passwordUsuario);
    // console.log(usuario);
    // console.log(contrasena);
    
    if(contrasena === '' || nuevaContrasena === '' || confNuevaContrasena === ''){
      this.errorGenerico('Error','Debe completar todos los campos');
    } else{
      if(contrasena ==  this.apiService.usuarioLogueado.passwordUsuario){
        console.log('Usuario validado');
  
        if(nuevaContrasena === confNuevaContrasena){
          console.log('rut: '+this.apiService.usuarioLogueado.runUsuario);
          console.log('contraseña: '+nuevaContrasena);
    
          this.apiService.cambiarClave(this.apiService.usuarioLogueado.runUsuario, nuevaContrasena).subscribe(data=>{
            console.log(data);
            if(data === 0){
              this.confirmacion('Bien','Contraseña actualizada');  
              this.router.navigate(['login']);
  
            }else{
              this.errorGenerico('Error','Ha ocurrido un error, por favor intente de nuevo');
            }
            
            
          })
        }else{
          // console.log('contraseñas no coinciden wea');
          this.errorGenerico('F','Las contraseñas no coinciden');
          
        }
  
      }else{
        console.log('usuario no validado');
        this.errorGenerico('Error','Contraseña Inválida');
      }
    }   
    
     

    // this.apiService.validarLogin(usuario, contrasena).subscribe( data =>{
    //   if(data.result ==='LOGIN NOK'){
    //     this.presentToastWithOptions('Credenciales incorrectas','Usuario o clave incorrectos, por favor reintente.');
    //   }else{
    //     this.presentToast('Bienvenido!');
        
    //   }
    // });


  }

  async errorGenerico(header, message){
    const toast = await this.toastController.create({
      header: header,
      message: message,
      position: 'middle',
      duration: 3500,
      icon: 'information-circle',
      cssClass: 'errorGenerico',//terminar estilo
      buttons: ['OK']
    });
    toast.present();
  }
  
  async confirmacion(header, message) {
    const toast = await this.toastController.create({
      position: 'middle',
      header: header,
      message: message,
      duration: 1500
    });
    toast.present();
  }

  
  async presentarAlerta(header, message) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      icon: 'information-circle',
      position: 'middle',
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
