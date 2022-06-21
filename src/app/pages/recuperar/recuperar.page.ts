import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  mostrarInputCodigo: boolean;
  ocultarEnviarMail: boolean = false;
  nombres: string = '';
  run: number=0;
  mail: string='';
  codigoOtp: number = 0;
  
  
  usuarioForm = {
    run: '',
    mail:'',
    codigoOtp:''
  }
  
  lista: [{}];
  constructor(private router: Router,
    private toastController: ToastController,
    private apiService: ApiService,
    private alertController: AlertController) {}

  ngOnInit() {
    
    
  }

  enviarMail(){
    let run = parseInt(this.usuarioForm.run)
    let mail = this.usuarioForm.mail
    if(run === parseInt('') || mail === ''){
      console.log('campos vacios');
      
    }else{
      this.apiService.recuperarDatosUsuario(run).subscribe(data=>{
        // console.log(data.result[0]);
        console.log(data);
        // debugger;
        
        try{
          // console.log(data.result[0]);
          this.run = parseInt(data.result[0][11]);
          this.mail = data.result[0][6];
          this.nombres = data.result[0][1];
          console.log('RUN parseado: '+this.run);
          console.log('mail del usuario existente: '+this.mail);
          console.log('nombres del usuario existente: '+this.nombres);
          
          if(mail === this.mail){
            console.log('generar Codigo');
            this.apiService.crearCodigoOtp(this.run, this.mail).subscribe(data =>{
              console.log(data['outBinds'].resultado);
              if(data['outBinds'].resultado === undefined){
                console.log('no puede ser');
              }else{
                console.log('enviar mail');
                this.codigoOtp = data['outBinds'].resultado;
                this.apiService.enviarCorreo(this.nombres, this.mail, this.codigoOtp).subscribe(data=>{
                  console.log('correo enviado');
                    this.mostrarInputCodigo = true;
                    this.ocultarEnviarMail = true;

                })               
              }              
            })        
          
          }
          
        }catch{
          console.log('correo inválido o no existe en nuestra base de datos');                 
        }
      });
    }
  }

  verificaCodigo(){
      this.apiService.validarCodigo(this.usuarioForm.codigoOtp, this.mail, this.run).subscribe(data=>{
        console.log(data['outBinds'].resultado);
        if(data['outBinds'].resultado === '0'){
          console.log('codigo validado');
          this.router.navigate(['cambiar']);   
        }else{
          console.log('codigo invalido');
          
        }
        
      })
    

    // this.Autenticacion.validarCodigo(this.usuarioForm.codigoOtp, this.usuarioForm.mail, this.id_usuario).subscribe(data=>{

    //   console.log(data[0][0]._resultado_out);
      
    //   if(data[0][0]._resultado_out === 0){
    //     this.Autenticacion.mail = this.usuarioForm.mail;
    //     this.Autenticacion.codigoOtp = this.usuarioForm.codigoOtp;
        
    //     this.router.navigate(['modificar-pass']);

    //   }else{
    //     this.notificacionMensajeEnv('Código Inválido!','Por favor, ingresa un código válido')
  
    //   }

      
      
    // })
  }

  async alertaGenerica(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    }

  async notificacionMensajeEnv(header, message) {
    const toast = await this.toastController.create({
      header: header,
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
