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
  selector: 'app-eliminar-locacion',
  templateUrl: './eliminar-locacion.component.html',
  styleUrls: ['./eliminar-locacion.component.scss']
})
export class EliminarLocacionComponent implements OnInit {

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
  permission: boolean= false;     
  arts: boolean= true;
  ccs: boolean= true;
  public usuario: Usuario;                                         //
  /////////////////// /No mover !!! ////////////////////////////////////
  
  private almacen: Almacen;// Adaptar según modelo correspondiente
  private locacion: Locacion;// Adaptar según modelo correspondiente
  title: string="Eliminar Locación";
  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    public dRef: MatDialogRef<EliminarLocacionComponent>, // Adaptar según modelo correspondiente
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
      notas: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
      ultimaModificacion: [''],
      usuarioModificacion: ['']
  });

  /////////// Traemos datos
  this.usuario= JSON.parse(localStorage.getItem('user')) as Usuario;
  this.getRecord();// No mover!!!
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
        console.log('Locación a eliminar: ', this.locacion);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['almacen'].setValue(this.almacen.Nombre);
        this.theForm.controls['descripcion'].setValue(this.locacion.Nombre);
        this.theForm.controls['notas'].setValue(this.locacion.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.locacion.Modificado);
        this.theForm.controls['usuarioModificacion'].setValue(this.locacion.Modifico);
        this.theForm.controls['fechaCreacion'].setValue(response.Creado);
        this.theForm.controls['usuarioCreacion'].setValue(response.Creo);
        this.keyws=JSON.parse(this.locacion.Keywords);        
        this.locacion.Centros= response.NALocacionesCentros;
        ///////////// //Adaptar al modelo correspondiente ////////////
        if(this.locacion.Articulos.length == 0){
          this.arts= false;
        }
        if(this.locacion.Centros.length == 0){
          this.arts= false;
        }
        if((this.locacion.Articulos.length == 0)&&(this.locacion.Centros.length == 0)){
          this.permission= true;
        }
        this.working= false; //No mover
    });
  }

  ////// Ventanas
  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

  //// Envío de datos al servidor

  onDelete(): void {

    this.theService.deleteRecord(this.locacion.LocacionID)
      .subscribe(
        (response: Response) => {
        this.notificationService.success('Locación eliminada');
        console.log(response);
        },
        err => {
          this.notificationService.error("Error: "+ err);
        }
      );
  
  this.onClose();
  } 
}
