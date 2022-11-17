///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';        //
import {                                                                                //
  MatPaginator,                                                                         //
  MatSort,                                                                              //
  MatTableDataSource,                                                                   //
  MatDialog,                                                                            //
  MatDialogConfig} from '@angular/material';                                            // 
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios correspondientes (con rutas absolutas)
import { Recipes } from 'src/app/shared/classes/recipes';
import { RecipeItem } from 'src/app/shared/classes/recipe-item';
import { RecipesService } from 'src/app/servicios/recipes.service';
//import { CanastaService } from 'src/app/services/herramientas/canasta.service';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss']
})
export class CartWidgetComponent implements OnInit {

  theCart: Recipes;
  cart$= this.recService.theCart;
  count: number;
  constructor(private recService: RecipesService) { }

  ngOnInit() {
    this.theCart= new Recipes;
    this.cart$.subscribe(
      (car: Recipes) => {
        this.theCart = car as Recipes;
        this.count= this.theCart.items.length;
        console.log("List data: ", this.theCart);
      });
    /*if(this.theCart.checkCart("Cart1")){
      let car= localStorage.getItem("Cart1");
      this.theCart= JSON.parse(car) as Cart;
    }*/
    //console.log("Observavble", this.cart$);
  }

}
