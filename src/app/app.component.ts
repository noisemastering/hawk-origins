import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RecipesService } from 'src/app/servicios/recipes.service';
import { Recipes } from './shared/classes/recipes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
   private cart: Recipes;
   
   constructor(
      translate: TranslateService,
      recipeService: RecipesService
   ) {
      this.cart= new Recipes;
      if(this.cart.checkCart("Cart1")){
         this.cart.getCart("Cart1");
      }else{
         this.cart.createCart("Cart1");
      }
      recipeService.updateCart(this.cart);
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
   }
	
}
