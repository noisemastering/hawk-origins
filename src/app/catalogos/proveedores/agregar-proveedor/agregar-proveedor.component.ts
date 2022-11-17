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
import { Proveedor } from 'src/app/shared/classes/proveedor';
import { ZipService } from 'src/app/servicios/zip.service'
import { Zip } from 'src/app/shared/classes/zip';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.scss'],
  providers:[AutocompleteService]
})
export class AgregarProveedorComponent implements OnInit {

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
  title: string="Agregar Proveedor";
  proveedor: Proveedor;
  zips$: Observable<Zip[]>;
  ///// Adaptar al objeto correspondiente

  constructor(
    private formBuilder: FormBuilder, // No Mover!!!
    private autocompleteService: AutocompleteService, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private duplicateService: DuplicatesService, // No Mover!!!
    private theService: CatalogosService, // Adaptar al objeto correspondiente
    private zipService: ZipService, 
    public dRef: MatDialogRef<AgregarProveedorComponent> // Adaptar al objeto correspondiente
  ) { }

  ngOnInit() {

    this.spinner.message="Cargando";
    
    this.theForm = this.formBuilder.group({
      descripcion: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(160)])],
      keys: [''],
      razon: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      rfc: ['', Validators.compose([Validators.required,Validators.minLength(12),Validators.maxLength(13)])],
      curp: ['', Validators.compose([Validators.minLength(18),Validators.maxLength(18)])],
      calle: ['', Validators.required],
      cp: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(5)])],
      zipID: ['', Validators.required],
      telefono: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      movil: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      mail: ['', Validators.compose([Validators.required, Validators.email])],
      web: [''],
      entrega: [''],
      credito: [''],
      cuentaContable: [''],
      comentarios: [''],
      thumbnail: [''],
      contacto: ['']
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
        this.duplicateService.checkForDuplicates("duplicate", "Descripcion", "Proveedores", this.theForm.controls['descripcion'].value, "Descripcion")
        .subscribe((response: SimpleResponse) => {
          if(response.value=="Duplicate"){
            this.theForm.controls['descripcion'].setErrors({'duplicate': true});
          }
          console.log(response);
      });
      break;
      case 'razon':
        this.duplicateService.checkForDuplicates("duplicate", "RazonSocial", "Proveedores", this.theForm.controls['razon'].value, "RazonSocial")
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
    this.proveedor = new Proveedor();
    this.proveedor.ID= '';
    this.proveedor.RFC=  this.theForm.controls['rfc'].value;
    this.proveedor.Descripcion=  this.theForm.controls['descripcion'].value;
    this.proveedor.Keywords=  JSON.stringify(this.keywords);
    this.proveedor.RazonSocial=  this.theForm.controls['razon'].value;
    this.proveedor.CURP=  this.theForm.controls['curp'].value;
    this.proveedor.Direccion1=  this.theForm.controls['calle'].value;
    this.proveedor.CP=  this.theForm.controls['cp'].value;
    this.proveedor.ZipID=  this.theForm.controls['zipID'].value;
    this.proveedor.Telefono=  this.theForm.controls['telefono'].value;
    this.proveedor.Celular=  this.theForm.controls['movil'].value;
    this.proveedor.CorreoElectronico=  this.theForm.controls['mail'].value;
    this.proveedor.PaginaWeb=  this.theForm.controls['web'].value;
    this.proveedor.DiasCredito=  this.theForm.controls['credito'].value;
    this.proveedor.CuentaContable=  this.theForm.controls['cuentaContable'].value;
    this.proveedor.Notas=  this.theForm.controls['comentarios'].value;
    this.proveedor.Contacto=  this.theForm.controls['contacto'].value;
    this.proveedor.uaFecha=  "";
    this.proveedor.uaUsuario= "";
    this.proveedor.crFecha=  "";
    this.proveedor.crUsuario= "";
    

  this.theService.addRecord(this.proveedor)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Proveedor creado');
        }
        if(response.status=="error"){
          this.notificationService.error('Error, el proveedor no pudo ser creado');
        }
    });
  
  this.onClose();
  }

  ////// Otras funciones
  getZips(): void {
    this.working= true;
    console.log('Durante working: '+ this.working);
    this.zips$=this.zipService.getZip(this.theForm.controls['cp'].value);
    this.working= false;
    console.log('Después working: '+ this.working);
  }
}
