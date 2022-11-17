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
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';           //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { DuplicatesService } from 'src/app/servicios/duplicates.service';               //
import { Response } from 'src/app/shared/classes/response';                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { AlmacenesService } from '../almacenes.service';                                //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';


@Component({
  selector: 'app-editar-almacen',
  templateUrl: './editar-almacen.component.html',
  styleUrls: ['./editar-almacen.component.scss'],
  providers:[AutocompleteService]
})
export class EditarAlmacenComponent implements OnInit {

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
  public theID: number;                                               //
  permission: boolean;                                                //
  /////////////////// /No mover !!! ////////////////////////////////////

  private almacen: Almacen;// Adaptar según modelo correspondiente
  title: string="Editar Almacén";

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private autocompleteService: AutocompleteService,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private duplicateService: DuplicatesService,  //No mover!!!
    public dRef: MatDialogRef<EditarAlmacenComponent>, // Adaptar según modelo correspondiente
    private theService: AlmacenesService // Adaptar según modelo correspondienteya lo 
    ) { 
      this.theID= data.theID; console.log('ID: '+this.theID);
    }

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

    this.theService.checkForDuplicate(this.theForm.controls.descripcion.value)
      .subscribe(
        (res: any) => {
          console.log("Duplicate",res);
          if(res.Code==100){
            this.theForm.controls.descripcion.setErrors({'duplicate': false});
            this.theForm.controls.descripcion.updateValueAndValidity();
          }else{
            this.theForm.controls.descripcion.setErrors({'duplicate': true});
          }
        }
      );
    
  }

  resetForm(){ // No mover
    console.log('Form reset');
    this.theForm.reset();
  }

  validate() { // No mover
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      this.findInvalidControls();
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
    this.almacen= new Almacen;
    this.almacen.AlmacenID= this.theID
    this.theService.getDetailNA(this.almacen.AlmacenID)
      .subscribe((response )=>{
        this.almacen= response as Almacen; 
        console.log('Detail: ', response);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(response.AlmacenID);
        this.theForm.controls['descripcion'].setValue(response.Nombre);
        this.theForm.controls['notas'].setValue(response.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(response.Modificado);
        this.theForm.controls['usuarioModificacion'].setValue(response.Modifico);
        this.theForm.controls['fechaCreacion'].setValue(response.Creado);
        this.theForm.controls['usuarioCreacion'].setValue(response.Creo);
        this.keyws= this.almacen.Keywords;
        ////////// Si es necesario un formulario dinámico, de lo contrario, borrar
        
        let locs: Locacion[];
        locs= response.NALocaciones as Locacion[];
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
    console.log("Item creado", locP.Nombre);
    return this.formBuilder.group({
      descripcion: [locP.Nombre]
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
    this.almacen.Keywords=  "";//JSON.stringify(this.keywords);
    this.almacen.Notas=  this.theForm.controls['notas'].value;
    this.almacen.Locaciones= [];
    console.log("Almacén a editar: ", this.almacen);

  this.theService.editRecord(this.almacen)
      .subscribe(
        (response: Response) => {
        this.notificationService.success('Almacén actualizado');
        console.log(response);
        },
        err => {
          this.notificationService.error("Error: "+ err);
        }
      );
  
  this.onClose();
  } 
  // Función para encontrar el campo validador que no deja pasar al formulario
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