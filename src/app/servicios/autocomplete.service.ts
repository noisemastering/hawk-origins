import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { SimpleRequest } from 'src/app/shared/classes/simple-request';
import { Usuario } from 'src/app/shared/classes/usuario';

@Injectable()
export class AutocompleteService {

  url: string;

  constructor(private http: HttpClient) {}

  search(term) {
    var listOfItems = this.http.get(this.url + term)
    .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"Nombre": "Sin coincidencias"} as any]
                );
            }
    ));

    return listOfItems;  
    }

    searchKW(term: string) {
        var usuario: Usuario = new Usuario;
        var theRequest: SimpleRequest = new SimpleRequest;
        usuario.Clave= 'search';
        usuario.Password= 'pass';
        usuario.Token= 'token';
        theRequest.user= usuario;
        theRequest.action= 'keywords';
        theRequest.field= 'keyword';
        theRequest.table= 'keywords';
        theRequest.value= term;
        theRequest.cField= 'keyword';
        var listOfItems = this.http.post('http://noiseapp.com.mx/hawk/autocomplete.php', {data:theRequest}, {responseType: 'json'})
        .pipe(
            debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
            map(
                (data: any) => {
                    return (
                        data.length != 0 ? data as any[] : [{"Nombre": "Sin coincidencias"} as any]
                    );
                }
        ));
    
        return listOfItems;  
        }     
}