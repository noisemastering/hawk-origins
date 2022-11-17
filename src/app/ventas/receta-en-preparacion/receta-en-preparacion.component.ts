///////////// No Mover!!!!! //////////////////////////////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild,                                                                          //
  ChangeDetectorRef, ElementRef } from '@angular/core';                                                         //
import { FormGroup, FormControl, ReactiveFormsModule,                                                           //
  FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';                                           //
import { Recipes } from 'src/app/shared/classes/recipes';                                                       //
import { RecipeItem } from 'src/app/shared/classes/recipe-item';                                                //
import { RecipesService } from 'src/app/servicios/recipes.service';                                             //
import {                                                                                                        //
  MatPaginator, MatAutocomplete,                                                                                //
  MatSort, MatAutocompleteSelectedEvent,                                                                        //
  MatTableDataSource,                                                                                           //
  MatDialog,                                                                                                    //
  MatDialogConfig} from '@angular/material';                                                                    //
import { Response } from 'src/app/shared/classes/response';                                                     //
import { MatChipInputEvent } from '@angular/material';                                                          //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                                           // 
//     Servicios custom                                                                                         //
import { NotificationsService } from 'src/app/servicios/notifications.service';                                 //
import { DuplicatesService } from 'src/app/servicios/duplicates.service';                                       //  
import { SimpleResponse } from 'src/app/shared/classes/simple-response';                                        //
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';                                   //
import { EditarIngredienteComponent } from '../recetas/editar-ingrediente/editar-ingrediente.component';        //
import { DetalleIngredienteComponent } from '../recetas/detalle-ingrediente/detalle-ingrediente.component';     //
import { EliminarIngredienteComponent } from '../recetas/eliminar-ingrediente/eliminar-ingrediente.component';  //
import { RouterModule } from '@angular/router';                                                                 //
import { GenericsService } from 'src/app/servicios/generics.service';                                           //
import { DropDownItem } from 'src/app/shared/classes/dropdown-item';                                            //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-receta-en-preparacion',
  templateUrl: './receta-en-preparacion.component.html',
  styleUrls: ['./receta-en-preparacion.component.scss'],
  providers:[AutocompleteService]
})

export class RecetaEnPreparacionComponent implements OnInit {

  recipeName= "Cart1";
  recipe: Recipes;
  recipeItem: RecipeItem;
  empty: boolean;
  working= true;
  pctCalc= false;
  precioCalc= false;
  dropDownList: DropDownItem[];
  displayColumns: string[]=['ID','name','type','qty','costo','rate','acciones'];
  criterios = [
    {
      valor: '1',
      etiqueta: 'Porcentaje de costo',
    },
    {
      valor: '2',
      etiqueta: 'Precio calculado',
    }
  ]
  
  ///////////////////// No mover !!! ///////////////////////////////////
    searchKey: string;                                                //
    listData: MatTableDataSource<any>;                                //
    @ViewChild(MatSort) sort: MatSort;                                //
    @ViewChild(MatPaginator) paginator: MatPaginator;                 //  
    @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;  //
    @ViewChild('autoKW') matAutocompleteKW: MatAutocomplete;          //
  /////////////////// /No mover !!! ////////////////////////////////////

  ///////////////////// No mover !!! ///////////////////////////////////
    theForm: FormGroup;                                       //
    submitted= false;                                                 //
    items= <any>[];                                                   //
    keyws= <any>[];                                                   //
    //MatChip                                                         //
    visible: boolean = true;                                          //
    selectable: boolean = true;                                       //
    removable: boolean = true;                                        //
    addOnBlur: boolean = true;                                        //
    keywords = [];                                                    //
    separatorKeysCodes = [ENTER, COMMA];                              //
  /////////////////// /No mover !!! ////////////////////////////////////

  constructor(
    private dialog: MatDialog, // No mover!!!
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
    private recipeService: RecipesService, //Cambiar por el servicio correspondiente
    private formBuilder: FormBuilder, // No Mover!!!
    private autocompleteService: AutocompleteService, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private duplicateService: DuplicatesService,
    private genService: GenericsService // No Mover!!!
  ) { }

