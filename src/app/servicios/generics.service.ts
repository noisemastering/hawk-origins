///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
import { GenericList } from 'src/app/shared/classes/generic-list';//
///////////// /No Mover ////////////////////////////////////////////


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class GenericsService {
  
  public serviceURL:string='http://noiseapp.com.mx/hawk/process-generic.php';
  genList: GenericList;

  constructor(
    private http: HttpClient,
  ) { }

  /////// No mover!!!
  getDropDown(table: string): Observable<any> {
    //Este servicio trae valores con identificador para llenar un dropdown o similar
        let user: Usuario = new Usuario;
        let theRequest: Request = new Request;
        user.generateToken("x","y");
        theRequest.usuario= user;
        theRequest.action= 'keyvalue';
        theRequest.process= table;
        console.log('Get items request: \n\n', theRequest);
        return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
    }  
    
  getDropDownID(table: string, id: string, field: string): Observable<any> {
      //Este servicio trae valores con identificador para llenar un dropdown o similar
          let user: Usuario = new Usuario;
          let theRequest: Request = new Request;
          user.generateToken("x","y");
          theRequest.usuario= user;
          theRequest.action= 'keyvalueID';
          theRequest.process= table;
          theRequest.extraValue= [id, field];
          console.log('Get items request: \n\n', theRequest);
          return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }
  
  getDropDownLoc(table: string, id: string, field: string): Observable<any> {
    //Este servicio trae valores con identificador para llenar un dropdown o similar
        let user: Usuario = new Usuario;
        let theRequest: Request = new Request;
        user.generateToken("x","y");
        theRequest.usuario= user;
        theRequest.action= 'keyvalueLocaciones';
        theRequest.process= table;
        theRequest.extraValue= [id, field];
        console.log('Get items request: \n\n', theRequest);
        return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
}

  /////// Adaptar al modelo correspondiente
  addRecord (obj: any): Observable<any> {
      var user: Usuario = new Usuario;
      var theRequest: Request = new Request;
      user.generateToken("x","y");
      theRequest.usuario= user;
      theRequest.object= obj;
      theRequest.action= 'add';
      theRequest.process= '';
      console.log('Add record request: \n\n', theRequest);
      return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    var user: Usuario = new Usuario;
    var theRequest: Request = new Request;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= obj;
    theRequest.action= 'update';
    theRequest.process= '';
    console.log('Update service request: \n\n', theRequest);
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
}

  /////// Adaptar al modelo correspondiente
  getDetail(theObject: any): Observable<any> {
    var user: Usuario = new Usuario;
    var theRequest: Request = new Request;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= theObject;
    theRequest.action= 'select';
    theRequest.process= '';
    console.log('Detail request \n\n', theRequest);
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }

  /////// Adaptar al modelo correspondiente
  deleteRecord(theObject: any): Observable<any> {
    var user: Usuario = new Usuario;
    var theRequest: Request = new Request;
    var obj: any;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= theObject;
    theRequest.action= 'delete';
    theRequest.process= '';
    console.log('Delete request: \n\n' + JSON.stringify(theRequest));
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }

}