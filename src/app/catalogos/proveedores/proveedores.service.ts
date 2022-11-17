import { Injectable } from '@angular/core';
import { Strings } from 'src/app/shared/classes/strings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { NARazonSocial } from 'src/app/shared/classes/NARazonSocial';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  public strings: Strings= new Strings;
  public serviceURL: string= 'NAProveedores/'

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
      return this.http.post<any>(this.strings.baseURL+this.serviceURL, obj as NAProveedor);
  }

  deleteRecord (id: number): Observable<any> {
    return this.http.delete<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+obj.ConceptoID, obj as NAProveedor);
  }

  checkForDuplicate(criteria: string, update: number, id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Duplicate/'+criteria+'/'+update+'/'+id);
  }
  /////// Adaptar al modelo correspondiente
  addRazon (obj: any): Observable<any> {
    return this.http.post<any>(this.strings.baseURL+'NARazonesSociales/', obj as NARazonSocial);
  }
}
