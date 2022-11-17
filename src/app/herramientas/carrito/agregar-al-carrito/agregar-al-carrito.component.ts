///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';       //
import { FormGroup, FormControl, ReactiveFormsModule,                                   //
        FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';             //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA,                                                                      //
} from '@angular/material';                                                             //       
import { Response } from 'src/app/shared/classes/response';                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
//     Servicios custom                                                                 //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { SimpleResponse } from 'src/app/shared/classes/simple-response';                //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Articulo } from 'src/app/shared/classes/articulo';
import { Recipes } from 'src/app/shared/classes/recipes';
import { RecipeItem } from 'src/app/shared/classes/recipe-item';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { Item } from 'src/app/shared/classes/autocomplete-item';
import { RecipesService } from 'src/app/servicios/recipes.service';
import { NAArticulo } from 'src/app/shared/classes/NAArticulo';

@Component({
  selector: 'app-agregar-al-carrito',
  templateUrl: './agregar-al-carrito.component.html',
  styleUrls: ['./agregar-al-carrito.component.scss']
})
export class AgregarAlCarritoComponent implements OnInit {

  ///////////// Variables

/////////////////// No mover !!! ///////////////////////////////////
theForm: FormGroup;                                       //
submitted= false;                                                 //
spinner: SpinnerComponent= new SpinnerComponent;                  //
working: boolean= false;                                          //
///////////////// /No mover !!! ////////////////////////////////////

///// Adaptar al objeto correspondiente
title: string="Agregar Artículo a Receta";
articulo: NAArticulo;
cart: Recipes;
item: RecipeItem;
existe1= false;
existe2= false;
///// Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private theService: CatalogosService, // Adaptar al objeto correspondiente
    public dRef: MatDialogRef<AgregarAlCarritoComponent>, // Adaptar al objeto correspondiente
    private recService: RecipesService
  ) { this.articulo= data.row as NAArticulo; console.log('Art: ', this.articulo); }

  ngOnInit() {
    this.spinner.message="Cargando";
    
    //Adaptar según el modelo correspondiente
    this.theForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      cantidad: [''],
      rendimiento: [''],
      costo:['']
    });
    this.working=false;
    /////////////// /No mover!!! ////////////

    /////////////// Creamos o traemos el carrito
    let aCart= new Recipes;
    if(aCart.checkCart("Cart1")){
      aCart.getCart("Cart1");
      if(aCart.findItem(this.articulo.FirebaseID)){
        this.existe1= true;
      }
    }
    /////////// Traemos datos
    this.populateForm();
  }

  ////// Funciones

  ////// Formularios y validaciones

  get f() { return this.theForm.controls; } // Mo mover!!!

  resetForm(){ // No mover
    console.log('Form reset');
    this.theForm.reset();
  }

  validate() { // No mover
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.addRecord('Cart1');
    }
  }

  populateForm(){
    this.theForm.controls['id'].setValue(this.articulo.FirebaseID);  
    this.theForm.controls['nombre'].setValue(this.articulo.Nombre);
    this.theForm.controls['rendimiento'].setValue(this.articulo.Rendimiento);
    this.theForm.controls['costo'].setValue(this.articulo.Costo);
  }

  ////// Ventanas
  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

  // Adaptar al modelo correspondiente
  addRecord(cartName: string): void {
    
    this.cart= new Recipes;
    this.item= new RecipeItem;

    //Checar si ya existe el carrito
    if(!this.cart.checkCart(cartName)){
      console.log('No existe');
      this.cart.createCart('main');
    }else{
      let car= localStorage.getItem(cartName);
      let parsedCart= JSON.parse(car)
      this.cart.ID= parsedCart.ID;
      this.cart.name= parsedCart.name;
      this.cart.type= parsedCart.type;
      this.cart.items= parsedCart.items as RecipeItem[];
      this.cart.status= parsedCart.status;
      this.cart.costo= parsedCart.costo;
      this.cart.porcion= parsedCart.porcion;
      console.log('Sí existe: \n\n',this.cart);
    }
    this.item.ID= this.articulo.FirebaseID;
    this.item.name= this.articulo.Nombre;
    this.item.qty= this.theForm.controls['cantidad'].value;
    this.item.type= this.articulo.Tipo;
    this.item.rate= this.theForm.controls['rendimiento'].value;
    this.item.um= this.articulo.Ubase;
    this.item.costoInicial= this.articulo.Costo;
    this.item.calculateCost();
    this.cart.addToCart(this.item);
    this.cart.calculateCost();
    
    localStorage.setItem(cartName,JSON.stringify(this.cart));
    this.recService.updateCart(this.cart);
    this.onClose();
  }

}