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
import { Proveedor } from 'src/app/shared/classes/proveedor';
import { ZipService } from 'src/app/servicios/zip.service'
import { Zip } from 'src/app/shared/classes/zip';


@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.scss'],
  providers:[AutocompleteService]
})
export class EditarProveedorComponent implements OnInit {

  /////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                         //
  submitted= false;                                                   //
  items= <any>[];                                                     //
  keyws= <any>[];                                                     //
  spinner: SpinnerComponent= new SpinnerComponent;                    //
  working: boolean= true;                                             //
  //MatChip                                                           //
  visible: boolean = true;                                            //
  selectable: boolean = true;                                         //
  removable: boolean = true;                                          //
  addOnBlur: boolean = true;                                          //
  keywords = [];                                                      //
  separatorKeysCodes = [ENTER, COMMA];                                //
  @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;    //
  @ViewChild('autoKW') matAutocompleteKW: MatAutocomplete;            //
  public theID: string;                                               //
  permission: boolean;                                                //
  /////////////////// /No mover !!! ////////////////////////////////////

  proveedor: Proveedor;// Adaptar según modelo correspondiente
  title: string="Editar proveedor";
  zips$: Observable<Zip[]>;
  validateCP: boolean= false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private autocompleteService: AutocompleteService,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private duplicateService: DuplicatesService,  //No mover!!!
    public dRef: MatDialogRef<EditarProveedorComponent>, // Adaptar según modelo correspondiente
    private theService: CatalogosService, // Adaptar según modelo correspondienteya lo 
    private zipService: ZipService, 
    ) { 
      this.theID= data.theID; console.log('ID: '+this.theID);
    }

  ngOnInit() {

    this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
      prov_id: [''],
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
      intCP:[''],
      entrega: [''],
      credito: [''],
      cuentaContable: [''],
      comentarios: [''],
      thumbnail: [''],
      contacto: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
      ultimaModificacion: [''],
      usuarioModificacion: ['']
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
      case 'rfc':
          if(this.theForm.controls['rfc'].value!=this.proveedor.RFC){
            this.duplicateService.checkForDuplicatesUpdate("duplicate", "RFC", "Proveedores", this.theForm.controls['rfc'].value, this.proveedor.ID)
              .subscribe((response: SimpleResponse) => {
                if(response.value=="Duplicate"){
                  this.theForm.controls['rfc'].setErrors({'duplicate': true});
                }
                console.log(response);
            });
          }
        break;
        case 'razon':
          if(this.theForm.controls['razon'].value!=this.proveedor.RazonSocial){
            this.duplicateService.checkForDuplicatesUpdate("duplicate", "RazonSocial", "Proveedores", this.theForm.controls['razon'].value, this.proveedor.ID)
              .subscribe((response: SimpleResponse) => {
                if(response.value=="Duplicate"){
                  this.theForm.controls['razon'].setErrors({'duplicate': true});
                }
                console.log(response);
            });
          }
        break;
        case 'curp':
          if(this.theForm.controls['curp'].value!=this.proveedor.CURP){
            this.duplicateService.checkForDuplicatesUpdate("duplicate", "CURP", "Proveedores", this.theForm.controls['curp'].value, this.proveedor.ID)
              .subscribe((response: SimpleResponse) => {
                if(response.value=="Duplicate"){
                  this.theForm.controls['curp'].setErrors({'duplicate': true});
                }
                console.log(response);
            });
          }
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
    this.proveedor= new Proveedor;
    this.proveedor.ID= this.theID;
    this.theService.serviceURL= this.proveedor.serviceURL;
    this.theService.getDetail(this.proveedor)
      .subscribe((response: Response )=>{
        this.proveedor= <Proveedor>response.object; 
        //console.log('Detail: ', this.almacen);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['prov_id'].setValue(this.proveedor.ID);
        this.theForm.controls['rfc'].setValue(this.proveedor.RFC);
        this.theForm.controls['descripcion'].setValue(this.proveedor.Descripcion);
        this.theForm.controls['razon'].setValue(this.proveedor.RazonSocial);
        this.theForm.controls['curp'].setValue(this.proveedor.CURP);
        this.theForm.controls['calle'].setValue(this.proveedor.Direccion1);
        this.theForm.controls['intCP'].setValue(this.proveedor.Direccion1);
        this.theForm.controls['cp'].setValue(this.proveedor.CP);
        this.theForm.controls['zipID'].setValue(this.proveedor.ZipID);
        this.theForm.controls['telefono'].setValue(this.proveedor.Telefono);
        this.theForm.controls['movil'].setValue(this.proveedor.Celular);
        this.theForm.controls['mail'].setValue(this.proveedor.CorreoElectronico);
        this.theForm.controls['web'].setValue(this.proveedor.PaginaWeb);
        this.theForm.controls['credito'].setValue(this.proveedor.DiasCredito);
        this.theForm.controls['cuentaContable'].setValue(this.proveedor.CuentaContable);
        this.theForm.controls['comentarios'].setValue(this.proveedor.Notas);
        this.theForm.controls['contacto'].setValue(this.proveedor.Contacto);
        this.theForm.controls['ultimaModificacion'].setValue(this.proveedor.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.proveedor.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.proveedor.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.proveedor.crUsuario);
        if(this.proveedor.Keywords!=null){
          this.keywords= this.proveedor.Keywords as any;
          console.log('Keywords origen: '+this.proveedor.Keywords);
          console.log('Keywords destino: '+this.proveedor.Keywords);
        }
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
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

  editRecord(): void {

    ///////// Adaptar según el modelo correspondiente
    this.proveedor.RFC=  this.theForm.controls['rfc'].value;
      this.proveedor.Descripcion=  this.theForm.controls['descripcion'].value;
      this.proveedor.Keywords=  JSON.stringify(this.keywords);
      this.proveedor.RazonSocial=  this.theForm.controls['razon'].value;
      this.proveedor.CURP=  this.theForm.controls['curp'].value;
      this.proveedor.Direccion1=  this.theForm.controls['calle'].value;
      this.proveedor.CP=  this.theForm.controls['cp'].value;
      if (this.validateCP){ this.proveedor.ZipID=  this.theForm.controls['zipID'].value; }
      this.proveedor.Telefono=  this.theForm.controls['telefono'].value;
      this.proveedor.Celular=  this.theForm.controls['movil'].value;
      this.proveedor.CorreoElectronico=  this.theForm.controls['mail'].value;
      this.proveedor.PaginaWeb=  this.theForm.controls['web'].value;
      this.proveedor.DiasCredito=  this.theForm.controls['credito'].value;
      this.proveedor.CuentaContable=  this.theForm.controls['cuentaContable'].value;
      this.proveedor.Notas=  this.theForm.controls['comentarios'].value;
      this.proveedor.Contacto=  this.theForm.controls['contacto'].value;
      console.log('Proveedor a actualizar:', this.proveedor);
    
  this.theService.editRecord(this.proveedor)
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
  
  ////////// Funciones específicas de este objeto
  getZips(): void {
    this.working= true;
    this.validateCP= true;
    this.theForm.controls['calle'].setValue('');
    console.log('Durante working: '+ this.working);
    this.zips$=this.zipService.getZip(this.theForm.controls['cp'].value);
    this.working= false;
    console.log('Después working: '+ this.working);
  }
}
