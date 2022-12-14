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

///////////////////// Cargar los objetos y servicios del cat??logo en cuesti??n  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { Usuario } from 'src/app/shared/classes/usuario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-locacion',
  templateUrl: './detalle-locacion.component.html',
  styleUrls: ['./detalle-locacion.component.scss']
})
export class DetalleLocacionComponent implements OnInit {

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
  permission: boolean= true;       
  public usuario: Usuario;                                         //
  /////////////////// /No mover !!! ////////////////////////////////////
  
  private almacen: Almacen;// Adaptar seg??n modelo correspondiente
  private locacion: Locacion;// Adaptar seg??n modelo correspondiente
  title: string="Detalle Locaci??n";
  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    public dRef: MatDialogRef<DetalleLocacionComponent>, // Adaptar seg??n modelo correspondiente
    private theService: LocacionesService, // Adaptar seg??n modelo correspondienteya lo 
    public datepipe: DatePipe
  ) { 
    this.theID= data.theID; console.log('ID: '+this.theID);
  }

  ngOnInit() {

    ////////// Creaci??n de formulario, adaptar seg??n modelo correspondiente
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
        console.log('Locaci??n a editar: ', this.locacion);
        
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

  //// Env??o de datos al servidor

}