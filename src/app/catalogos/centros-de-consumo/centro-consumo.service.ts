///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Strings } from '../../shared/classes/strings';           //
import { ActivatedRoute } from '@angular/router';
import { CentroConsumo } from 'src/app/shared/classes/centro-consumo';
import { NALocacionesCentrosConsumo } from 'src/app/shared/classes/locaciones-centros-consumo';
///////////// /No Mover ////////////////////////////////////////////

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CentroConsumoService {
  
  public strings: Strings= new Strings;
  public serviceURL: string= 'NACentrosConsumo/'

  constructor(
    private http: HttpClient
  ) { }


  /////// No mover!!!
  getLocations(id: number): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+'NACentrosConsumo/'+id);
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
      return this.http.post<any>(this.strings.baseURL+this.serviceURL, obj as CentroConsumo);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+obj.CentroConsumoID, obj as CentroConsumo);
  }

  deleteRecord (id: number): Observable<any> {
    return this.http.delete<any>(this.strings.baseURL+this.serviceURL+id);
  }

  checkForDuplicate(criteria: string, update: number, id: number){
  return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Duplicate/'+criteria+'/'+update+'/'+id);
  }

  deleteRelationCC(loc: number, cc: number){
    return this.http.delete<any>(this.strings.baseURL+'NALocacionesCentrosConsumo/'+loc+'/'+cc);
  }

  addRelationCC(obj: any):Observable<any>{
    return this.http.post<any>(this.strings.baseURL+'NALocacionesCentrosConsumo/', obj as NALocacionesCentrosConsumo);
  }
}
