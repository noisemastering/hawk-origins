///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';               //
import { FormGroup, FormControl, ReactiveFormsModule,                                   //
        FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';             //
import {                                                                                //
  MatDialogRef,                                                                         //
  MatAutocompleteSelectedEvent,                                                         //
  MatAutocomplete, MatDialog, MatDialogConfig                                           //
} from '@angular/material';                                                             //       
import { Response } from 'src/app/shared/classes/response';                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { MatChipInputEvent } from '@angular/material';                                  //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   // 
//     Servicios custom                                                                 //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { DuplicatesService } from 'src/app/servicios/duplicates.service';               //  
import { SimpleResponse } from 'src/app/shared/classes/simple-response';                //
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';           //
import { CatalogosService } from 'src/app/servicios/catalogos.service';                 //
import { GenericsService } from 'src/app/servicios/generics.service';                   //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos del catálogo en cuestión (con rutas absolutas)
import { Articulo } from 'src/app/shared/classes/articulo';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { Categoria } from 'src/app/shared/classes/categoria';
import { Subcategoria } from 'src/app/shared/classes/subcategoria'; 

///////////////////// Cargar los componentes auxiliares, que se abrirán en ventana modal (con rutas absolutas)
import { AgregarAlmacenComponent } from 'src/app/catalogos/almacenes/agregar-almacen/agregar-almacen.component';
import { Observable } from 'rxjs';
import { AgregarCategoriaComponent } from 'src/app/catalogos/categorias/agregar-categoria/agregar-categoria.component';
import { AgregarSubcategoriaComponent } from '../../subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { Router } from '@angular/router';
import { GenericList } from 'src/app/shared/classes/generic-list';
import { AgregarUnidadesDeMedidaComponent } from '../../unidades-de-medida/agregar-unidades-de-medida/agregar-unidades-de-medida.component';

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.scss'],
  providers:[AutocompleteService] //// Importante!!!
})
export class AgregarArticuloComponent implements OnInit {

///////////// Variables

///////////////////// No mover !!! ///////////////////////////////////
  theForm: FormGroup;                                       //
  submitted= false;                                                 //
  items= <any>[];                                                   //
  keyws= <any>[];                                                   //
  spinner: SpinnerComponent= new SpinnerComponent;                  //
  working: boolean= true;                                          //
  //MatChip                                                         //
  visible: boolean = true;                                          //
  selectable: boolean = true;                                       //
  removable: boolean = true;                                        //
  addOnBlur: boolean = true;                                        //
  keywords = [];                                                    //
  separatorKeysCodes = [ENTER, COMMA];                              //
  @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;  //
  @ViewChild('autoKW') matAutocompleteKW: MatAutocomplete;          //
/////////////////// /No mover !!! ////////////////////////////////////

///// Adaptar al objeto correspondiente
title: string="Agregar Artículo";
articulo: Articulo;
almacenes: GenericList[];
locaciones$: Observable<any[]>;
categorias: GenericList[];
subcategorias$: Observable<any[]>;
umbs: GenericList[];
umcs: GenericList[];
umvs: GenericList[];
estatus= "1";
periodicidad: any[];
currentUMB: string;
///// Adaptar al objeto correspondiente

constructor(
  private formBuilder: FormBuilder, // No Mover!!!
  private autocompleteService: AutocompleteService, // No Mover!!!
  private notificationService: NotificationsService, // No Mover!!!
  private duplicateService: DuplicatesService, // No Mover!!!
  private theService: CatalogosService, // Adaptar al objeto correspondiente
  private genService: GenericsService,
  private dialog: MatDialog,
  private theRouter: Router, // No mover!!!
) { }

ngOnInit() {

  this.spinner.message="Cargando";
  
  //Adaptar según el modelo correspondiente
  this.theForm = this.formBuilder.group({
    descripcion: ['', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(24)])],
    activo:[''],
    almacen:['', Validators.compose([Validators.required])],
    locacion: ['', Validators.compose([Validators.required])],
    categoria:['', Validators.compose([Validators.required])],
    subcategoria: ['', Validators.compose([Validators.required])],
    sMinimo:['', Validators.compose([Validators.required])],
    sMaximo:['', Validators.compose([Validators.required])],
    umb:['', Validators.compose([Validators.required])],
    umc:['', Validators.compose([Validators.required])],
    umv:['', Validators.compose([Validators.required])],
    costo:['', Validators.compose([Validators.required])],
    iva:[''],
    ieps:[''],
    cuentaContable:[''],
    conteos: this.formBuilder.array([]),
    diario:[''],
    semanal:[''],
    quincenal:[''],
    mensual:[''],
    bimestral:[''],
    trimestral:[''],
    semestral:[''],
    anual:[''],
    keys: [''],
    notas: ['']
  });

  this.getLists();

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
  
  //////// Pre cargas necesarias
  //////// /Pre cargas necesarias

  this.working=false;

}

