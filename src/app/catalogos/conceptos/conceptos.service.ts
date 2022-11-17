///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
import { GenericList } from 'src/app/shared/classes/generic-list';//
import { Strings } from '../../shared/classes/strings';    
import { ActivatedRoute } from '@angular/router';
import { Concepto } from 'src/app/shared/classes/concepto';
///////////// /No Mover ////////////////////////////////////////////

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {

  public strings: Strings= new Strings;
  public serviceURL: string= 'NAConceptos/'

  constructor(
    private http: HttpClient
  ) { }

  /////// No mover!!!

  getMasterItems(): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+this.serviceURL);
  }    

  getItems(): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+this.serviceURL);
  }    

  getDetail(id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  addRecord (obj: any): Observable<any> {
      return this.http.post<any>(this.strings.baseURL+this.serviceURL, obj as Concepto);
  }

  deleteRecord (id: number): Observable<any> {
    return this.http.delete<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+obj.ConceptoID, obj as Concepto);
  }

  checkForDuplicate(criteria: string, update: number, id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Duplicate/'+criteria+'/'+update+'/'+id);
  }



}
