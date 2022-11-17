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
import { CategoriaPersonal } from 'src/app/shared/classes/categoria-personal';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.component.html',
  styleUrls: ['./detalle-categoria.component.scss']
})
export class DetalleCategoriaPersonalComponent implements OnInit {

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
private categoria: CategoriaPersonal;
title: string="Detalle de Categoría de Personal";
///// /Adaptar al objeto correspondiente

constructor(
  @Inject(MAT_DIALOG_DATA) data, //No mover!!!
  private formBuilder: FormBuilder, //No mover!!!
  public dRef: MatDialogRef<DetalleCategoriaPersonalComponent>, //Adaptar según modelo correspondiente
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
  this.categoria= new CategoriaPersonal;
  this.categoria.ID= this.theID
  this.theService.serviceURL= this.categoria.serviceURL;
  this.theService.getDetail(this.categoria)
    .subscribe((response: Response )=>{
      this.categoria= <CategoriaPersonal>response.object; 
      //console.log('Detail: ', this.categoria);
      
      ///////////// Adaptar al modelo correspondiente ////////////
      this.theForm.controls['itemID'].setValue(this.categoria.ID);
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
}