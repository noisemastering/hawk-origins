///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
import { GenericList } from 'src/app/shared/classes/generic-list';//
import { ArticuloMovimiento } from '../shared/classes/articulo-movimiento';
///////////// /No Mover ////////////////////////////////////////////

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MovimientosService {

  res: Observable<any[]>;
  entradas: ArticuloMovimiento[];
  public serviceURL:string='http://noiseapp.com.mx/hawk/process-movimiento.php';

  constructor(
    private http: HttpClient,
  ) { }

  getTableEntradas(): Observable<any> {
    
    let mov= localStorage.getItem('movimientos');
    
    if(mov)
    {
      this.entradas = JSON.parse(mov);
    }
    else{
      localStorage.setItem('movimientos','');
      this.entradas= [];
    }
    //this.res= this.entradas;
    const entradasObservable = new Observable(observer => {
          setTimeout(() => {
              observer.next(this.entradas);
          }, 1000);
    });
    return entradasObservable;
  } 
  
  addEntrada(mov: ArticuloMovimiento): Observable<any>{

    let movs= localStorage.getItem('movimientos');
    console.log("Movimiento: ",mov);
    if(movs)
    {
      this.entradas = JSON.parse(movs) as ArticuloMovimiento[];
    }
    else{
      localStorage.setItem('movimientos','');
      this.entradas= [];
    }
    mov.index= this.entradas.length;
    this.entradas.push(mov);
    localStorage.setItem('movimientos',JSON.stringify(this.entradas));
    const entradasObservable = new Observable(observer => {
      observer.next(this.entradas)
      observer.complete();
          
    });
    return entradasObservable;
  }

  updateEntrada(mov: ArticuloMovimiento): Observable<any>{
    let movs= localStorage.getItem('movimientos');
    this.entradas = JSON.parse(movs) as ArticuloMovimiento[];
    console.log("Entradas: ", this.entradas);
    this.entradas[mov.index]= mov;
    localStorage.setItem('movimientos',JSON.stringify(this.entradas));
    const entradasObservable = new Observable(observer => {
      observer.next(this.entradas)
      observer.complete();
          
    });
    return entradasObservable;
  }

  deleteEntrada(mov: ArticuloMovimiento): Observable<any>{
    let movs= localStorage.getItem('movimientos');
    this.entradas = JSON.parse(movs) as ArticuloMovimiento[];
    console.log("Entradas: ", this.entradas);
    this.entradas.splice(mov.index, 1);
    localStorage.setItem('movimientos',JSON.stringify(this.entradas));
    const entradasObservable = new Observable(observer => {
      observer.next(this.entradas)
      observer.complete();
          
    });
    return entradasObservable;
  }

  getUMS(art: any): Observable<any> {
    //Este servicio trae valores con identificador para llenar un dropdown o similar
    let user: Usuario = new Usuario;
    let theRequest: Request = new Request;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= art;
    theRequest.action= 'keyvalueID';
    theRequest.process='Articulos_UM';
    console.log('Get items request: \n\n', theRequest);
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }

}
