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
import { Cliente } from 'src/app/shared/classes/cliente';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss'],
  providers:[AutocompleteService] //// Importante!!!
})
export class AgregarClienteComponent implements OnInit {

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
  title: string="Agregar Cliente";
  private cliente: Cliente;
  currentShift="M";
  ///// Adaptar al objeto correspondiente

  constructor(
    private formBuilder: FormBuilder, // No Mover!!!
    private autocompleteService: AutocompleteService, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private duplicateService: DuplicatesService, // No Mover!!!
    private theService: CatalogosService, // Adaptar al objeto correspondiente
    public dRef: MatDialogRef<AgregarClienteComponent> // Adaptar al objeto correspondiente
  ) { }

  ngOnInit() {

    this.spinner.message="Cargando";
    
    //Adaptar según el modelo correspondiente
    this.theForm = this.formBuilder.group({
          descripcion: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(24)])],
          direccion1: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
          direccion2: ['', Validators.compose([Validators.minLength(6)])],
          direccion3: ['', Validators.compose([Validators.minLength(6)])],
          telefonos: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10)])],
          delegacionMunicipio: ['', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(24)])],
          ciudad: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(24)])],
          estado: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(24)])],
          cp: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(5)])],
          turno: [''],
          notas: ['', Validators.compose([Validators.minLength(6),Validators.maxLength(160)])],
          keys: ['', Validators.compose([Validators.required])],
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
        this.duplicateService.checkForDuplicates("duplicate", "Descripcion", "Clientes", this.theForm.controls['descripcion'].value, "Descripcion")
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
    this.cliente = new Cliente();
    this.cliente.ID= '';
    this.cliente.Descripcion=  this.theForm.controls['descripcion'].value;
    this.cliente.Direccion1=  this.theForm.controls['direccion1'].value;
    this.cliente.Direccion2=  this.theForm.controls['direccion2'].value;
    this.cliente.Direccion3=  this.theForm.controls['direccion3'].value;
    this.cliente.Telefonos=  this.theForm.controls['telefonos'].value;
    this.cliente.DelegacionMunicipio=  this.theForm.controls['delegacionMunicipio'].value;
    this.cliente.Ciudad=  this.theForm.controls['ciudad'].value;
    this.cliente.Estado=  this.theForm.controls['estado'].value;
    this.cliente.CP=  this.theForm.controls['cp'].value;
    this.cliente.Turno=  this.theForm.controls['turno'].value;
    this.cliente.Notas=  this.theForm.controls['notas'].value;
    this.cliente.Keywords=  JSON.stringify(this.keywords);

  this.theService.addRecord(this.cliente)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Cliente creado');
        }
        if(response.status=="error"){
          this.notificationService.error('Error, el cliente no pudo ser creado');
        }
    });

  this.onClose();
  }

}
