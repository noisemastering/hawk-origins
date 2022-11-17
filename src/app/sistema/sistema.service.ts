import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Strings } from '../shared/classes/strings';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NASistema } from '../shared/classes/NASistema';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  public strings: Strings= new Strings;
  public serviceURL: string= 'NASistema/'

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  getDetail(id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any, id: number): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+id, obj as NASistema);
  }

  /*
  getMasterList() {
    return this.firestore.collection<any>('articulos').snapshotChanges();
  }

  getMasterItem(id:string){
    return this.firestore.collection('articulos').doc(id).snapshotChanges();
  }
  */
}
