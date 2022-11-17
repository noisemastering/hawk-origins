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
import { CatalogosService } from 'src/app/servicios/catalogos.service'                  //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Cliente } from 'src/app/shared/classes/cliente';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss']
})
export class DetalleClienteComponent implements OnInit {

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
  private cliente: Cliente;
  title: string="Detalle de Cliente";
  currentShift: string;
  ///// /Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<DetalleClienteComponent>, //Adaptar según modelo correspondiente
    private theService: CatalogosService, //Adaptar según modelo correspondiente
    ) 
    { this.theID= data.theID;}//No mover

  ngOnInit() {

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.spinner.message="Cargando";
        this.theForm = this.formBuilder.group({
            itemID: [''],
            descripcion: [''],
            direccion1: [''],
            direccion2: [''],
            direccion3: [''],
            telefonos: [''],
            delegacionMunicipio: [''],
            ciudad: [''],
            estado: [''],
            cp: [''],
            turno: [''],
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
    this.cliente= new Cliente;
    this.cliente.ID= this.theID
    this.theService.serviceURL= this.cliente.serviceURL;
    this.theService.getDetail(this.cliente)
      .subscribe((response: Response )=>{
        this.cliente= <Cliente>response.object; 
        //console.log('Detail: ', this.cliente);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.cliente.ID);
        this.theForm.controls['descripcion'].setValue(this.cliente.Descripcion);
        this.theForm.controls['direccion1'].setValue(this.cliente.Direccion1);
        this.theForm.controls['direccion2'].setValue(this.cliente.Direccion2);
        this.theForm.controls['direccion3'].setValue(this.cliente.Direccion3);
        this.theForm.controls['telefonos'].setValue(this.cliente.Telefonos);
        this.theForm.controls['delegacionMunicipio'].setValue(this.cliente.DelegacionMunicipio);
        this.theForm.controls['ciudad'].setValue(this.cliente.Ciudad);
        this.theForm.controls['estado'].setValue(this.cliente.Estado);
        this.theForm.controls['cp'].setValue(this.cliente.CP);
        this.currentShift=this.cliente.Turno;
        this.theForm.controls['notas'].setValue(this.cliente.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.cliente.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.cliente.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.cliente.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.cliente.crUsuario);
        this.keyws= this.cliente.Keywords;
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }

  duplicate(nombre: string){}

}