////// Funciones

//////// Inicialización, llenado de dropdowns
getLists(){
  //Traemos lista de almacenes
  this.genService.serviceURL= "http://noiseapp.com.mx/hawk/process-generic.php";
  this.genService.getDropDown("Almacenes")
  .subscribe(
    (res: Response) => {
      console.log("Response: ",res);
      this.almacenes= res.object;
    }
  );
  this.genService.getDropDown("Articulos_Categorias")
  .subscribe(
    (res: Response) => {
      console.log("Response: ",res);
      this.categorias= res.object;
    }
  );
  this.genService.getDropDown("UM")
  .subscribe(
    (res: Response) => {
      console.log("Response: ",res);
      this.umbs= res.object;
      this.umcs= res.object;
      this.umvs= res.object;
    }
  );
}
getList(option: string){
  //Traemos lista de almacenes
  this.genService.serviceURL= "http://noiseapp.com.mx/hawk/process-generic.php";
  switch(option){
    
    case "almacenes":
      this.genService.getDropDown("Almacenes")
      .subscribe(
        (res: Response) => {
          console.log("Response: ",res);
          this.almacenes= res.object;
        }
      );
      break;
    case "categorias":
      this.genService.getDropDown("Articulos_Categorias")
      .subscribe(
        (res: Response) => {
          console.log("Response: ",res);
          this.categorias= res.object;
        }
      );
      break;
    case "UM":
      this.genService.getDropDown("UM")
      .subscribe(
        (res: Response) => {
          console.log("Response: ",res);
          this.umbs= res.object;
          this.umcs= res.object;
          this.umvs= res.object;
        }
      );
      break;  
  }
}
/////// /Inicialización

/////// Dropdowns async
updateDrop(option: string, val: any){
  console.log("Entro update drop");
  //Traemos lista de almacenes
  this.genService.serviceURL= "http://noiseapp.com.mx/hawk/process-generic.php";
  switch (option){
    case "locaciones":
      this.locaciones$=this.genService.getDropDownLoc("Almacenes_Locaciones", val, "ID_Almacen");
      break;
    case "subcategorias":
      this.subcategorias$=this.genService.getDropDownID("Articulos_Subcategorias", val, "ID_Categoria");
      break;
  }
}

selectedU(event) {
  let target = event.source.selected._element.nativeElement;
  let selectedData = {
    value: event.value,
    text: target.innerText.trim()
  };
  this.currentUMB= selectedData.text;
  //console.log("Selected: ",selectedData);
}
////// /Dropdowns async

////// Formularios y validaciones

get f() { return this.theForm.controls; } // Mo mover!!!


