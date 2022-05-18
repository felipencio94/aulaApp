import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/sevices/api.service';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'





@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  lista: [{}];

  ruta: string = '';
  
  constructor (private ApiService:ApiService, private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.ApiService.recuperarDatosUsuario(this.ApiService.usuarioAuth).subscribe(data=>{
      this.lista = [this.ApiService.usuarioLogueado];
      }
      );
     
      
  }

  mostrarInfoSobre(){
    this.alertaSobreAulaappTeam(); 

  }

  async alertaSobreAulaappTeam() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      header: 'Acerca de',
      message: '© 2022 AulaAppTeam. All rights reserved.',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  logOut(){
    this.router.navigate(['login'])
  }

  async tomarFoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;

    this.ruta = imageUrl;

  }

}
