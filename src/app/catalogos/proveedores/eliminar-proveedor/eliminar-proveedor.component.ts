///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';       //
import { FormGroup, FormControl,                                                        //
  ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';                  //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA                                                                       //
} from '@angular/material';                                                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { Response } from 'src/app/shared/classes/response';                             //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Proveedor } from 'src/app/shared/classes/proveedor';
import { CatalogosService } from 'src/app/servicios/catalogos.service';

@Component({
  selector: 'app-eliminar-proveedor',
  templateUrl: './eliminar-proveedor.component.html',
  styleUrls: ['./eliminar-proveedor.component.scss']
})
export class EliminarProveedorComponent implements OnInit {

   /////////////////////// No mover !!! /////////////////////////////////
   theForm: FormGroup;                                         //
   submitted= false;                                                   //
   items= <any>[];                                                     //
   keyws= <any>[];                                                     //
   spinner: SpinnerComponent= new SpinnerComponent;                    //
   working: boolean= false;                                            //
   //MatChip                                                           //
   visible: boolean = true;                                            //
   selectable: boolean = true;                                         //
   removable: boolean = true;                                          //
   addOnBlur: boolean = true;                                          //
   keywords = [];                                                      //
   separatorKeysCodes = [ENTER, COMMA];                                //
   @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;    //
   public theID: string;                                               //
   permission: boolean;                                                //
   /////////////////// /No mover !!! ////////////////////////////////////

   proveedor: Proveedor;// Adaptar según modelo correspondiente
   title: string="Eliminar proveedor";

   constructor(

    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<EliminarProveedorComponent>, //No mover!!!
    private notificationService: NotificationsService, //No mover!!!
    private theService: CatalogosService, // No mover!!!
    
    ) { this.theID= data.theID;}

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
        contacto: ['']
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
    ///////////// Adaptar al objeto correspondiente
    this.proveedor= new Proveedor; 
    this.theService.serviceURL= this.proveedor.serviceURL;
    this.proveedor.ID= this.theID;
    this.theService.getDetail(this.proveedor)
    ///////////// /Adaptar al objeto correspondiente
      .subscribe((response: Response )=>{
        this.proveedor= <Proveedor>response.object; 
        //console.log('Detail: ', this.almacen);
        ///////////// Adaptar al modelo correspondiente ////////////
        this.proveedor= <Proveedor>response.object; 
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
        this.keyws= this.proveedor.Keywords;
        //console.log('Keywords: '+this.proveedor.Keywords);
        if(response.delete=="no"){this.permission= false;}else{this.permission= true}
        ///////////// //Adaptar al modelo correspondiente ////////////
        this.working= false; //No mover
    });
  }

  onDelete(){
    this.theService.deleteRecord(this.theID)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Proveedor eliminado'); //Adaptar mensajes
        }
        if(response.status=="error"){
          this.notificationService.error('Error, el proveedor no pudo ser eliminado'); //Adaptar mensajes
        }
    });
  
  this.onClose();
  }

}
 