  ngOnInit() {
    
    //Adaptar según el modelo correspondiente
    this.theForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      criterio: [''],
      tipo: [''],
      calcular:[''],
      keys: ['']
    });
    
    this.recipe= new Recipes;
    this.getList();
    this.getDropDown();
    
    //No mover!!!
    this.theForm.controls['keys'].valueChanges.subscribe(
      term => { console.log('entro')
        if (term != '') {
          this.autocompleteService.searchKW(term).subscribe(
              data => {
                this.keyws = data as any[];
                //console.log(data[0].Name);
              })
        }
      });  
    // /No mover
    this.theForm.controls['nombre'].setValue(this.recipe.name);
    this.theForm.controls['tipo'].setValue(this.recipe.type);
    console.log("Receta: ",this.recipe);
    if((this.recipe.pctCosto>0)||(this.recipe.precioCalculado>0)){
      this.pctCalc= true;
      this.precioCalc= true;
    }
    this.keyws= this.recipe.keywords;
    this.working= false;
  }

  //////////// Llenado de datos

  getList(){
    this.recipe.getCart(this.recipeName);
    if(this.recipe.items.length>0){
      this.empty= false;
    }else{
      this.empty= true;
    }
    this.recipe.calculateCost();
    console.log("Cart: ", this.recipe);
    this.listData= new MatTableDataSource(this.recipe.items);
    this.listData.sort= this.sort;
    this.listData.paginator= this.paginator;
    this.changeDetectorRefs.detectChanges();
  }

  getDropDown(){
    this.genService.serviceURL="http://noiseapp.com.mx/hawk/process-menu-item.php";
    this.genService.getDropDown("KeyValue")
    .subscribe(
      (response: Response) => {
        this.dropDownList = response.object as DropDownItem[];
        this.working= false;
        console.log("Items: ", this.dropDownList);
      });;
  }

  //////////// /Llenado de datos

  ///////// Buscador No mover!!! /////////

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }

  ////// Keywords No mover!!!
  add(event: MatChipInputEvent): void {
    console.log("input");
    let input = event.input;
    let value = event.value;

    // Add our keyword
    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.theForm.controls['keys'].setValue(null);
  }

  remove(keyword: any): void {
    console.log("Entró: "+this.keywords);
    console.log("Keyword: "+keyword);
    let index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
    console.log("Terminó: "+this.keywords);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.theForm.controls['keys'].setValue(null);
    this.keywords.push(event.option.viewValue.trim());
    this.keysInput.nativeElement.value = '';
  }
  ////////// /Keywords


  ///////// Ventanas /////////
  ///////// Adaptar los nombres de los componentes

  onEdit(row: any){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      data: row
    }
    this.dialog.open(EditarIngredienteComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }

  onDetail(row: any){
    
    console.log('Row: '+JSON.stringify(row));
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      data: row
    }
    this.dialog.open(DetalleIngredienteComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
    

  }

  onDelete(row: any){
    
    //console.log('Row: '+JSON.stringify(row));
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      data: row
    }
    this.dialog.open(EliminarIngredienteComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }

  ///////// Ventanas /////////

  //////// Formulario ///////
  calculate(){ 
    let option= this.theForm.controls['criterio'].value;
    switch (option){
      case '1': 
        this.recipe.precioCalculado= (this.recipe.costo/this.theForm.controls['calcular'].value)*100;
        this.recipe.pctCosto= this.theForm.controls['calcular'].value;
        this.pctCalc= true;
        this.precioCalc= false;
        break;
      case '2':
          this.recipe.pctCosto= (this.recipe.costo/this.theForm.controls['calcular'].value)*100;
          this.recipe.precioCalculado= this.theForm.controls['calcular'].value;
          this.pctCalc= false;
          this.precioCalc= true;
        break;
    }
    this.recipe.saveCart("Cart1");
    this.recipeService.updateCart(this.recipe);
    console.log("Receta: ",this.recipe);
  }
  //////// /Formulario //////

  subscribeRecipe(){
    this.recipe.menuID= this.theForm.controls['nombre'].value;
    this.recipe.keywords= JSON.stringify(this.keywords);
    this.recipeService.subscribeCart(this.recipe)
    .subscribe((response: Response) => {
      if(response.status=="ok"){
        this.notificationService.success('Receta creada exitosamente y ligada a elemento de menú');
        /*this.theForm.controls['nombre'].setValue('');
        this.theForm.controls['criterio'].setValue('');
        this.theForm.controls['tipo'].setValue('');
        this.theForm.controls['calcular'].setValue('');
        this.theForm.controls['keys'].setValue('');
        this.recipe.deleteCart("Cart1");
        this.recipe= undefined;
        this.recipe= new Recipes;
        this.recipe.createCart("Cart1");
        this.recipeService.updateCart(this.recipe);*/
      }
      if(response.status=="error"){
        this.notificationService.error('No se ha podido crear la receta');
      }
  });
  }

  validate(){
    this.subscribeRecipe();
  }

}
