///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';       //
import { FormGroup, FormControl,                                                        //
  ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';                  //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA                                                                       //
} from '@angular/material';                                                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { Response } from 'src/app/shared/classes/response';                             //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { RecipeItem } from 'src/app/shared/classes/recipe-item';
import { RecipesService } from 'src/app/servicios/recipes.service';
import { Recipes } from 'src/app/shared/classes/recipes';

@Component({
  selector: 'app-editar-ingrediente',
  templateUrl: './editar-ingrediente.component.html',
  styleUrls: ['./editar-ingrediente.component.scss']
})
export class EditarIngredienteComponent implements OnInit {

  /////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                         //
  submitted= false;                                                   //
  spinner: SpinnerComponent= new SpinnerComponent;                    //
  working: boolean= false;                                            //       
  /////////////////// /No mover !!! ////////////////////////////////////

  theItem= new RecipeItem;// Adaptar según modelo correspondiente
  theRecipe: Recipes;
  title: string="Modificar ingrediente";

  constructor(

    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<EditarIngredienteComponent>, //Adaptar al modelo!!!
    private notificationService: NotificationsService, //No mover!!!
    private theService: RecipesService, // No mover!!!
    
    ) { this.theItem= data.data as RecipeItem; console.log('ID: ', this.theItem)}

    ngOnInit() {
      //Adaptar según el modelo correspondiente
      this.theForm = this.formBuilder.group({
        id: [''],
        nombre: [''],
        cantidad: [''],
        rendimiento: ['']
      });
      this.working=false;
      /////////// Traemos datos
      this.theRecipe= new Recipes;
      this.theRecipe.getCart("Cart1");
      this.theForm.controls['id'].setValue(this.theItem.ID);
      this.theForm.controls['nombre'].setValue(this.theItem.name);
      this.theForm.controls['cantidad'].setValue(this.theItem.qty);
      this.theForm.controls['rendimiento'].setValue(this.theItem.rate);
    }
  
  
    //////////////// Funciones
  
    //////////// Formulario
    get f() { return this.theForm.controls; } // No mover
    
    /////////// Ventanas
    onClose(){
      this.dRef.close();
    
    }
   
    onEdit(){
      this.theItem.qty= this.theForm.controls['cantidad'].value;
      this.theItem.rate= this.theForm.controls['rendimiento'].value;
      this.theItem.costo=(this.theItem.rate/100)*this.theItem.qty*this.theItem.costoInicial;
      this.theRecipe.updateCart(this.theItem);
      this.theRecipe.calculateCost();
      this.theRecipe.saveCart("Cart1");
      this.theService.updateCart(this.theRecipe);
      this.onClose();
    }

    
}