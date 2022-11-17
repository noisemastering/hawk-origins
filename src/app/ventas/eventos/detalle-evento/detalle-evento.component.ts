///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';       //
import { FormGroup, FormControl,                                                        //  
  ReactiveFormsModule, FormBuilder,                                                     //
  FormArray } from '@angular/forms';                                                    //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA                                                                       //
} from '@angular/material';                                                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   //
import { Response } from 'src/app/shared/classes/response';                             //
import { CatalogosService } from 'src/app/servicios/catalogos.service';                 //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Evento } from 'src/app/shared/classes/evento';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.scss']
})
export class DetalleEventoComponent implements OnInit {

    ///////////// Variables

/////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                       //
  submitted= false;                                                 //
  items= <any>[];                                                   //
  keyws= <any>[];                                                   //
  spinner: SpinnerComponent= new SpinnerComponent;                  //
  working: boolean= false;                                          //
  //MatChip                                                         //
  visible: boolean = true;                                          //
  selectable: boolean = true;                                       //
  removable: boolean = true;                                        //
  addOnBlur: boolean = true;                                        //
  keywords = [];                                                    //
  separatorKeysCodes = [ENTER, COMMA];                              //
  @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;  //
  public theID: string;                                             //
  /////////////////// /No mover !!! ////////////////////////////////////

  ///// Adaptar al objeto correspondiente
  private evento: Evento;
  title: string="Detalle de Evento";
  ///// /Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<DetalleEventoComponent>, //Adaptar según modelo correspondiente
    private theService: CatalogosService, //Adaptar según modelo correspondiente
    ) 
    { this.theID= data.theID;}//No mover
 
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
    this.evento= new Evento;
    this.evento.ID= this.theID
    this.theService.serviceURL= this.evento.serviceURL;
    this.theService.getDetail(this.evento)
      .subscribe((response: Response )=>{
        this.evento= <Evento>response.object; 
        //console.log('Detail: ', this.evento);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.evento.ID);
        this.theForm.controls['descripcion'].setValue(this.evento.Descripcion);
        this.theForm.controls['notas'].setValue(this.evento.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.evento.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.evento.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.evento.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.evento.crUsuario);
        this.keyws= this.evento.Keywords;
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }

}
