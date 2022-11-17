///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { BehaviorSubject, Observable, of } from 'rxjs';           //
import { Recipes } from 'src/app/shared/classes/recipes';         //
import { RecipeItem} from 'src/app/shared/classes/recipe-item';   //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
///////////// /No Mover ////////////////////////////////////////////

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  public serviceURL="http://noiseapp.com.mx/hawk/process-recipe.php";
  
  iniCart= new Recipes;
  
  private currentCart= new BehaviorSubject(this.iniCart);
  theCart= this.currentCart.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  updateCart(cart: Recipes){
    this.currentCart.next(cart);
    console.log('Cart: ',this.currentCart);
  }

  /////// Adaptar al modelo correspondiente
  subscribeCart (obj: Recipes): Observable<any> {
    var user: Usuario = new Usuario;
    var theRequest: Request = new Request;
    user.generateToken("x","y");
    theRequest.usuario= user;
    theRequest.object= obj;
    theRequest.action= 'subscribe';
    theRequest.process= '';
    console.log('Subscription request: \n\n', theRequest);
    return this.http.post<any>(this.serviceURL, {data:theRequest}, {responseType: 'json'});
  }
  
}
