import { Injectable } from '@angular/core';
import { Strings } from 'src/app/shared/classes/strings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NACompra } from 'src/app/shared/classes/NACompra';
import { NAElementoCompra } from 'src/app/shared/classes/NAElementoCompra';
import { NAArticuloExistencia } from 'src/app/shared/classes/NAArticuloExistencia';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  public strings: Strings= new Strings;
  public serviceURL: string= 'NACompras/'

  constructor(
    private http: HttpClient
  ) { }

  getItems(): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+this.serviceURL);
  }    

  getDetail(id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  addRecord (obj: any): Observable<any> {
      return this.http.post<any>(this.strings.baseURL+this.serviceURL, obj as NACompra);
  }

  deleteRecord (id: number): Observable<any> {
    return this.http.delete<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+obj.CompraID, obj as NACompra);
  }

  checkForDuplicate(criteria: string, update: number, id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Duplicate/'+criteria+'/'+update+'/'+id);
  }

  getPresentacion(upc: string){
    return this.http.get<any>(this.strings.baseURL+'NAPresentacionesCompra/PorUPC/'+upc);
  }

  addElementos(obj: any[]): Observable<any> {
    return this.http.post<any>(this.strings.baseURL+'NAElementosCompra/List', obj as NAElementoCompra[]);
  }

  addUpdateElementos(obj: any[]): Observable<any> {
    return this.http.post<any>(this.strings.baseURL+'NAElementosCompra/UpdateList', obj as NAElementoCompra[]);
  }

  detalleArticuloLocacion(art: string, loc: number){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosLocaciones/ArticuloLocacion/'+art+'/'+loc);
  }

  addArticulosExistencias(obj: any[]): Observable<any>{
    return this.http.post(this.strings.baseURL+'NAArticulosExistencias/AddList/', obj as NAArticuloExistencia[]);
  }
}
