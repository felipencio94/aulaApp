import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(/*private sqlite: SQLite*/) {
    // this.sqlite.create({
    //   name: 'datos.db',
    //   location: 'default'

    // }).then((db: SQLiteObject)=> {
    //   db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(RUN NUMBER(10), PASS VARCHAR(30))', []).then(() =>{
    //     console.log('FFO: TABLA CREADA CORRECTAMENTE');
    //   }).catch(e => {
    //     console.log('FFO: Error al crear la tabla Usuario');
    //   })
    // }).catch(e => {
    //   console.log('FFO: Error al crear base de datos');
    // })
   }


//    crearUsuarioDb(run, contrasena){
//     this.sqlite.create({
//       name: 'datos.db',
//       location: 'default'

//     }).then((db: SQLiteObject)=> {
//       db.executeSql('INSERT INTO USUARIO VALUES(?, ?)', [run, contrasena]).then(() =>{
//         console.log('FFO: USUARIO INSERTADO CORRECTAMENTE');
//       }).catch(e => {
//         console.log('FFO: ERROR AL INSERTAR USUARIO');
//       })
//     }).catch(e => {
//       console.log('FFO: Erorr al crear base de datos');
//     })
//    }

//    eliminarUsuarioDb(){
//     this.sqlite.create({
//       name: 'datos.db',
//       location: 'default'

//     }).then((db: SQLiteObject)=> {
//       db.executeSql('DELETE FROM USUARIO', []).then(() =>{
//         console.log('FFO: USUARIO ELIMINADO');
//       }).catch(e => {
//         console.log('FFO: ERROR AL ELIMINAR USUARIO');
//       })
//     }).catch(e => {
//       console.log('FFO: Erorr al crear base de datos');
//     })
//    }

//    validarUsuario(){
//     return this.sqlite.create({
//       name: 'datos.db',
//       location: 'default'

//     }).then((db: SQLiteObject)=> {
//       return db.executeSql('SELECT COUNT(RUN) AS CANTIDAD FROM USUARIO', []).then((data) =>{
//         return data.rows.item(0).CANTIDAD;
        
//       }).catch(e => {
//         console.log('FFO: ERROR AL ELIMINAR LA TABLA USUARIO');
//         return 99;
//       })
//     }).catch(e => {
//       console.log('FFO: Erorr al crear base de datos');
//       return 99;
//     })
//    }
}
