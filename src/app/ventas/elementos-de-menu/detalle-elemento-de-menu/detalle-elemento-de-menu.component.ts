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
import { MenuItem } from 'src/app/shared/classes/menu-item';

@Component({
  selector: 'app-detalle-elemento-de-menu',
  templateUrl: './detalle-elemento-de-menu.component.html',
  styleUrls: ['./detalle-elemento-de-menu.component.scss']
})
export class DetalleElementoDeMenuComponent implements OnInit {

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
  private item: MenuItem;
  title: string="Detalle de item";
  ///// /Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<DetalleElementoDeMenuComponent>, //Adaptar según modelo correspondiente
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
    this.item= new MenuItem;
    this.item.ID= this.theID
    this.theService.serviceURL= this.item.serviceURL;
    this.theService.getDetail(this.item)
      .subscribe((response: Response )=>{
        this.item= <MenuItem>response.object; 
        //console.log('Detail: ', this.item);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.item.ID);
        this.theForm.controls['descripcion'].setValue(this.item.Descripcion);
        this.keyws= this.item.Keywords;
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }

}
 