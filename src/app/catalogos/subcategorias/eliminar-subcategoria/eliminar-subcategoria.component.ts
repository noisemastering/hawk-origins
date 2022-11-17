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
import { Subcategoria } from 'src/app/shared/classes/subcategoria';


@Component({
  selector: 'app-eliminar-subcategoria',
  templateUrl: './eliminar-subcategoria.component.html',
  styleUrls: ['./eliminar-subcategoria.component.scss']
})
export class EliminarSubcategoriaComponent implements OnInit {

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

  private subcategoria: Subcategoria;// Adaptar según modelo correspondiente
  title: string="Eliminar Subcategoría";

  constructor(

    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<EliminarSubcategoriaComponent>, //Adaptar al modelo!!!
    private notificationService: NotificationsService, //No mover!!!
    private theService: CatalogosService, // No mover!!!
    
    ) { this.theID= data.theID;}

  ngOnInit() {
    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.spinner.message="Cargando";
    this.theForm = this.formBuilder.group({
        itemID: [''],
        descripcion: [''],
        categoria:[''],
        keys: [''],
        notas: [''],
        fechaCreacion: [''],
        usuarioCreacion: [''],
        ultimaModificacion: [''],
        usuarioModificacion: [''],
        items: this.formBuilder.array([])
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
    this.subcategoria= new Subcategoria; 
    this.theService.serviceURL= this.subcategoria.serviceURL;
    this.subcategoria.ID= this.theID;
    this.theService.getDetail(this.subcategoria)
    ///////////// /Adaptar al objeto correspondiente
      .subscribe((response: Response )=>{
        this.subcategoria= <Subcategoria>response.object; 
        //console.log('Detail: ', this.subcategoria);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.subcategoria.ID);
        this.theForm.controls['descripcion'].setValue(this.subcategoria.Descripcion);
        this.theForm.controls['notas'].setValue(this.subcategoria.Notas);
        this.theForm.controls['categoria'].setValue(this.subcategoria.nombreCategoria);
        this.theForm.controls['ultimaModificacion'].setValue(this.subcategoria.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.subcategoria.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.subcategoria.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.subcategoria.crUsuario);
        this.keyws= this.subcategoria.Keywords;
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }

  delete(){
    this.theService.deleteRecord(this.theID)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Subcategoría eliminada'); //Adaptar mensajes
        }
        if(response.status=="error"){
          this.notificationService.error('Error, la subcategoría no pudo ser eliminada'); //Adaptar mensajes
        }
    });
  
  this.onClose();
  }

}
