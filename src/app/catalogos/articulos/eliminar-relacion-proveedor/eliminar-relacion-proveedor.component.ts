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
  selector: 'app-eliminar-relacion-proveedor',
  templateUrl: './eliminar-relacion-proveedor.component.html',
  styleUrls: ['./eliminar-relacion-proveedor.component.scss']
})
export class EliminarRelacionProveedorComponent implements OnInit {

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
  title: string="Eliminar relación de proveedor con artículo";
  articulo: Articulo;
  proveedor: ProveedorRelacionado;
  proveedores: []; //Array para el dropdown
  ///// Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private theService: RelacionadosService, // Adaptar al objeto correspondiente
    public dRef: MatDialogRef<EliminarRelacionProveedorComponent> // Adaptar al objeto correspondiente
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

  validate() { // No mover
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.unlinkRecord();
    }
  }

  /////////// /Formularios

  ////// Ventanas
  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

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

  //// Envío de datos al servidor

  // Adaptar al modelo correspondiente
  unlinkRecord(): void {
    //Si no funciona, hay que inicializarlo a pie
    let art= new Articulo;
    this.theService.serviceURL= art.serviceURL;
    this.proveedor = new ProveedorRelacionado();
    this.proveedor.ID_Proveedor= this.theForm.controls['proveedor'].value;
    this.proveedor.ID_Articulo= this.articulo.ID;
    this.proveedor.TiempoSurtido= this.theForm.controls['surtido'].value;
    this.proveedor.Costo= this.theForm.controls['costo'].value;
    this.proveedor.Notas= this.theForm.controls['notas'].value;
    this.theService.linkRecord(this.proveedor, 'unlink_proveedor')
        .subscribe((response: Response) => {
            this.notificationService.success("La relación de este proveedor con el artículo "+this.articulo.Descripcion+" ha sido eliminada exitosamente");
          },
          err => {
            this.notificationService.error(err.message);
          }
      );

  this.onClose();
  }

}
