///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
import { GenericList } from 'src/app/shared/classes/generic-list';//
import { Strings } from '../../shared/classes/strings';           //
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { ActivatedRoute } from '@angular/router';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';
import { NAArticuloExistencia } from 'src/app/shared/classes/NAArticuloExistencia';
///////////// /No Mover ////////////////////////////////////////////

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocacionesService {
  
  public strings: Strings= new Strings;
  public serviceURL: string= 'NALocaciones/'

  constructor(
    private http: HttpClient
  ) { }


  /////// No mover!!!
  getLocations(id: number): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+'NAAlmacenes/'+id);
  }  

  /////// No mover!!!
  getItems(): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+this.serviceURL);
  }    

  getDetail(id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  addRecord (obj: any): Observable<any> {
      return this.http.post<any>(this.strings.baseURL+this.serviceURL, obj as Locacion);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+obj.LocacionID, obj as Locacion);
  }

  deleteRecord(id: number){
    return this.http.delete<any>(this.strings.baseURL+this.serviceURL+id);
  }

  checkForDuplicate(criteria: string){
  return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Duplicate/'+criteria);
  }

  updateLocacionArticulo(obj: any, art: number, loc: number){
    return this.http.put<any>(this.strings.baseURL+'NAArticulosLocaciones/'+art+'/'+loc, obj as NAArticulosLocaciones);
  }

  updateLocacionArticuloLista(obj: any[]){
    return this.http.post<any>(this.strings.baseURL+'NAArticulosLocaciones/UpdateList/', obj as NAArticulosLocaciones[]);
  }

  deleteLocacionArticulo(art: number, loc: number){
    return this.http.delete<any>(this.strings.baseURL+'NAArticulosLocaciones/'+art+'/'+loc);
  }

  listaLocacionesArticulos(id: number){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosLocaciones/Articulos/'+id);
  }

  detalleLocacionArticulo(art: string, loc: number){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosLocaciones/ArticuloLocacion/'+art+'/'+loc);
  }

  deleteRelationCC(loc: number, cc: number){
    return this.http.delete<any>(this.strings.baseURL+'NALocacionesCentrosConsumo/'+loc+'/'+cc);
  }
  
  addArticuloExistencia(obj: any): Observable<any>{
    return this.http.post(this.strings.baseURL+'NAArticulosExistencias/', obj as NAArticuloExistencia);
  }

  addArticuloExistenciaList(obj: any[]): Observable<any>{
    return this.http.post(this.strings.baseURL+'NAArticulosExistencias/AddList', obj as NAArticuloExistencia[]);
  }

  getExistenciasMov(loc: number, art: number){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosExistencias/Existencias/'+loc+'/'+art);
  }
  getExistenciasConsulta(loc: number, art: number){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosExistencias/ExistenciasConsulta/'+loc+'/'+art);
  }

  updateInventory(obj: any[]){
    return this.http.put<any>(this.strings.baseURL+'NAArticulosExistencias/ActualizarExistencias/', obj as NAArticuloExistencia[])
  }
}
