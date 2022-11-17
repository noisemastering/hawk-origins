///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
import { GenericList } from 'src/app/shared/classes/generic-list';//
import { Strings } from '../shared/classes/strings';
///////////// /No Mover ////////////////////////////////////////////


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  
  public strings: Strings= new Strings;
  public serviceURL:string;
  genList: GenericList;

  constructor(
    private http: HttpClient,
  ) { }

  /////// No mover!!!
  getItems(): Observable<any> {
      //return this.http.get<any>(this.serviceURL);
      var user: Usuario = new Usuario;
      var theRequest: Request = new Request;
      user.generateToken("x","y");
      theRequest.usuario= user;
      theRequest.action= 'list';
      theRequest.process= '';
      console.log('Add record request:', theRequest);
      return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }    

  getDetailNA(id: number){
    return this.http.get<any>(this.serviceURL+"/"+id);
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
      console.log('Add record request:', theRequest);
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

  tryAlex(): Observable<any>{
    this.serviceURL="https://localhost:5001/api/Access";
    //this.serviceURL="http://noiseapp.com.mx/hawk/hola-mundo.php";
    //this.serviceURL="http://praetorius.com.mx/Hawk/AngTest.aspx";
    //this.serviceURL="http://praetorius.com.mx/Hawk/Angular.aspx";
    let theRequest: Request = new Request;
    return this.http.get<any>(this.serviceURL);
  }
}