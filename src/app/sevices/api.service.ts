import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerUsuarios(){
    return this.http.get<Usuario[]>(this.rutaBase + '/usuario');
  }


}
