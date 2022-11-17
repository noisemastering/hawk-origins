import { Injectable } from '@angular/core';
import { Zip } from 'src/app/shared/classes/zip';
import { Observable, of } from 'rxjs'; 
import { MessageService} from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ZipService {

  private theUrl = 'http://noiseapp.com.mx/real-estate/process/getAddress.php';//'api/heroes';  // URL to web api

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }


  /** GET hero by id. Will 404 if id not found */
  getZip(cp: string): Observable<any[]> {
    const url = `${this.theUrl}`;
    //console.log(`URL: ${url}`);
    const  params = new  HttpParams().set('cp', cp);
    return this.http.get(url,{params}).pipe(
      tap(_ => this.log(`Fetched zip ${cp}`)),
      catchError(this.handleError<any>(`getZip with zip ${cp}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchZips(term: string): Observable<Zip[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Zip[]>(`${this.theUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Zip[]>('searchHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ZipService: ${message}`);
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