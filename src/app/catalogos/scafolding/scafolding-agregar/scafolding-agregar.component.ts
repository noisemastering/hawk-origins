///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';               //
import { FormGroup, FormControl, ReactiveFormsModule,                                   //
        FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';             //
import {                                                                                //
  MatDialogRef,                                                                         //
  MatAutocompleteSelectedEvent,                                                         //
  MatAutocomplete                                                                       //
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
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';

@Component({
  selector: 'app-scafolding-agregar',
  templateUrl: './scafolding-agregar.component.html',
  styleUrls: ['./scafolding-agregar.component.scss'],
  providers:[AutocompleteService] //// Importante!!!
})
export class ScafoldingAgregarComponent implements OnInit {

///////////// Variables

///////////////////// No mover !!! ///////////////////////////////////
  theForm: FormGroup;                                       //
  submitted= false;                                                 //
  items= <any>[];                                                   //
  keyws= <any>[];                                                   //
  spinner: SpinnerComponent= new SpinnerComponent;                  //
  working: boolean= false;                                          //
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
  title: string="Agregar Almacén";
  private almacen: Almacen;
  locaciones: Locacion[];
  ///// Adaptar al objeto correspondiente

  constructor(
    private formBuilder: FormBuilder, // No Mover!!!
    private autocompleteService: AutocompleteService, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private duplicateService: DuplicatesService, // No Mover!!!
    private theService: CatalogosService, // Adaptar al objeto correspondiente
    public dRef: MatDialogRef<ScafoldingAgregarComponent> // Adaptar al objeto correspondiente
  ) { }
  ngOnInit() {}
/*
  ngOnInit() {

    this.spinner.message="Cargando";
    
    //Adaptar según el modelo correspondiente
    this.theForm = this.formBuilder.group({
      descripcion: ['', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(24)])],
      keys: [''],
      notas: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(160)])],
      items: this.formBuilder.array([ this.createItem() ]) //Usar si es formulario dinámico, de lo contrario, borrar
    });
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
      this.addRecord();
    }
  }

  /////////// /Formularios

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

  // Adaptar al modelo correspondiente
  addRecord(): void {
    //Si no funciona, hay que inicializarlo a pie
    this.almacen = new Almacen();
    this.almacen.AlmacenID= 0;
    this.almacen.Nombre=  this.theForm.controls['descripcion'].value;
    this.almacen.Notas=  this.theForm.controls['notas'].value;
    this.almacen.Keywords=  JSON.stringify(this.keywords);
    this.almacen.Nivel= 0;
    this.almacen.Modificado=  "";
    this.almacen.Modifico= 0;
    this.almacen.Creado=  "";
    this.almacen.Creo= 0;

    /////// Esto aplica solamente para cuando hay partes dinámicas en el formulario
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
    //console.log("Almacen a agregar: ", this.almacen);

  this.theService.addRecord(this.almacen)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Almacén creado');
        }
        if(response.status=="error"){
          this.notificationService.error('Error, el almacén no pudo ser creado');
        }
    });
  
  this.onClose();
  }*/
}
