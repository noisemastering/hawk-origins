///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';       //
import { FormGroup, FormControl,                                                        //
  ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';                  //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA                                                                       //
} from '@angular/material';                                                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { Response } from 'src/app/shared/classes/response';                             //
import { CatalogosService } from 'src/app/servicios/catalogos.service';                 //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { UM } from 'src/app/shared/classes/um';

@Component({
  selector: 'app-eliminar-unidades-de-medida',
  templateUrl: './eliminar-unidades-de-medida.component.html',
  styleUrls: ['./eliminar-unidades-de-medida.component.scss']
})
export class EliminarUnidadesDeMedidaComponent implements OnInit {

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
    public theID: string;                                               //
    permission: boolean;                                                //
    /////////////////// /No mover !!! ////////////////////////////////////
  
    um: UM;// Adaptar según modelo correspondiente
    title: string="Eliminar Unidad de Medida";
    dimensiones=  [
      {ID: 'V', nombre:'Volumen'},
      {ID: 'P', nombre:'Peso'},
      {ID: 'O', nombre:'Otro (pieza, caja, etc.)'}
    ];
    currentDimension: string;
  
    constructor(
  
      @Inject(MAT_DIALOG_DATA) data, //No mover!!!
      private formBuilder: FormBuilder, //No mover!!!
      public dRef: MatDialogRef<EliminarUnidadesDeMedidaComponent>, //Adaptar al modelo!!!
      private notificationService: NotificationsService, //No mover!!!
      private theService: CatalogosService, // No mover!!!
      
      ) { this.theID= data.theID;}
  
    ngOnInit() {
      ////////// Creación de formulario, adaptar según modelo correspondiente
      this.spinner.message="Cargando";
      this.theForm = this.formBuilder.group({
        itemID: [''],
        descripcion: [''],
        dimension:[''],
        keys: [''],
        notas: [''],
        fechaCreacion: [''],
        usuarioCreacion: [''],
        ultimaModificacion: [''],
        usuarioModificacion: ['']
      });
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
      ///////////// Adaptar al objeto correspondiente
      this.um= new UM; 
      this.theService.serviceURL= this.um.serviceURL;
      this.um.ID= this.theID;
      this.theService.getDetail(this.um)
      ///////////// /Adaptar al objeto correspondiente
        .subscribe((response: Response )=>{
          this.um= <UM>response.object; 
          //console.log('Detail: ', this.um);
          
          ///////////// Adaptar al modelo correspondiente ////////////
          this.theForm.controls['itemID'].setValue(this.um.ID);
          this.theForm.controls['descripcion'].setValue(this.um.Descripcion);
          this.theForm.controls['notas'].setValue(this.um.Notas);
          this.theForm.controls['ultimaModificacion'].setValue(this.um.uaFecha);
          this.theForm.controls['usuarioModificacion'].setValue(this.um.uaUsuario);
          this.theForm.controls['fechaCreacion'].setValue(this.um.crFecha);
          this.theForm.controls['usuarioCreacion'].setValue(this.um.crUsuario);
          this.keyws= this.um.Keywords;
          this.currentDimension= this.um.Dimension;         
          ///////////// //Adaptar al modelo correspondiente ////////////
  
          this.working= false; //No mover
      });
    }
  
    delete(){
      this.theService.deleteRecord(this.theID)
        .subscribe((response: Response) => {
          if(response.status=="ok"){
            this.notificationService.success('Unidad de medida eliminada'); //Adaptar mensajes
          }
          if(response.status=="error"){
            this.notificationService.error('Error, la unidad de medida no pudo ser eliminada'); //Adaptar mensajes
          }
      });
    
    this.onClose();
    }

}