duplicate(valor: string){ // Adaptar a los campos utilizados

  this.working= true;
  this.duplicateService.url='http://noiseapp.com.mx/hawk/process-proveedor-simple.php';

  switch(valor){
    case 'nombre':
      this.duplicateService.checkForDuplicates("duplicate", "Descripcion", "Articulos", this.theForm.controls['descripcion'].value, "Descripcion")
      .subscribe((response: SimpleResponse) => {
        if(response.value=="Duplicate"){
          this.theForm.controls['descripcion'].setErrors({'duplicate': true});
        }
        console.log(response);
    });
    break;
  }

  this.working= false;
  
}

resetForm(){ // No mover
  console.log('Form reset');
  this.theForm.reset();
}

validate() { // No mover
  //Si no funciona, hay que inicializarlo a pie
  let diario= (this.theForm.controls['diario'].value===true) ? 1:0;
  let semanal= (this.theForm.controls['semanal'].value===true) ? 1:0;
  let quincenal= (this.theForm.controls['quincenal'].value===true) ? 1:0;
  let mensual= (this.theForm.controls['mensual'].value===true) ? 1:0;
  let bimestral= (this.theForm.controls['bimestral'].value===true) ? 1:0;
  let trimestral= (this.theForm.controls['trimestral'].value===true) ? 1:0;
  let semestral= (this.theForm.controls['semestral'].value===true) ? 1:0;
  let anual= (this.theForm.controls['anual'].value===true) ? 1:0;
  
  this.periodicidad=[
    { periodo: 'diario', valor: diario },
    { periodo: 'semanal', valor: semanal },
    { periodo: 'quincenal', valor: quincenal },
    { periodo: 'mensual', valor: mensual },
    { periodo: 'bimestral', valor: bimestral },
    { periodo: 'trimestral', valor: trimestral },
    { periodo: 'semestral', valor: semestral },
    { periodo: 'anual', valor: anual }
  ];
  console.log("Periodicidad",JSON.stringify(this.periodicidad));
  this.submitted = true;
  //console.log("Periodicidad",JSON.stringify(this.periodicidad));
  // stop here if form is invalid
  if (this.theForm.invalid) {
    //this.findInvalidControls();
    console.log('Form invalid');
    return;
  }else{
    //console.log('Form is valid');
    //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
    this.addRecord();
  }
}

/////////// /Formularios

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
  //console.log("Entró: "+this.keywords);
  //console.log("Keyword: "+keyword);
  let index = this.keywords.indexOf(keyword);

  if (index >= 0) {
    this.keywords.splice(index, 1);
  }
  //console.log("Terminó: "+this.keywords);
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.theForm.controls['keys'].setValue(null);
  this.keywords.push(event.option.viewValue.trim());
  this.keysInput.nativeElement.value = '';
}
////////// /Keywords

//// Envío de datos al servidor

