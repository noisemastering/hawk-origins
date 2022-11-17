///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import {                                                                                //  
  Component, OnInit, Inject                                                         //  
} from '@angular/core';                                                                 //
import {                                                                                //
  FormGroup,                                                                            //
  FormBuilder,                                                                          //
  Validators,                                                                           //
} from '@angular/forms';                                                                //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA,                                                                      //
} from '@angular/material';                                                             //
//                                                                                      //
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';           //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { DuplicatesService } from 'src/app/servicios/duplicates.service';               //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Concepto } from 'src/app/shared/classes/concepto';
import { ConceptosService } from '../conceptos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eliminar-concepto',
  templateUrl: './eliminar-concepto.component.html',
  styleUrls: ['./eliminar-concepto.component.scss']
})
export class EliminarConceptoComponent implements OnInit {

  /////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                         //
  submitted= false;                                                   //
  tipos= [
    {ID:'E', Nombre: 'Entrada'},
    {ID:'S', Nombre: 'Salida'},
  ];                                                                  //
  spinner: SpinnerComponent= new SpinnerComponent;                    //
  working: boolean= false;                                            //
  public theID: string;                                               //
  permission: boolean;          
  tipo: string;                                    //
  /////////////////// /No mover !!! ////////////////////////////////////

  private concepto: Concepto;// Adaptar según modelo correspondiente
  title: string="Eliminar Concepto";

  constructor(

    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<EliminarConceptoComponent>, //Adaptar al modelo!!!
    private notificationService: NotificationsService, //No mover!!!
    private theService: ConceptosService, // No mover!!!
    
    ) { this.theID= data.theID;}

  ngOnInit() {
    this.spinner.message="Cargando"; //No mover!!!
  
      ////////// Creación de formulario, adaptar según modelo correspondiente
      this.theForm = this.formBuilder.group({
          nombre: ['', Validators.compose([Validators.minLength(4), Validators.required])],
          tipo: ['', Validators.compose([Validators.required])],
          descripcion: ['', Validators.compose([Validators.minLength(10)])],
          fechaCreacion: [''],
          usuarioCreacion: [''],
          ultimaModificacion: [''],
          usuarioModificacion: ['']
      });
      this.working=false;
      /////////////// /No mover!!! ////////////
  
      /////////// Traemos datos
      this.getRecord();// No mover!!!
  }


  //////////////// Funciones

  //////////// Formulario
  get f() { return this.theForm.controls; } // No mover

  /////////// Ventanas
  onClose(){
    this.dRef.close();
  
  }


  ////////// Traer datos
  getRecord(): void {
    this.theService.getDetail(parseInt(this.theID))
        .subscribe((res )=>{
          this.concepto= res as Concepto; 
          console.log('Detail: ', this.concepto);
          this.theForm.controls['descripcion'].setValue(this.concepto.Descripcion);
          this.theForm.controls['nombre'].setValue(this.concepto.Nombre);
          this.theForm.controls['ultimaModificacion'].setValue(this.concepto.Modificado);
          this.theForm.controls['usuarioModificacion'].setValue(this.concepto.Modifico);
          this.theForm.controls['fechaCreacion'].setValue(this.concepto.Creado);
          this.theForm.controls['usuarioCreacion'].setValue(this.concepto.Creo);
          this.theForm.controls.tipo.setValue(this.concepto.Tipo);
          this.tipo= this.concepto.Tipo;
          this.working= false; //No mover
          this.permission= true;
      });
  }

  delete(){
    this.theService.deleteRecord(parseInt(this.theID))
    .subscribe(
      (res) => {
        this.notificationService.success('Concepto actualizado');
      },
      err =>{
        this.notificationService.error('Error, no fue posible actualizar el concepto');
      //console.log(response);
    });
  
  this.onClose();
  }

  validate(){
    this.delete();
  }

}
