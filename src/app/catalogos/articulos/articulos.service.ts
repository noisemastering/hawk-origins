///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Strings } from '../../shared/classes/strings';           //
import { ActivatedRoute } from '@angular/router';
import { ArticuloImportado } from 'src/app/shared/classes/articulo-importado';
import { Articulo } from 'src/app/shared/classes/articulo';
import { AngularFirestore } from '@angular/fire/firestore';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';
import { NAMerma } from 'src/app/shared/classes/NAMerma';
import { NAPresentacionCompra } from 'src/app/shared/classes/NAPresentacion';
import { NAArticuloProveedor } from 'src/app/shared/classes/NAArticuloProveedor';
///////////// /No Mover ////////////////////////////////////////////

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  public strings: Strings= new Strings;
  public serviceURL: string= 'NAArticulos/'

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }


  /////// No mover!!!
  getLocations(id: number): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+'Articulos/'+id);
  }  

  /////// No mover!!!
  getItems(): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+'Articulos/');
    //return this.http.get<any>("https://localhost:5001/api/Articulos/");
  }   
  
  /////// No mover!!!
  getNAItems(): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+this.serviceURL);
    //return this.http.get<any>("https://localhost:5001/api/Articulos/");
  }   

  getDetail(id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+id);
  }

  getNADetail(id: string){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Firebase/'+id);
  }

  /////// Adaptar al modelo correspondiente
  addRecord (obj: any): Observable<any> {
      return this.http.post<any>(this.strings.baseURL+this.serviceURL, obj as Articulo);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+obj.CentroConsumoID, obj as Articulo);
  }

  deleteRecord (id: string): Observable<any> {
    return this.http.delete<any>(this.strings.baseURL+'Articulos/'+id);
  }

  checkForDuplicate(criteria: string, update: number, id: number){
  return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Duplicate/'+criteria+'/'+update+'/'+id);
  }

  getDetailImport(id: string){
    return this.http.get<any>(this.strings.baseURL+'Articulos/'+id);
  }

  getMasterList() {
    return this.firestore.collection<any>('articulos').snapshotChanges();
  }

  getMasterItem(id:string){
    return this.firestore.collection('articulos').doc(id).snapshotChanges();
  }

  addMasterRecord(articulo: any){
    let data = Object.assign({}, articulo);
    return this.firestore.collection<any>('articulos').add(data);
  }

  getCategories(){
    return this.firestore.collection<any>('categorias').snapshotChanges();
  }

  checkForDuplicateFirestore(name: string){
    console.log("Valor: ", name);
   return  this.firestore.collection<any>('articulos', ref => ref.where('nombre', '==', name)).valueChanges()
    
  }  

  addArticuloLocacion(obj: any){
    return this.http.post<any>(this.strings.baseURL+'NAArticulosLocaciones/', obj as NAArticulosLocaciones);
  }

  updateArticuloLocacion(obj: any, art: number, loc: number){
    return this.http.put<any>(this.strings.baseURL+'NAArticulosLocaciones/'+art+'/'+loc, obj as NAArticulosLocaciones);
  }

  deleteArticuloLocacion(art: number, loc: number){
    return this.http.delete<any>(this.strings.baseURL+'NAArticulosLocaciones/'+art+'/'+loc);
  }

  listaArticulosLocaciones(id: string){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosLocaciones/Locaciones/'+id);
  }

  detalleArticuloLocacion(art: string, loc: number){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosLocaciones/ArticuloLocacion/'+art+'/'+loc);
  }

  addMerma(obj: any[]): Observable<any> {
    return this.http.post<any>(this.strings.baseURL+'NAMermass/List', obj as NAMerma[]);
  }

  addPresentaciones(obj: any[]): Observable<any> {
    return this.http.post<any>(this.strings.baseURL+'NAPresentacionesCompra/List', obj as NAPresentacionCompra[]);
  }

  unlinkProvider(art: string, prov: number){
    return this.http.get<any>(this.strings.baseURL+'NAArticulosProveedores/Unlink/'+art+'/'+prov);
  }

  linkProvider(obj: any){
    return this.http.post<any>(this.strings.baseURL+'NAArticulosProveedores/', obj as NAArticuloProveedor);
  }

}
