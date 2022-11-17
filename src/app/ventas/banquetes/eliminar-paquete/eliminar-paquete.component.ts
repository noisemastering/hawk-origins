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
import { Paquete } from 'src/app/shared/classes/paquete';

@Component({
  selector: 'app-eliminar-paquete',
  templateUrl: './eliminar-paquete.component.html',
  styleUrls: ['./eliminar-paquete.component.scss']
})
export class EliminarPaqueteComponent implements OnInit {

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
  
    private paquete: Paquete;// Adaptar según modelo correspondiente
    title: string="Eliminar paquete";
  
    constructor(
  
      @Inject(MAT_DIALOG_DATA) data, //No mover!!!
      private formBuilder: FormBuilder, //No mover!!!
      public dRef: MatDialogRef<EliminarPaqueteComponent>, //Adaptar al modelo!!!
      private notificationService: NotificationsService, //No mover!!!
      private theService: CatalogosService, // No mover!!!
      
      ) { this.theID= data.theID;}
  
    ngOnInit() {
      ////////// Creación de formulario, adaptar según modelo correspondiente
      this.spinner.message="Cargando";
      this.theForm = this.formBuilder.group({
          itemID: [''],
          descripcion: [''],
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
      this.paquete= new Paquete; 
      this.theService.serviceURL= this.paquete.serviceURL;
      this.paquete.ID= this.theID;
      this.theService.getDetail(this.paquete)
      ///////////// /Adaptar al objeto correspondiente
        .subscribe((response: Response )=>{
          this.paquete= <Paquete>response.object; 
          //console.log('Detail: ', this.paquete);
          
          ///////////// Adaptar al modelo correspondiente ////////////
          this.theForm.controls['itemID'].setValue(this.paquete.ID);
          this.theForm.controls['descripcion'].setValue(this.paquete.Descripcion);
          this.theForm.controls['notas'].setValue(this.paquete.Notas);
          this.theForm.controls['ultimaModificacion'].setValue(this.paquete.uaFecha);
          this.theForm.controls['usuarioModificacion'].setValue(this.paquete.uaUsuario);
          this.theForm.controls['fechaCreacion'].setValue(this.paquete.crFecha);
          this.theForm.controls['usuarioCreacion'].setValue(this.paquete.crUsuario);
          this.keyws= this.paquete.Keywords;
          
          ///////////// //Adaptar al modelo correspondiente ////////////
  
          this.working= false; //No mover
      });
    }
  
    delete(){
      this.theService.deleteRecord(this.theID)
        .subscribe((response: Response) => {
          if(response.status=="ok"){
            this.notificationService.success('paquete eliminado'); //Adaptar mensajes
          }
          if(response.status=="error"){
            this.notificationService.error('Error, el paquete no pudo ser eliminado'); //Adaptar mensajes
          }
      });
    
    this.onClose();
    }

}