// Adaptar al modelo correspondiente
addRecord(): void {
  //Si no funciona, hay que inicializarlo a pie
  let diario= (this.theForm.controls['diario'].value===true) ? 1:0;
  let semanal= (this.theForm.controls['semanal'].value===true) ? 1:0;
  let quincenal= (this.theForm.controls['quincenal'].value===true) ? 1:0;
  let mensual= (this.theForm.controls['mensual'].value===true) ? 1:0;
  let bimestral= (this.theForm.controls['bimestral'].value===true) ? 1:0;
  let trimestral= (this.theForm.controls['trimestral'].value===true) ? 1:0;
  let semestral= (this.theForm.controls['semestral'].value===true) ? 1:0;
  let anual= (this.theForm.controls['anual'].value===true) ? 1:0;
  
  this.periodicidad=[
    { periodo: 'diario', valor: diario },
    { periodo: 'semanal', valor: semanal },
    { periodo: 'quincenal', valor: quincenal },
    { periodo: 'mensual', valor: mensual },
    { periodo: 'bimestral', valor: bimestral },
    { periodo: 'trimestral', valor: trimestral },
    { periodo: 'semestral', valor: semestral },
    { periodo: 'anual', valor: anual }
  ];
  this.articulo = new Articulo();
  this.theService.serviceURL= this.articulo.serviceURL;
  this.articulo.ID= '';
  this.articulo.Descripcion= this.theForm.controls['descripcion'].value;
  this.articulo.Activo= this.theForm.controls['activo'].value;
	this.articulo.ID_Almacen= this.theForm.controls['almacen'].value;
	this.articulo.Locacion= this.theForm.controls['locacion'].value;
	this.articulo.ID_Categoria= this.theForm.controls['categoria'].value;
	this.articulo.ID_Subcategoria= this.theForm.controls['descripcion'].value;
	this.articulo.ID_Moneda= '';
	this.articulo.ID_UMCompra= this.theForm.controls['umc'].value;
	this.articulo.ID_UMBase= this.theForm.controls['umb'].value;
	this.articulo.ID_UMVenta= this.theForm.controls['umv'].value;
	this.articulo.StockMinimo= this.theForm.controls['sMinimo'].value;
	this.articulo.StockMaximo= this.theForm.controls['sMaximo'].value;
	this.articulo.Costo= this.theForm.controls['costo'].value;
	this.articulo.UltimoCosto= 0;
	this.articulo.UltimaEntrada= '';
	this.articulo.UltimaSalida= '';
	this.articulo.Existencias= 0;
	this.articulo.ExistenciasFisicas= 0;
	this.articulo.Aloha= '';
	this.articulo.PeriodicidadConteo= JSON.stringify(this.periodicidad);
	this.articulo.PorcentajeIVA= this.theForm.controls['iva'].value;
	this.articulo.PorcentajeIEPS= this.theForm.controls['ieps'].value;
	this.articulo.CostoAdicional= 0;
	this.articulo.Flete= 0;
	this.articulo.CuentaContable= this.theForm.controls['cuentaContable'].value;
	this.articulo.CodigoBarras= '';
	this.articulo.TipoAP= this.theForm.controls['descripcion'].value;
  this.articulo.ID_MenuItem= '';
  this.articulo.TipoAP='A';
  this.articulo.Notas= this.theForm.controls['notas'].value;
  this.articulo.Keywords= JSON.stringify(this.keywords);
  this.articulo.uaFecha= '';
  this.articulo.uaUsuario= '';
  this.articulo.crFecha= '';
  this.articulo.crUsuario= '';

this.theService.addRecord(this.articulo)
    .subscribe((response: Response) => {
      if(response.status=="ok"){
        this.notificationService.success('Artículo creado');
        this.theRouter.navigateByUrl('/hawk/catalogos/articulos');
      }
    },
    err => {
      this.notificationService.error('Error, el almacén no pudo ser creado');
    }
  );

}
///////// Ventanas de objetos auxiliares /////////
  ///////// Adaptar los nombres de los componentes
  createAlmacen(){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    this.dialog.open(AgregarAlmacenComponent, dc).afterClosed().subscribe(result => {
      this.getList("almacenes");
    });
  }
  ///////// Adaptar los nombres de los componentes
  createCategoria(){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    this.dialog.open(AgregarCategoriaComponent, dc).afterClosed().subscribe(result => {
      this.getList("categorias");
    });
  }
  ///////// Adaptar los nombres de los componentes
  createSubcategoria(){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    this.dialog.open(AgregarSubcategoriaComponent, dc).afterClosed().subscribe(result => {
      this.getList("subcategorias");
    });
  }

  ///////// Adaptar los nombres de los componentes
  createUM(){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    this.dialog.open(AgregarUnidadesDeMedidaComponent, dc).afterClosed().subscribe(result => {
      this.getList("UM");
    });
  }

  onClose(){
    this.theRouter.navigateByUrl('/hawk/catalogos/articulos');
  }

  //Función para encontrar el campo validador que no deja pasar al formulario
  public findInvalidControls() {
    const invalid = [];
    const controls = this.theForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log('Invalid: '+name);
        }
    }
     
  }
   
}
