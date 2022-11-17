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
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Proveedor } from 'src/app/shared/classes/proveedor';
import { CatalogosService } from 'src/app/servicios/catalogos.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.scss']
})
export class DetalleProveedorComponent implements OnInit {

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
  proveedor: Proveedor;
  title: string="Detalle de Proveedor";
  ///// /Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<DetalleProveedorComponent>, //Adaptar según modelo correspondiente
    private theService: CatalogosService, //Adaptar según modelo correspondiente
    ) 
    { this.theID= data.theID;}//No mover

  ngOnInit() {

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.spinner.message="Cargando";
        this.theForm = this.formBuilder.group({
          prov_id: [''],
          descripcion: [''],
          keys: [''],
          razon: [''],
          rfc: [''],
          curp: [''],
          calle: [''],
          exterior:[''],
          interior:[''],
          cp: [''],
          zipID: [''],
          telefono: [''],
          movil: [''],
          mail: [''],
          web: [''],
          entrega: [''],
          credito: [''],
          cuentaContable: [''],
          comentarios: [''],
          thumbnail: [''],
          contacto: [''],
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
    this.proveedor= new Proveedor;
    this.theService.serviceURL= this.proveedor.serviceURL;
    this.proveedor.ID= this.theID;
    console.log('URL: ', this.theService.serviceURL);
    this.theService.getDetail(this.proveedor)
      .subscribe((response: Response )=>{
        this.proveedor= <Proveedor>response.object; 
        //console.log('Prov: ', this.proveedor);
        this.theForm.controls['prov_id'].setValue(this.proveedor.ID);
        this.theForm.controls['rfc'].setValue(this.proveedor.RFC);
        this.theForm.controls['descripcion'].setValue(this.proveedor.Descripcion);
        this.theForm.controls['razon'].setValue(this.proveedor.RazonSocial);
        this.theForm.controls['curp'].setValue(this.proveedor.CURP);
        this.theForm.controls['calle'].setValue(this.proveedor.Direccion1+' '+this.proveedor.Ciudad+' '+this.proveedor.Estado);
        this.theForm.controls['cp'].setValue(this.proveedor.CP);
        this.theForm.controls['zipID'].setValue(this.proveedor.ZipID);
        this.theForm.controls['telefono'].setValue(this.proveedor.Telefono);
        this.theForm.controls['movil'].setValue(this.proveedor.Celular);
        this.theForm.controls['mail'].setValue(this.proveedor.CorreoElectronico);
        this.theForm.controls['web'].setValue(this.proveedor.PaginaWeb);
        this.theForm.controls['credito'].setValue(this.proveedor.DiasCredito);
        this.theForm.controls['cuentaContable'].setValue(this.proveedor.CuentaContable);
        this.theForm.controls['comentarios'].setValue(this.proveedor.Notas);
        this.theForm.controls['contacto'].setValue(this.proveedor.Contacto);
        this.theForm.controls['ultimaModificacion'].setValue(this.proveedor.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.proveedor.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.proveedor.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.proveedor.crUsuario);
        this.keyws= this.proveedor.Keywords;
        this.working= false; //No mover
    });
  }
}