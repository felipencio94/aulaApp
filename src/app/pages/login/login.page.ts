import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/sevices/api.service';
import { AutenticacionService } from 'src/app/sevices/autenticacion.service';
import { Usuario } from 'src/app/models/usuario.models';
import { Nivel } from 'src/app/interface/nivel';
import { DbService } from 'src/app/sevices/db.service';
import { Alumno } from 'src/app/interface/alumno';
import { element } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  listaNivel: Nivel[] = [];
  usuarioForm = {
    run: '',
    password: ''
  }

  //listaUsuarios: [Usuario]
  listaAlumnos: [Alumno]
  public mostrarInfo: boolean = false;

  constructor(public alertController: AlertController,
    public servicio: AutenticacionService,
    public router: Router,
    public apiService: ApiService,
    public toastController: ToastController,
    public db: DbService) {
      //this.obtenerUsuariosApi();
      this.obtenerAlumnosApi();
      /*this.db.validarUsuario().then(data => {
        console.log('FFO: USUARIOS CREADOS: ' + data);
        if(data === 1) {
          this.router.navigate(['inicio'])
        }
        
      })*/
    }

  ngOnInit() {
  }

  mostrarInfoButton(){
    
    this.mostrarInfo = !this.mostrarInfo;
  }


  obtenerAlumnosApi(){
    let that = this;
    let contador = 0;
    this.apiService.obtenerAlumnos().subscribe(data => {
      data.forEach(element =>{
        let x: Alumno = {RUNALUMNO: '', NOMBREALUMNO: '',ESTADO: '',CURSOACTUAL: '', ANIO: 0,
        DIRECCION: '', SEXO: '', DISCAPACIDAD: '', NIVELALUMNO: '', FECHANACIMIENTO: '', 
        EDAD: 0, PUEBLOORIGINARIO: ''};
        x.RUNALUMNO = element[0];
        x.NOMBREALUMNO= element[1];

        if(contador === 0){
          that.listaAlumnos = [x];
        } else {
          that.listaAlumnos.push(x);
        }

        contador++;
      });

      console.log(this.listaAlumnos);
      
    });  

  }
     
  validarLogin(){
    let run= this.usuarioForm.run;
    let contrasena = btoa(this.usuarioForm.password);
    this.apiService.validarLogin(run, contrasena).subscribe( data =>{
      if(data.result ==='LOGIN NOK'){
        //this.db.eliminarUsuarioDb();
        this.presentToastWithOptions('Credenciales incorrectas','Usuario o clave incorrectos, por favor reintente.');
      }else{
        //this.db.eliminarUsuarioDb();
        //this.db.crearUsuarioDb(this.usuarioForm.run, this.usuarioForm.password);
        this.presentToast('Bienvenido!');
        this.router.navigate(['inicio']);
      }
    });

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
