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
import { AlmacenesService } from '../../almacenes/almacenes.service';                                //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { CentroConsumo } from 'src/app/shared/classes/centro-consumo';
import { LocacionesService } from '../../locaciones/locaciones.service';
import { CentroConsumoService } from '../centro-consumo.service';
import { Usuario } from 'src/app/shared/classes/usuario';
import { DatePipe } from '@angular/common';
import { NALocacionesCentrosConsumo } from 'src/app/shared/classes/locaciones-centros-consumo';


@Component({
  selector: 'app-editar-centro-consumo',
  templateUrl: './editar-centro-consumo.component.html',
  styleUrls: ['./editar-centro-consumo.component.scss'],
  providers: [AutocompleteService]
})
export class EditarCentroConsumoComponent implements OnInit {


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
  public almacenes: Almacen[];
  public locaciones$: Locacion[];
  //public locacionesRelacionadas: Locacion[];
  public locacionesRelacionadas: NALocacionesCentrosConsumo[];
  public centro: CentroConsumo;
  public currentUser: Usuario;
  //public locRel: Locacion;
  public locRel: NALocacionesCentrosConsumo;
  public hayLocaciones: boolean = false;
  public locacionesExistentes: Locacion[];
  /////////////////// /No mover !!! ////////////////////////////////////

  title: string="Editar Centro de Consumo";

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private autocompleteService: AutocompleteService,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private duplicateService: DuplicatesService,  //No mover!!!
    public dRef: MatDialogRef<EditarCentroConsumoComponent>, // Adaptar según modelo correspondiente
    private almacenesService: AlmacenesService,
    private locacionesService: LocacionesService, // Adaptar según modelo correspondienteya lo 
    private theService: CentroConsumoService,
    private datepipe: DatePipe
    ) { 
      this.theID= data.theID; console.log('ID: '+this.theID);
    }

  ngOnInit() {

    this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
        itemID: [''],
        descripcion: [''],
        notas: [''],
        tpv: [''],
        //keys: [''],
        almacenesSelect:[''],
        locacionesSelect:[''],
        fechaCreacion: [''],
        usuarioCreacion: [''],
        ultimaModificacion: [''],
        usuarioModificacion: [''],
        
    });
    let usr= JSON.parse(localStorage.getItem("user")) as Usuario;
    console.log("Usuario: ", usr);
    //this.currentUser.ID=  usr.ID;
    this.locacionesRelacionadas= [];
    /*///////////// No mover!!! ////////////
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
    /////////////// /No mover!!! ////////////*/

    /////////// Traemos datos
    this.getRecord();// No mover!!!

  }

  ////// Funciones

  ////// Formularios y validaciones

  get f() { return this.theForm.controls; } // Mo mover!!!


  duplicate(valor: string){ // Adaptar a los campos utilizados

    this.theService.checkForDuplicate(this.theForm.controls.descripcion.value, 1, this.centro.CentroConsumoID)
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

    this.almacenesService.getItems()
    .subscribe(
      (response: any) => {
        console.log("Almacenes: ", response);
        this.almacenes= response as Almacen[];
        console.log("Almacenes: ", this.almacenes);
      }
    );

    this.centro= new CentroConsumo;
    this.centro.CentroConsumoID= this.theID
    this.theService.getDetail(this.centro.CentroConsumoID)
      .subscribe((response )=>{
        this.centro= response as CentroConsumo; 
        console.log('Detail: ', response);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(response.CentroConsumoID);
        this.theForm.controls['descripcion'].setValue(response.Descripcion);
        this.theForm.controls['tpv'].setValue(response.ID_PuntoVenta);
        this.theForm.controls['notas'].setValue(response.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(response.Modificado);
        this.theForm.controls['usuarioModificacion'].setValue(response.Modifico);
        this.theForm.controls['fechaCreacion'].setValue(response.Creado);
        this.theForm.controls['usuarioCreacion'].setValue(response.Creo);
        this.centro.Creo= response.Creo;
        this.centro.Creado= response.Creado;
        this.centro.NALocacionesCentros= response.NALocacionesCentros as NALocacionesCentrosConsumo[];
        if(this.centro.NALocacionesCentros.length > 0){
          this.hayLocaciones= true;
          this.locacionesExistentes= [];
          for(const l of this.centro.NALocacionesCentros){
            this.locacionesService.getDetail(l.LocacionID).subscribe(
              (res) => {
                this.locacionesExistentes.push(res as Locacion);
              }
            );
          console.log("Locaciones: ", this.locacionesExistentes);
          }
        }else{
          console.log("No hay locaciones");
        }

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
    this.centro.CentroConsumoID=  this.theForm.controls['itemID'].value;
    this.centro.Descripcion=  this.theForm.controls['descripcion'].value;
    //this.almacen.Keywords=  "";//JSON.stringify(this.keywords);
    this.centro.Notas=  this.theForm.controls['notas'].value;
    this.centro.ID_PuntoVenta=  this.theForm.controls['tpv'].value;
    let date= Date.now();
    this.centro.Modificado=  this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.centro.Modifico= 4;//this.currentUser.ID;
    //this.centro.NALocaciones= this.locacionesRelacionadas;
    if(!this.hayLocaciones){
      this.centro.NALocacionesCentros= this.locacionesRelacionadas;
    }
    console.log("Centro de consumo a editar: ", this.centro);

  this.theService.editRecord(this.centro)
      .subscribe(
        (response: Response) => {
        this.notificationService.success('Centro de consumo actualizado');
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

  updateLocations(){
    //console.log("Entró update locs");
    this.locacionesService.getLocations(this.theForm.controls.almacenesSelect.value)
    .subscribe(
      (response: any) => {
        this.locaciones$= response.NALocaciones as Locacion[];
        console.log("Locaciones", this.locaciones$);
      }
    );
  }

  addLocation(){
    //this.locRel= new Locacion;
    this.locRel= new NALocacionesCentrosConsumo;
    this.locRel.CentroConsumoID= this.theID;
    this.locRel.LocacionID=this.theForm.controls.locacionesSelect.value;
    this.locRel.NALocacion= null;
    this.locacionesRelacionadas.push(this.locRel);
    //this.locRel= this.locaciones$.filter(x => x.LocacionID == this.theForm.controls.locacionesSelect.value)[0];
    console.log("Locación seleccionada: ", this.locacionesRelacionadas);
  }

  editarLocaciones(){
    this.hayLocaciones= false;
  }
}
