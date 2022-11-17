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
import { CatalogosService } from 'src/app/servicios/catalogos.service';                 //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';

@Component({
  selector: 'app-scafolding-eliminar',
  templateUrl: './scafolding-eliminar.component.html',
  styleUrls: ['./scafolding-eliminar.component.scss']
})
export class ScafoldingEliminarComponent implements OnInit {

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
  public theID: number;                                               //
  permission: boolean;                                                //
  /////////////////// /No mover !!! ////////////////////////////////////

  private almacen: Almacen;// Adaptar según modelo correspondiente
  title: string="Eliminar";

  constructor(

    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<ScafoldingEliminarComponent>, //Adaptar al modelo!!!
    private notificationService: NotificationsService, //No mover!!!
    private theService: CatalogosService, // No mover!!!
    
    ) { this.theID= data.theID;}

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

  //////////// Formulario dinámico, borrar si no se ocupa
  createItem(): FormGroup {
    return this.formBuilder.group({
      descripcion: [''],
      notas: ['']
    });
  }

  createPopulatedItem(locP: Locacion): FormGroup {
    console.log("Item creado", locP);
    return this.formBuilder.group({
      //descripcion: [locP.Descripcion],
      notas: [locP.Notas]
    });
  }

  addPopulatedItem(locP: Locacion): void {
    this.items = this.theForm.get('items') as FormArray;
    this.items.push(this.createPopulatedItem(locP));
  }
  //////////// /Formulario dinámico, borrar si no se ocupa

  /////////// Ventanas
  onClose(){
    this.dRef.close();
  
  }


  ////////// Traer datos
  getRecord(): void {
    ///////////// Adaptar al objeto correspondiente
    this.almacen= new Almacen; 
    //this.theService.serviceURL= this.almacen.serviceURL;
    this.almacen.AlmacenID= this.theID;
    this.theService.getDetail(this.almacen)
    ///////////// /Adaptar al objeto correspondiente
      .subscribe((response: Response )=>{
        this.almacen= <Almacen>response.object; 
        //console.log('Detail: ', this.almacen);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.almacen.AlmacenID);
        this.theForm.controls['descripcion'].setValue(this.almacen.Nombre);
        this.theForm.controls['notas'].setValue(this.almacen.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.almacen.Modificado);
        this.theForm.controls['usuarioModificacion'].setValue(this.almacen.Modifico);
        this.theForm.controls['fechaCreacion'].setValue(this.almacen.Creado);
        this.theForm.controls['usuarioCreacion'].setValue(this.almacen.Creo);
        this.keyws= this.almacen.Keywords;
        ////////// Si es necesario un formulario dinámico, de lo contrario, borrar
        let locs: Locacion[];
        //locs= JSON.parse(this.almacen.Locaciones) as Locacion[];
        console.log("Locs: ", locs.length);
        for(const control of locs){
          this.addPopulatedItem(control);
        }
        ////////// //Si es necesario un formulario dinámico, de lo contrario, borrar
        //console.log("Locs: ", this.theForm.get('items'));
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }

  delete(){
    this.theService.deleteRecord(this.theID)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Almacén eliminado'); //Adaptar mensajes
        }
        if(response.status=="error"){
          this.notificationService.error('Error, el almacén no pudo ser eliminado'); //Adaptar mensajes
        }
    });
  
  this.onClose();
  }

}
