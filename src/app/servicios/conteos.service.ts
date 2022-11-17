import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { ConteoElement } from '../shared/classes/conteo-element';
import { HttpClient, HttpHeaders} from '@angular/common/http';    
import { Request } from 'src/app/shared/classes/request';         
import { Usuario } from 'src/app/shared/classes/usuario';         
import { ArticuloExistencia } from '../shared/classes/articulo-existencia';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConteosService {

  list: ArticuloExistencia[];

  public serviceURL:string='http://noiseapp.com.mx/hawk/process-conteos.php';
  list$: BehaviorSubject<ArticuloExistencia[]> //= new BehaviorSubject(this.list);
  private locacion = new BehaviorSubject<Object>({almacen: 'Hello', locacion: 'World'});

  constructor(
    private http: HttpClient
  ) {
  }


  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    this.list$.next(this.list);
  }

  getControl(index, fieldName) {
  }

  setLocalidad(loc: Object){
    this.locacion.next(loc);
  }

  getLocalidad(): Observable<any>{
    return this.locacion.asObservable();
  }

  getArticulosAlmacen(): Observable<any> {
    //Este servicio trae valores con identificador para llenar un dropdown o similar
        let loc = this.locacion.value;
        let user: Usuario = new Usuario;
        let theRequest: Request = new Request;
        user.generateToken("x","y");
        theRequest.usuario= user;
        theRequest.action= 'list';
        theRequest.object= loc;
        theRequest.process= "ArticulosAlmacen";
        console.log('Get items request: \n\n', theRequest);
        return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }
  
  updateCount(): Observable<any>{
    let obj = this.list$.value;
    let user: Usuario = new Usuario;
    let theRequest: Request = new Request;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.action= 'update';
    theRequest.object= obj;
    theRequest.process= "ArticulosAlmacen";
    console.log('Get items request: \n\n', theRequest);
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }

}