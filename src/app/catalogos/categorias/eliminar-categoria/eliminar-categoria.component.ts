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
import { Categoria } from 'src/app/shared/classes/categoria';


@Component({
  selector: 'app-eliminar-categoria',
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.scss']
})
export class EliminarCategoriaComponent implements OnInit {

  /////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                         //
  submitted= false;                                                   //
  items= <any>[];                                                     //
  keyws= <any>[];                                                     //
  spinner: SpinnerComponent= new SpinnerComponent;                    //
  working: boolean= true;                                             //
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

  private categoria: Categoria;// Adaptar según modelo correspondiente
  title: string="Eliminar Categoría";

  constructor(

    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<EliminarCategoriaComponent>, //Adaptar al modelo!!!
    private notificationService: NotificationsService, //No mover!!!
    private theService: CatalogosService, // No mover!!!
    
    ) { this.theID= data.theID;}

  ngOnInit() {
    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.spinner.message="Cargando";
    this.theForm = this.formBuilder.group({
        ID: [''],
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
    this.working=false;
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
    this.categoria= new Categoria; 
    this.theService.serviceURL= this.categoria.serviceURL;
    this.categoria.ID= this.theID;
    this.theService.getDetail(this.categoria)
    ///////////// /Adaptar al objeto correspondiente
      .subscribe((response: Response )=>{
        this.categoria= <Categoria>response.object; 
        console.log('Detail: ', this.categoria);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['ID'].setValue(this.categoria.ID);
        this.theForm.controls['descripcion'].setValue(this.categoria.Descripcion);
        this.theForm.controls['notas'].setValue(this.categoria.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.categoria.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.categoria.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.categoria.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.categoria.crUsuario);
        this.keyws= this.categoria.Keywords;
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }

  delete(){
    this.theService.deleteRecord(this.theID)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Categoría eliminada'); //Adaptar mensajes
        }
        if(response.status=="error"){
          this.notificationService.error('Error, la categioría no pudo ser eliminada'); //Adaptar mensajes
        }
    });
  
  this.onClose();
  }

}
