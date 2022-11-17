///////////// No Mover ///////////////////////////////////////////////////////////
import { Injectable } from '@angular/core';                                     //
import { Observable, of } from 'rxjs';                                          //
import { HttpClient, HttpHeaders} from '@angular/common/http';                  //
import { RequestRelations } from 'src/app/shared/classes/request-relations';    //
import { Usuario } from 'src/app/shared/classes/usuario';                       //
import { GenericList } from 'src/app/shared/classes/generic-list';              //
///////////// /No Mover //////////////////////////////////////////////////////////


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RelacionadosService {
  
  public serviceURL:string;
  genList: GenericList;

  constructor(
    private http: HttpClient,
  ) { }

  /////// No mover!!!
  getItems(obj: any, relation: string): Observable<any> {
        let user: Usuario = new Usuario;
        let theRequest: RequestRelations = new RequestRelations;
        user.generateToken("x","y");
        theRequest.usuario= user;
        theRequest.object= obj;
        theRequest.action= relation;
        theRequest.process= relation;
        console.log('Get items request: \n\n', theRequest);
        return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
    }    

  /////// Adaptar al modelo correspondiente
  linkRecord (obj: any, action): Observable<any> {
      var user: Usuario = new Usuario;
      var theRequest: RequestRelations = new RequestRelations;
      user.generateToken("x","y");
      theRequest.usuario= user;
      theRequest.object= obj;
      theRequest.action= action;
      console.log('Add record request:', theRequest);
      return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    var user: Usuario = new Usuario;
    var theRequest: RequestRelations = new RequestRelations;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= obj;
    theRequest.action= 'update';
    theRequest.process= '';
    console.log('Update service request: \n\n', theRequest);
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
}

  /////// Adaptar al modelo correspondiente
  getDetail(theObject: any, action: string): Observable<any> {
    var user: Usuario = new Usuario;
    var theRequest: RequestRelations = new RequestRelations;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= theObject;
    theRequest.action= action;
    console.log('Detail request \n\n', theRequest, this.serviceURL);
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }

  /////// Adaptar al modelo correspondiente
  deleteRecord(theObject: any): Observable<any> {
    var user: Usuario = new Usuario;
    var theRequest: RequestRelations = new RequestRelations;
    var obj: any;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= theObject;
    theRequest.action= 'delete';
    theRequest.process= '';
    console.log('Delete request: \n\n' + JSON.stringify(theRequest));
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }


  ///////// Dropdowns
  /////// No mover!!!
  getDropDown(table: string): Observable<any> {
    //Este servicio trae valores con identificador para llenar un dropdown o similar
        let user: Usuario = new Usuario;
        let theRequest: RequestRelations = new RequestRelations;
        user.generateToken("x","y");
        theRequest.usuario= user;
        theRequest.action= 'keyvalue';
        theRequest.process= table;
        console.log('Get items request: \n\n', theRequest);
        return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
    }  
    
  getDropDownID(obj: any, accion: string): Observable<any> {
      //Este servicio trae valores con identificador para llenar un dropdown o similar
      //La diferencia con cualquier otra función similar es que esta es para solicitar
      //una lista sin los IDs que ya están relacionados con el objeto en cuestión
          let user: Usuario = new Usuario;
          let theRequest: RequestRelations = new RequestRelations;
          user.generateToken("x","y");
          theRequest.usuario= user;
          theRequest.action= accion;
          theRequest.object= obj;
          console.log('Get items request: \n\n', theRequest);
          return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }
  

}