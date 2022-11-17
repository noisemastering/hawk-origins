///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
import { Strings } from '../shared/classes/strings';
///////////// /No Mover ////////////////////////////////////////////

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  connect= new Strings;
  serviceURL: string= "NAUsers/";

  constructor(
    private http: HttpClient,
  ) { }

  sendCredentials(theObject: Usuario): Observable<any>{
    return this.http.post<any>(this.connect.baseURL+this.serviceURL+"Login", theObject);
  }

  getDetail(theID: number): Observable<any>{
    return this.http.get<any>(this.connect.baseURL+this.serviceURL+theID);
  }
}
