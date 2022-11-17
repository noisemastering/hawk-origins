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
import { Localidad } from 'src/app/shared/classes/localidad';

@Component({
  selector: 'app-editar-localidad',
  templateUrl: './editar-localidad.component.html',
  styleUrls: ['./editar-localidad.component.scss'],
  providers:[AutocompleteService]
})
export class EditarLocalidadComponent implements OnInit {

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
  public theID: string;                                               //
  permission: boolean;                                                //
  /////////////////// /No mover !!! ////////////////////////////////////

  private localidad: Localidad;// Adaptar según modelo correspondiente
  title: string="Editar Localidad";

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private autocompleteService: AutocompleteService,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private duplicateService: DuplicatesService,  //No mover!!!
    public dRef: MatDialogRef<EditarLocalidadComponent>, // Adaptar según modelo correspondiente
    private theService: CatalogosService // Adaptar según modelo correspondienteya lo 
    ) { 
      this.theID= data.theID; console.log('ID: '+this.theID);
    }

  ngOnInit() {

    this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
        itemID: [''],
        descripcion: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(24)])],
        keys: [''],
        notas: [''],
        fechaCreacion: [''],
        usuarioCreacion: [''],
        ultimaModificacion: [''],
        usuarioModificacion: [''],
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
        if(this.localidad.Descripcion!=this.theForm.controls['descripcion'].value){
          this.duplicateService.checkForDuplicates("duplicate", "Descripcion", "Localidades", this.theForm.controls['descripcion'].value, "Descripcion")
            .subscribe((response: SimpleResponse) => {
              if(response.value=="Duplicate"){
                this.theForm.controls['descripcion'].setErrors({'duplicate': true});
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
    //////// Adaptar al objeto correspondiente
    this.localidad= new Localidad;
    this.localidad.ID= this.theID;
    this.theService.serviceURL= this.localidad.serviceURL;
    this.theService.getDetail(this.localidad)
      .subscribe((response: Response )=>{
        this.localidad= <Localidad>response.object; 
        //console.log('Detail: ', this.localidad);
    //////// /Adaptar al objeto correspondiente    
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.localidad.ID);
        this.theForm.controls['descripcion'].setValue(this.localidad.Descripcion);
        this.theForm.controls['notas'].setValue(this.localidad.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.localidad.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.localidad.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.localidad.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.localidad.crUsuario);
        this.keyws= this.localidad.Keywords;
        
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
    this.localidad.ID=  this.theForm.controls['itemID'].value;
    this.localidad.Descripcion=  this.theForm.controls['descripcion'].value;
    this.localidad.Keywords=  JSON.stringify(this.keywords);
    this.localidad.Notas=  this.theForm.controls['comentarios'].value;

  this.theService.editRecord(this.localidad)
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
