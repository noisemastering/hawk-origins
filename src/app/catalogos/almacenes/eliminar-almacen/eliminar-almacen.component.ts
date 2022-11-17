///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';       //
import { FormGroup, FormControl,                                                        //
  ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';                  //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA,                                                                       //
  MatTableDataSource,
  MatSort,
  MatPaginator
} from '@angular/material';                                                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { Response } from 'src/app/shared/classes/response';                             //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { AlmacenesService } from '../almacenes.service';                                //

@Component({
  selector: 'app-eliminar-almacen',
  templateUrl: './eliminar-almacen.component.html',
  styleUrls: ['./eliminar-almacen.component.scss']
})
export class EliminarAlmacenComponent implements OnInit {

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
    permission: boolean;    
    listData: MatTableDataSource<any>;
    displayColumns: string[]=['Nombre','Acciones'];                                            //
    /////////////////// /No mover !!! ////////////////////////////////////
  
    private almacen: Almacen;// Adaptar según modelo correspondiente
    title: string="Eliminar Almacén";
  
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator; 
    constructor(
  
      @Inject(MAT_DIALOG_DATA) data, //No mover!!!
      private formBuilder: FormBuilder, //No mover!!!
      public dRef: MatDialogRef<EliminarAlmacenComponent>, //Adaptar al modelo!!!
      private notificationService: NotificationsService, //No mover!!!
      private theService: AlmacenesService, // No mover!!!
      
      ) { this.theID= data.theID; console.log('ID: '+this.theID);}
  
    ngOnInit() {
      this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
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
      console.log("Item creado", locP.Nombre);
      return this.formBuilder.group({
        descripcion: [locP.Nombre]
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
      this.almacen= new Almacen;
      this.almacen.AlmacenID= this.theID
      this.theService.getDetailNA(this.almacen.AlmacenID)
        .subscribe((response )=>{
          this.almacen= response as Almacen; 
          console.log('Ileana: ', response);
          
          ///////////// Adaptar al modelo correspondiente ////////////
          this.theForm.controls['itemID'].setValue(response.AlmacenID);
          this.theForm.controls['descripcion'].setValue(response.Nombre);
          this.theForm.controls['notas'].setValue(response.Notas);
          this.theForm.controls['ultimaModificacion'].setValue(response.Modificado);
          this.theForm.controls['usuarioModificacion'].setValue(response.Modifico);
          this.theForm.controls['fechaCreacion'].setValue(response.Creado);
          this.theForm.controls['usuarioCreacion'].setValue(response.Creo);
          this.keyws= this.almacen.Keywords;
          let locs: Locacion[];
          locs= response.NALocaciones as Locacion[];
          if(locs.length==0){this.permission=true;}
          this.listData= new MatTableDataSource(locs);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;

          this.working= false; //No mover
      });
    }
  
    delete(){
      this.theService.deleteRecord(this.almacen.AlmacenID)
      .subscribe(
        (response: Response) => {
          this.notificationService.success('Almacén eliminado');
        },
        err => {
          this.notificationService.error("Error: "+ err);
        }
      );
    
    this.onClose();
    }
  
  }