///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import {                                                                                //  
  Component, OnInit,                                                                    //
  ViewChild, ElementRef, Inject                                                         //  
} from '@angular/core';                                                                 //
import {                                                                                //
  FormGroup,                                                                            //
  FormControl,                                                                          //
  ReactiveFormsModule,                                                                  //
  FormBuilder,                                                                          //
  Validators,                                                                           //
  NgForm,                                                                               //
  FormArray                                                                             //
} from '@angular/forms';                                                                //
import {                                                                                //
  MatDialogRef,                                                                         //
  MatButton,                                                                            //
  MatAutocompleteSelectedEvent,                                                         //
  MatAutocomplete,                                                                      //
  MAT_DIALOG_DATA,                                                                      //
  MatChipInputEvent                                                                     //
} from '@angular/material';                                                             //
import { Observable, of } from 'rxjs';                                                  //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   //
//                                                                                      //
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';           //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { DuplicatesService } from 'src/app/servicios/duplicates.service';               //
import { Response } from 'src/app/shared/classes/response';                             //
import { SimpleResponse } from 'src/app/shared/classes/simple-response';                //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { CatalogosService } from 'src/app/servicios/catalogos.service'                  //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';


@Component({
  selector: 'app-scafolding-editar',
  templateUrl: './scafolding-editar.component.html',
  styleUrls: ['./scafolding-editar.component.scss'],
  providers:[AutocompleteService]
})
export class ScafoldingEditarComponent implements OnInit {

  /////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                         //
  submitted= false;                                                   //
  items= <any>[];                                                     //
  keyws= <any>[];                                                     //
  spinner: SpinnerComponent= new SpinnerComponent;                    //
  working: boolean= false;                                            //
  //MatChip                                                           //
  visible: boolean = true;                                            //
  selectable: boolean = true;                                         //
  removable: boolean = true;                                          //
  addOnBlur: boolean = true;                                          //
  keywords = [];                                                      //
  separatorKeysCodes = [ENTER, COMMA];                                //
  @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;    //
  @ViewChild('autoKW') matAutocompleteKW: MatAutocomplete;            //
  public theID: number;                                               //
  permission: boolean;                                                //
  /////////////////// /No mover !!! ////////////////////////////////////

  private almacen: Almacen;// Adaptar según modelo correspondiente
  title: string="Editar";

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private autocompleteService: AutocompleteService,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private duplicateService: DuplicatesService,  //No mover!!!
    public dRef: MatDialogRef<ScafoldingEditarComponent>, // Adaptar según modelo correspondiente
    private theService: CatalogosService // Adaptar según modelo correspondienteya lo 
    ) { 
      this.theID= data.theID; console.log('ID: '+this.theID);
    }
    ngOnInit() {}

    get f() { return this.theForm.controls; } // Mo mover!!!
