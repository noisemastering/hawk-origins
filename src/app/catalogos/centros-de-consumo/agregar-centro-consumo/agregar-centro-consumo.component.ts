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
  MatAutocompleteSelectedEvent,                                                         //
  MAT_DIALOG_DATA,                                                                      //
} from '@angular/material';                                                             //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { DuplicatesService } from 'src/app/servicios/duplicates.service';               //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { DatePipe } from '@angular/common';
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { CentroConsumo } from 'src/app/shared/classes/centro-consumo';
import { LocacionesService } from '../../locaciones/locaciones.service';
import { CentroConsumoService } from '../centro-consumo.service';
import { Usuario } from 'src/app/shared/classes/usuario';
import { NALocacionesCentrosConsumo } from 'src/app/shared/classes/locaciones-centros-consumo';
import { AlmacenesService } from '../../almacenes/almacenes.service';                                //

@Component({
  selector: 'app-agregar-centro-consumo',
  templateUrl: './agregar-centro-consumo.component.html',
  styleUrls: ['./agregar-centro-consumo.component.scss']
})
export class AgregarCentroConsumoComponent implements OnInit {

/////////////////////// No mover !!! /////////////////////////////////
theForm: FormGroup;                                         //
submitted= false;                                                   //
spinner: SpinnerComponent= new SpinnerComponent;                    //
working: boolean= false;                                            //
addOnBlur: boolean = true;                                          //
public theID: number;                                               //
public almacenes: Almacen[];
public locaciones$: Locacion[];
public locacionesRelacionadas: NALocacionesCentrosConsumo[];
public centro: CentroConsumo;
public currentUser: Usuario;
public locRel: NALocacionesCentrosConsumo;
public locacionesExistentes: Locacion[];
/////////////////// /No mover !!! ////////////////////////////////////

title: string="Agregar Centro de Consumo";

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private duplicateService: DuplicatesService,  //No mover!!!
    public dRef: MatDialogRef<AgregarCentroConsumoComponent>, // Adaptar según modelo correspondiente
    private almacenesService: AlmacenesService,
    private locacionesService: LocacionesService, // Adaptar según modelo correspondienteya lo 
    private theService: CentroConsumoService,
    private datepipe: DatePipe
  ) {   }

  ngOnInit() {
    this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
        descripcion: [''],
        notas: [''],
        tpv: [''],
        almacenesSelect:[''],
        locacionesSelect:['']
    });
    let usr= JSON.parse(localStorage.getItem("user")) as Usuario;
    console.log("Usuario: ", usr);
    this.almacenesService.getItems()
    .subscribe(
      (response: any) => {
        console.log("Almacenes: ", response);
        this.almacenes= response as Almacen[];
        console.log("Almacenes: ", this.almacenes);
      }
    );
    this.centro= new CentroConsumo;
    this.locacionesRelacionadas= [];
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

  duplicate(valor: string){ // Adaptar a los campos utilizados

    this.theService.checkForDuplicate(this.theForm.controls.descripcion.value, 0, 0)
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
      this.addRecord();
    }

    
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.theForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log('Invalid: '+name);
        }
    }
    
  }


  addRecord(): void {

    ///////// Adaptar según el modelo correspondiente
    this.centro.Descripcion=  this.theForm.controls['descripcion'].value;
    //this.almacen.Keywords=  "";//JSON.stringify(this.keywords);
    this.centro.Notas=  this.theForm.controls['notas'].value;
    this.centro.ID_PuntoVenta=  this.theForm.controls['tpv'].value;
    let date= Date.now();
    this.centro.Modificado= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.centro.Creado= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.centro.Modifico= 4;//this.currentUser.ID;
    this.centro.Creo= 4;//this.currentUser.ID;
    this.centro.NALocacionesCentros= this.locacionesRelacionadas;

  this.theService.addRecord(this.centro)
      .subscribe(
        (response: Response) => {
        this.notificationService.success('Centro de consumo agregado');
        },
        err => {
          this.notificationService.error("Error: "+ err);
        }
      );
  
  this.onClose();
  } 

  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
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
}
