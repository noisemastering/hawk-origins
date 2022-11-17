///////////// No Mover!!!!! ////////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';         //
import { FormGroup, FormControl, ReactiveFormsModule,                                     //
        FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';               //
import { MatDialogRef, MatButton, MatAutocompleteSelectedEvent,                           //
          MatAutocomplete, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material'; //       
import { Response } from 'src/app/shared/classes/response';                               //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';             // 
//     Servicios custom                                                                   //
import { NotificationsService } from 'src/app/servicios/notifications.service';           //
import { RelacionadosService } from 'src/app/servicios/relacionados.service';             //
///////////// /No Mover!!!!! ///////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Articulo } from 'src/app/shared/classes/articulo';
import { ProveedorRelacionado } from 'src/app/shared/classes/proveedor-relacionado';

@Component({
  selector: 'app-detalle-relacion-proveedor',
  templateUrl: './detalle-relacion-proveedor.component.html',
  styleUrls: ['./detalle-relacion-proveedor.component.scss']
})
export class DetalleRelacionProveedorComponent implements OnInit {

      ///////////// Variables

  ///////////////////// No mover !!! ///////////////////////////////////
    theForm: FormGroup;                                       //
    submitted= false;                                                 //
    items= <any>[];                                                   //
    spinner: SpinnerComponent= new SpinnerComponent;                  //
    working: boolean= false;                                          //
    //MatChip                                                         //
    visible: boolean = true;                                          //
  /////////////////// /No mover !!! ////////////////////////////////////

  ///// Adaptar al objeto correspondiente
  title: string="Detalle de la relación entre proveedor y artículo";
  articulo: Articulo;
  proveedor: ProveedorRelacionado;
  ///// Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private theService: RelacionadosService, // Adaptar al objeto correspondiente
    public dRef: MatDialogRef<DetalleRelacionProveedorComponent> // Adaptar al objeto correspondiente
  ) { 
    this.articulo= new Articulo;
    this.articulo= data.theObj; console.log('Artículo: ',this.articulo);
    this.proveedor= data.theProv; 
  }

  ngOnInit() {

    this.spinner.message="Cargando";
    //Adaptar según el modelo correspondiente
    this.theForm = this.formBuilder.group({
      proveedor: [''],
      surtido:[''],
      costo: [''],
      notas: ['']
    });
    
    //////// Pre cargas necesarias
    this.getRecord();
    //this.populateForm();
    //////// /Pre cargas necesarias

    this.working=false;

  }

  ////// Funciones

  ////// Formularios y validaciones

  get f() { return this.theForm.controls; } // Mo mover!!!

  /////////// /Formularios
  
  //////// Traer info de precarga
  getRecord(){

    let art= new Articulo;
    this.theService.serviceURL= art.serviceURL;
    this.theService.getDetail(this.proveedor,'detalle_proveedor')
    .subscribe(
      (res: Response) => {
        this.proveedor= res.object; console.log("Proveedor traído: ", this.proveedor);
        this.theForm.controls['proveedor'].setValue(this.proveedor.DescProveedor); console.log("Desc: ", this.proveedor.DescProveedor);
        this.theForm.controls['surtido'].setValue(this.proveedor.TiempoSurtido);
        this.theForm.controls['costo'].setValue(this.proveedor.Costo);
        this.theForm.controls['notas'].setValue(this.proveedor.Notas);
      },
      err => {}
    );

  }
  ////// Ventanas
  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

}
