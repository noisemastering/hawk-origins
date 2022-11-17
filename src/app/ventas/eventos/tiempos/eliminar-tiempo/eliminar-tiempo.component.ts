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
import { Tiempo } from 'src/app/shared/classes/tiempo';
import { Locacion } from 'src/app/shared/classes/locacion';

@Component({
  selector: 'app-eliminar-tiempo',
  templateUrl: './eliminar-tiempo.component.html',
  styleUrls: ['./eliminar-tiempo.component.scss']
})
export class EliminarTiempoComponent implements OnInit {

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
  
    private tiempo: Tiempo;// Adaptar según modelo correspondiente
    title: string="Eliminar";
  
    constructor(
  
      @Inject(MAT_DIALOG_DATA) data, //No mover!!!
      private formBuilder: FormBuilder, //No mover!!!
      public dRef: MatDialogRef<EliminarTiempoComponent>, //Adaptar al modelo!!!
      private notificationService: NotificationsService, //No mover!!!
      private theService: CatalogosService, // No mover!!!
      
      ) { this.theID= data.theID;}
  
    ngOnInit() {
      ////////// Creación de formulario, adaptar según modelo correspondiente
      this.spinner.message="Cargando";
      this.theForm = this.formBuilder.group({
          itemID: [''],
          descripcion: [''],
          orden: [''],
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
      this.tiempo= new Tiempo; 
      this.theService.serviceURL= this.tiempo.serviceURL;
      this.tiempo.ID= this.theID;
      this.theService.getDetail(this.tiempo)
      ///////////// /Adaptar al objeto correspondiente
        .subscribe((response: Response )=>{
          this.tiempo= <Tiempo>response.object; 
          //console.log('Detail: ', this.tiempo);
          
          ///////////// Adaptar al modelo correspondiente ////////////
          this.theForm.controls['itemID'].setValue(this.tiempo.ID);
          this.theForm.controls['descripcion'].setValue(this.tiempo.Descripcion);
          this.theForm.controls['notas'].setValue(this.tiempo.Notas);
          this.theForm.controls['orden'].setValue(this.tiempo.Orden);
          this.theForm.controls['ultimaModificacion'].setValue(this.tiempo.uaFecha);
          this.theForm.controls['usuarioModificacion'].setValue(this.tiempo.uaUsuario);
          this.theForm.controls['fechaCreacion'].setValue(this.tiempo.crFecha);
          this.theForm.controls['usuarioCreacion'].setValue(this.tiempo.crUsuario);
          this.keyws= this.tiempo.Keywords;
  
          this.working= false; //No mover
      });
    }
  
    delete(){
      this.theService.deleteRecord(this.theID)
        .subscribe((response: Response) => {
          if(response.status=="ok"){
            this.notificationService.success('Tiempo eliminado'); //Adaptar mensajes
          }
          if(response.status=="error"){
            this.notificationService.error('Error, el Tiempo no pudo ser eliminado'); //Adaptar mensajes
          }
      });
    
    this.onClose();
    }

}
 