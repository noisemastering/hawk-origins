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
import { Paquete } from 'src/app/shared/classes/paquete';

@Component({
  selector: 'app-detalle-paquete',
  templateUrl: './detalle-paquete.component.html',
  styleUrls: ['./detalle-paquete.component.scss']
})
export class DetallePaqueteComponent implements OnInit {

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
  private paquete: Paquete;
  title: string="Detalle de paquete";
  ///// /Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<DetallePaqueteComponent>, //Adaptar según modelo correspondiente
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
    this.paquete= new Paquete;
    this.paquete.ID= this.theID
    this.theService.serviceURL= this.paquete.serviceURL;
    this.theService.getDetail(this.paquete)
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

}
 