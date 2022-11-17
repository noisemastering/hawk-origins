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
import { Personal } from 'src/app/shared/classes/personal';

@Component({
  selector: 'app-detalle-personal',
  templateUrl: './detalle-personal.component.html',
  styleUrls: ['./detalle-personal.component.scss']
})
export class DetallePersonalComponent implements OnInit {

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
private personal: Personal;
title: string="Detalle de Personal";
///// /Adaptar al objeto correspondiente

constructor(
  @Inject(MAT_DIALOG_DATA) data, //No mover!!!
  private formBuilder: FormBuilder, //No mover!!!
  public dRef: MatDialogRef<DetallePersonalComponent>, //Adaptar según modelo correspondiente
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
        costo:[''],
        categoria:[''],
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
  this.personal= new Personal;
  this.personal.ID= this.theID
  this.theService.serviceURL= this.personal.serviceURL;
  this.theService.getDetail(this.personal)
    .subscribe((response: Response )=>{
      this.personal= <Personal>response.object; 
      //console.log('Detail: ', this.personal);
      
      ///////////// Adaptar al modelo correspondiente ////////////
      this.theForm.controls['itemID'].setValue(this.personal.ID);
      this.theForm.controls['descripcion'].setValue(this.personal.Descripcion);
      this.theForm.controls['notas'].setValue(this.personal.Notas);
      this.theForm.controls['costo'].setValue(this.personal.Costo);
      this.theForm.controls['categoria'].setValue(this.personal.NombreCategoria);
      this.theForm.controls['ultimaModificacion'].setValue(this.personal.uaFecha);
      this.theForm.controls['usuarioModificacion'].setValue(this.personal.uaUsuario);
      this.theForm.controls['fechaCreacion'].setValue(this.personal.crFecha);
      this.theForm.controls['usuarioCreacion'].setValue(this.personal.crUsuario);
      this.keyws= this.personal.Keywords;
      
      ///////////// //Adaptar al modelo correspondiente ////////////

      this.working= false; //No mover
  });
}
}