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
import { SimpleResponse } from 'src/app/shared/classes/simple-response';                  //
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';             //
import { RelacionadosService } from 'src/app/servicios/relacionados.service';             //
///////////// /No Mover!!!!! ///////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Articulo } from 'src/app/shared/classes/articulo';
import { ProveedorRelacionado } from 'src/app/shared/classes/proveedor-relacionado';


@Component({
  selector: 'app-relacionar-proveedor',
  templateUrl: './relacionar-proveedor.component.html',
  styleUrls: ['./relacionar-proveedor.component.scss']
})
export class RelacionarProveedorComponent implements OnInit {

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
  title: string="Relacionar proveedor con artículo";
  articulo: Articulo;
  proveedor: ProveedorRelacionado;
  proveedores: []; //Array para el dropdown
  ///// Adaptar al objeto correspondiente

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private theService: RelacionadosService, // Adaptar al objeto correspondiente
    public dRef: MatDialogRef<RelacionarProveedorComponent> // Adaptar al objeto correspondiente
  ) { 
    this.articulo= new Articulo;
    this.articulo= data.theObj; console.log('Object: ',this.articulo);
  }

  ngOnInit() {

    this.spinner.message="Cargando";
    //Adaptar según el modelo correspondiente
    this.theForm = this.formBuilder.group({
      proveedor: ['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(20)])],
      surtido:['',Validators.compose([Validators.required])],
      costo: [''],
      notas: ['']
    });
    
    //////// Pre cargas necesarias
    this.getProvList();
    //////// /Pre cargas necesarias

    this.working=false;

  }

  ////// Funciones

  ////// Formularios y validaciones

  get f() { return this.theForm.controls; } // Mo mover!!!

  resetForm(){ // No mover
    console.log('Form reset');
    this.theForm.reset();
  }

  validate() { // No mover
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.linkRecord();
    }
  }

  /////////// /Formularios

  ////// Ventanas
  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

  //////// Traer info de precarga
  getProvList(){
    let art= new Articulo;
    this.theService.serviceURL= art.serviceURL;
    console.log("Entró List: ", this.theService.serviceURL);
    this.theService.getDropDownID(this.articulo,'proveedores_disponibles')
    .subscribe((res: Response)=>{
      console.log("Disponibles: ", res);
      this.proveedores= res.object;
      //this.notificationService.success(res.message);
    }, err => {
      //this.notificationService.error(err.message);
    });

  }

  //// Envío de datos al servidor

  // Adaptar al modelo correspondiente
  linkRecord(): void {
    //Si no funciona, hay que inicializarlo a pie
    let art= new Articulo;
    this.theService.serviceURL= art.serviceURL;
    this.proveedor = new ProveedorRelacionado();
    this.proveedor.ID_Proveedor= this.theForm.controls['proveedor'].value;
    this.proveedor.ID_Articulo= this.articulo.ID;
    this.proveedor.TiempoSurtido= this.theForm.controls['surtido'].value;
    this.proveedor.Costo= this.theForm.controls['costo'].value;
    this.proveedor.Notas= this.theForm.controls['notas'].value;
    this.theService.linkRecord(this.proveedor, 'link_proveedor')
        .subscribe((response: Response) => {
            this.notificationService.success("El proveedor ha sido relacionado exitosamente con el artículo "+this.articulo.Descripcion);
          },
          err => {
            this.notificationService.error(err.message);
          }
      );

  this.onClose();
  }
}