/*
  ngOnInit() {

    this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
        itemID: [''],
        descripcion: [''],
        keys: [''],
        notas: [''],
        fechaCreacion: [''],
        usuarioCreacion: [''],
        ultimaModificacion: [''],
        usuarioModificacion: [''],
        items: this.formBuilder.array([])
    });
    /////////////// No mover!!! ////////////
    this.theForm.controls['keys'].valueChanges.subscribe(
      term => { console.log('entro')
        if (term != '') {
          this.autocompleteService.searchKW(term).subscribe(
            data => {
              this.keyws = data as any[];
              console.log(data[0].Name);
          })
        }
    });  
    this.working=false;
    /////////////// /No mover!!! ////////////

    /////////// Traemos datos
    this.getRecord();// No mover!!!

    //////// Pre cargas necesarias
    //////// /Pre cargas necesarias

  }

  ////// Funciones

  ////// Formularios y validaciones

  get f() { return this.theForm.controls; } // Mo mover!!!


  duplicate(valor: string){ // Adaptar a los campos utilizados

    this.working= true;
    this.duplicateService.url='http://noiseapp.com.mx/hawk/process-proveedor-simple.php';

    switch(valor){
      case 'nombre':
        this.duplicateService.checkForDuplicates("duplicate", "Descripcion", "Almacenes", this.theForm.controls['descripcion'].value, "Descripcion")
        .subscribe((response: SimpleResponse) => {
          if(response.value=="Duplicate"){
            this.theForm.controls['descripcion'].setErrors({'duplicate': true});
          }
          console.log(response);
      });
      break;
      case 'locacion':
        this.duplicateService.checkForDuplicates("duplicate", "RazonSocial", "Almacenes", this.theForm.controls['razon'].value, "RazonSocial")
        .subscribe((response: SimpleResponse) => {
          if(response.value=="Duplicate"){
            this.theForm.controls['razon'].setErrors({'duplicate': true});
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
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.editRecord();
    }
  }

  /////////// /Formularios
  
  ////////// Traer datos
  getRecord(): void {
    //////// Adaptar al objeto correspondiente
    this.almacen= new Almacen;
    this.almacen.AlmacenID= this.theID;
    this.theService.serviceURL= this.almacen.serviceURL;
    this.theService.getDetail(this.almacen)
      .subscribe((response: Response )=>{
        this.almacen= <Almacen>response.object; 
        //console.log('Detail: ', this.almacen);
    //////// /Adaptar al objeto correspondiente    
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.almacen.AlmacenID);
        this.theForm.controls['descripcion'].setValue(this.almacen.Nombre);
        this.theForm.controls['notas'].setValue(this.almacen.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.almacen.Modificado);
        this.theForm.controls['usuarioModificacion'].setValue(this.almacen.Modifico);
        this.theForm.controls['fechaCreacion'].setValue(this.almacen.Creado);
        this.theForm.controls['usuarioCreacion'].setValue(this.almacen.Creo);
        this.keyws= this.almacen.Keywords;
        ////////// Si es necesario un formulario dinámico, de lo contrario, borrar
        let locs: Locacion[];
        locs= JSON.parse(this.almacen.Locaciones) as Locacion[];
        console.log("Locs: ", locs.length);
        for(const control of locs){
          this.addPopulatedItem(control);
        }
        ////////// //Si es necesario un formulario dinámico, de lo contrario, borrar
        //console.log("Locs: ", this.theForm.get('items'));
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }


  ////// Formularios dinámicos, de lo contrario, borrar

  //Adaptar al modelo correspondiente
  createItem(): FormGroup {
    return this.formBuilder.group({
      descripcion: [''],
      notas: ['']
    });
  }
  ////// No mover!!!
  addItem(): void {
    this.items = this.theForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  ////// No mover!!!
  removeItem(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.items.removeAt(index);
  }

  createPopulatedItem(locP: Locacion): FormGroup {
    console.log("Item creado", locP);
    return this.formBuilder.group({
      descripcion: [locP.Descripcion],
      notas: [locP.Notas]
    });
  }

  addPopulatedItem(locP: Locacion): void {
    this.items = this.theForm.get('items') as FormArray;
    this.items.push(this.createPopulatedItem(locP));
  }
  ////// /Formularios dinámicos, de lo contrario, borrar

  ////// Ventanas
  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
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

  //// Envío de datos al servidor

  editRecord(): void {

    ///////// Adaptar según el modelo correspondiente
    this.almacen.AlmacenID=  this.theForm.controls['itemID'].value;
    this.almacen.Nombre=  this.theForm.controls['descripcion'].value;
    this.almacen.Keywords=  JSON.stringify(this.keywords);
    this.almacen.Notas=  this.theForm.controls['comentarios'].value;
    ///////// En caso de haber formulario dinámico, de lo contrario, borrar
    let locs= [];
      for(const control of this.items.controls){
        let loc = new Locacion;
        loc.ID_Almacen= "";
        loc.LineNum= this.items.controls.indexOf(control);
        loc.Descripcion= control.controls['descripcion'].value;
        loc.Notas=control.controls['notas'].value;
        loc.crFecha="";
        loc.crUsuario="";
        loc.uaFecha="";
        loc.uaUsuario="";
        locs.push(loc);
      }
      this.almacen.Locaciones=  JSON.stringify(locs);
    //console.log('Almacen a actualizar:', this.almacen);
    ///////// /En caso de haber formulario dinámico, de lo contrario, borrar

  this.theService.editRecord(this.almacen)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Proveedor actualizado');
        }
        if(response.status=="error"){
          this.notificationService.error('Error, no fue posible actualizar al proveedor');
        }
        //console.log(response);
    });
  
  this.onClose();
  } 
  /* Función para encontrar el campo validador que no deja pasar al formulario
  public findInvalidControls() {
    const invalid = [];
    const controls = this.theForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log('Invalid: '+name);
        }
    }
    
  }
  */
}
