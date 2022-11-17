import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/classes/usuario';
import { SimpleRequest } from 'src/app/shared/classes/simple-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { MessageService} from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DuplicatesService {

  public url: string;
  
  constructor(
    private http: HttpClient,
      private messageService: MessageService
  ) { }

  checkForDuplicates(pAction: string, pField: string, pTable: string, pValue: string, pCfield: string){
    var usuario: Usuario = new Usuario;
    var theRequest: SimpleRequest = new SimpleRequest;
    usuario.Clave= 'search';
    usuario.Password= 'pass';
    usuario.Token= 'token';
    theRequest.user= usuario;
    theRequest.action= 'duplicate';
    theRequest.field= pField;
    theRequest.table= pTable;
    theRequest.value= pValue;
    theRequest.cField= pCfield;
    console.log('Request: '+ JSON.stringify(theRequest));
    return this.http.post<any>(this.url, {data:theRequest}, {responseType: 'json'}).
      pipe(
          tap(_ => this.log(`Validar: ${theRequest.value}`)),
          catchError(this.handleError('Error'))
      );
  }
  checkForDuplicatesUpdate(pAction: string, pField: string, pTable: string, pValue: string, pCfield: string){
    var usuario: Usuario = new Usuario;
    var theRequest: SimpleRequest = new SimpleRequest;
    usuario.Clave= 'search';
    usuario.Password= 'pass';
    usuario.Token= 'token';
    theRequest.user= usuario;
    theRequest.action= 'duplicate-update';
    theRequest.field= pField;
    theRequest.table= pTable;
    theRequest.value= pValue;
    theRequest.cField= pCfield;
    console.log('Request: '+ JSON.stringify(theRequest));
    return this.http.post<any>(this.url, {data:theRequest}, {responseType: 'json'}).
      pipe(
          tap(_ => this.log(`Validar: ${theRequest.value}`)),
          catchError(this.handleError('Error'))
      );
  }

/** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
