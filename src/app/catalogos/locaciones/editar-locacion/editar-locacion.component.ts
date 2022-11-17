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
import { SimpleResponse } from 'src/app/shared/classes/simple-response';                //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { LocacionesService } from '../locaciones.service';                              //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { Usuario } from 'src/app/shared/classes/usuario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-locacion',
  templateUrl: './editar-locacion.component.html',
  styleUrls: ['./editar-locacion.component.scss'],
  providers:[AutocompleteService]
})
export class EditarLocacionComponent implements OnInit {

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
  permission: boolean;       
  public usuario: Usuario;                                         //
  /////////////////// /No mover !!! ////////////////////////////////////
  
  private almacen: Almacen;// Adaptar según modelo correspondiente
  private locacion: Locacion;// Adaptar según modelo correspondiente
  title: string="Editar Locación";
  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private autocompleteService: AutocompleteService,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private duplicateService: DuplicatesService,  //No mover!!!
    public dRef: MatDialogRef<EditarLocacionComponent>, // Adaptar según modelo correspondiente
    private theService: LocacionesService, // Adaptar según modelo correspondienteya lo 
    public datepipe: DatePipe
  ) { 
    this.theID= data.theID; console.log('ID: '+this.theID);
  }

  ngOnInit() {

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
      almacen: [''],
      descripcion: [''],
      keys: [''],
      notas: [''],
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
  this.usuario= JSON.parse(localStorage.getItem('user')) as Usuario;
  this.getRecord();// No mover!!!
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

  duplicate(valor: string){ // Adaptar a los campos utilizados

    this.theService.checkForDuplicate(this.theForm.controls.descripcion.value)
      .subscribe(
        (res: any) => {
          if(res.Code==100){
            this.theForm.controls.descripcion.setErrors({'duplicate': false});
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
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.editRecord();
    }
  }

  ////////// Traer datos
  getRecord(): void {
    this.locacion= new Locacion;
    this.locacion.LocacionID= this.theID
    this.theService.getDetail(this.locacion.LocacionID)
      .subscribe((response )=>{
        this.locacion= new Locacion;
        this.locacion = response as Locacion;
        this.almacen= response.NAAlmacen as Almacen; 
        console.log('Locación a editar: ', this.locacion);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['almacen'].setValue(this.almacen.Nombre);
        this.theForm.controls['descripcion'].setValue(this.locacion.Nombre);
        this.theForm.controls['notas'].setValue(this.locacion.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.locacion.Modificado);
        this.theForm.controls['usuarioModificacion'].setValue(this.locacion.Modifico);
        this.theForm.controls['fechaCreacion'].setValue(response.Creado);
        this.theForm.controls['usuarioCreacion'].setValue(response.Creo);
        this.keyws=JSON.parse(this.locacion.Keywords);        
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
    this.locacion.Nombre=  this.theForm.controls['descripcion'].value;
    this.locacion.Keywords=  JSON.stringify(this.keywords);
    this.locacion.Notas=  this.theForm.controls['notas'].value;
    let date= Date.now();
    this.locacion.Modificado= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.locacion.Modifico= 6;
    console.log("Locación a editar: ", this.locacion);

    this.theService.editRecord(this.locacion)
      .subscribe(
        (response: Response) => {
        this.notificationService.success('Locación actualizada');
        console.log(response);
        },
        err => {
          this.notificationService.error("Error: "+ err);
        }
      );
  
  this.onClose();
  } 
}
