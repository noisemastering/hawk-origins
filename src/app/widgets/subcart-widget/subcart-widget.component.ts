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
import { Cart } from 'src/app/shared/classes/cart';
import { RecipeItem } from 'src/app/shared/classes/recipe-item';
import { SubrecetaEnPreparacionComponent } from 'src/app/ventas/subreceta-en-preparacion/subreceta-en-preparacion.component';
//import { CanastaService } from 'src/app/services/herramientas/canasta.service';

@Component({
  selector: 'app-subcart-widget',
  templateUrl: './subcart-widget.component.html',
  styleUrls: ['./subcart-widget.component.scss']
})
export class SubcartWidgetComponent implements OnInit {

  theCart: Cart;
  subrecetas: SubrecetaEnPreparacionComponent[];

  constructor() { }

  ngOnInit() {
    this.theCart= new Cart;
    if(this.theCart.checkCart("Cart2")){
      let car= localStorage.getItem("Cart2");
      this.theCart= JSON.parse(car) as Cart;
    }
  }

}
