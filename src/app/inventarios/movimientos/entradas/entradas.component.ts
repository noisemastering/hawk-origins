///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';        //
import {                                                                                //
  MatPaginator,                                                                         //
  MatSort, MAT_DIALOG_DATA,                                                                               //
  MatTableDataSource,                                                                   //
  MatDialog,                                                                            //
  MatDialogConfig} from '@angular/material';                                            // 
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           // 
import { Response } from 'src/app/shared/classes/response';                             //
import { CatalogosService } from 'src/app/servicios/catalogos.service';                 //
import { Articulo } from 'src/app/shared/classes/articulo';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule,                                   //
  FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';             //
import { Observable, of } from 'rxjs';
import { GenericsService } from 'src/app/servicios/generics.service';        
import { DropDownItem } from 'src/app/shared/classes/dropdown-item';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { AgregarAlmacenComponent } from 'src/app/catalogos/almacenes/agregar-almacen/agregar-almacen.component';
import { AgregarConceptoComponent } from 'src/app/catalogos/conceptos/agregar-concepto/agregar-concepto.component';
import { ArticuloMovimiento } from 'src/app/shared/classes/articulo-movimiento';
import { InfoArticuloComponent } from '../../info-articulo/info-articulo.component';
import { MovimientosComponent } from '../movimientos.component';
import { MovimientosService } from 'src/app/servicios/movimientos.service';
import { EditarInfoArticuloComponent } from '../../editar-info-articulo/editar-info-articulo.component';
import { EliminarInfoArticuloComponent } from '../../eliminar-info-articulo/eliminar-info-articulo.component';
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {

///////////////////// No mover !!! ///////////////////
  searchKey: string;                                //
  searchKeyAgr: string;
  theForm: FormGroup;  
  spinner: SpinnerComponent= new SpinnerComponent;  //
  working: boolean=true;                            //
  listData: MatTableDataSource<any>;                //
  listDataAgr: MatTableDataSource<any>;
  almacenes: DropDownItem[];
  conceptos: DropDownItem[];
  locaciones$: Observable<any[]>;
  agregados: any[];
  submitted= false;
  granTotal=0;
  @ViewChild(MatSort) sort: MatSort;                //
  @ViewChild(MatPaginator) paginator: MatPaginator; //
  @ViewChild(MatSort) sortAgr: MatSort;                //
  @ViewChild(MatPaginator) paginatorAgr: MatPaginator; //
/////////////////// /No mover !!! ////////////////////

articulos: Articulo[]; // Adaptar al nombre de objeto
displayColumns: string[]=['ID','Descripcion','DescCategoria','DescSubcategoria','acciones']; // Adaptar las columnas (actualizar tabla)
displayColumnsAgr: string[]=['NombreAgr','Cantidad','CostoU','Descuento','ieps','iva','accionesAgr']; // Adaptar las columnas (actualizar tabla)

  constructor(
    private dialog: MatDialog, // No mover!!!
    private changeDetectorRefsArticulos: ChangeDetectorRef, // No mover!!!
    private changeDetectorRefsAgr: ChangeDetectorRef, // No mover!!!
    private theService: CatalogosService, //Cambiar por el servicio correspondiente
    private router: Router,
    private formBuilder: FormBuilder, // No Mover!!!
    private theRelService: GenericsService,
    private notificationService: NotificationsService,
    private movService: MovimientosService
  ) { }

  ngOnInit() {
    //Traer la lista de datos
    //Adaptar según el modelo correspondiente
    localStorage.removeItem('movimientos');
    this.theForm = this.formBuilder.group({
      fecha: ['', Validators.compose([Validators.required])],
      concepto: ['', Validators.compose([Validators.required])],
      almacen: ['', Validators.compose([Validators.required])],
      locacion: ['' , Validators.compose([Validators.required])],
      referencia: [''],
      iva: [''],
      ieps: [''],
      descuento: [''],
      subtotal: [''],
      total: [''],
      notas: ['']
    });
    this.getList(); //No mover
    this.getAlmacenesList();
    this.getConceptosList();
    this.agregados= [];
    this.getAgregadosTable();
  }

    ///////// Cambiar el objeto y el servicio
    getList(): void{
      let art = new Articulo;
      this.theService.serviceURL= art.serviceURL; //Poner la URL del obejto correspondiente
      //console.log('URL', art.serviceURL);
      this.theService.getItems()
      .subscribe(
        (response: Response) => {
          this.articulos = response.object as Articulo[];
          this.listData= new MatTableDataSource(this.articulos);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
          console.log("Articulos: ", this.articulos);
        });
        this.changeDetectorRefsArticulos.detectChanges();
    }

  getAgregadosTable(): void{
    this.movService.getTableEntradas()
    .subscribe((res )=>{
      //console.log("Res: ", res);
      let mov= localStorage.getItem('movimientos');
      this.agregados= res; 
      this.listDataAgr= new MatTableDataSource(this.agregados);
      this.listDataAgr.sort= this.sortAgr;
      this.listDataAgr.paginator= this.paginatorAgr;
      //console.log("Agregados: ", this.agregados);
      let suma=0;
      for(const sum of this.agregados){
        console.log("Current art: ",sum);
        this.granTotal += (sum.CostoUnitario*sum.Cantidad)+((sum.IVA/100)*sum.CostoUnitario)+((sum.IEPS/100)*sum.CostoUnitario)-sum.Descuento;
        //console.log("Suma: ", suma)
      }
      console.log("Gran total: ",this.granTotal);
    });
    this.changeDetectorRefsAgr.detectChanges();
  }

  /////////// Almacenes
  getAlmacenesList(){
    this.theRelService.getDropDown('Almacenes')
      .subscribe((response: Response )=>{
        this.almacenes= response.object;
        console.log("Almacenes: ", response.object);
        //this.notificationService.success('Proveedor actualizado');
      },
      err =>{
        this.notificationService.error('Error de conexión. '+err.message);
      });
  }
  getConceptosList(){
    this.theRelService.getDropDown('Articulos_Conceptos')
      .subscribe((response: Response )=>{
        this.conceptos= response.object;
        console.log("Conceptos: ", response.object);
        //this.notificationService.success('Proveedor actualizado');
      },
      err =>{
        this.notificationService.error('Error de conexión. '+err.message);
      });
  }


  /////// Dropdowns async
  updateDrop(option: string, val: any){
    console.log("Entro update drop");
    //Traemos lista de almacenes
    this.locaciones$=this.theRelService.getDropDownLoc("Almacenes_Locaciones", val, "ID_Almacen");
  }
  ///////// Traer datos

    ///////// Buscador No mover!!! /////////

    onSearchClear(){
      this.searchKey="";
      this.applyFliter();
    }

    applyFliter(){
      this.listData.filter= this.searchKey.trim().toLowerCase();
    }

    onSearchClearAgr(){
      this.searchKeyAgr="";
      this.applyFliter();
    }

    applyFliterAgr(){
      this.listData.filter= this.searchKeyAgr.trim().toLowerCase();
    }
    ///////// Buscador ////////////////////

    get f() { return this.theForm.controls; } // Mo mover!!!

    ////// Ventanas
    
    ////// Formularios externos
    createAlmacen(){
      const dc= new MatDialogConfig;
      dc.disableClose= true;
      dc.autoFocus= true;
      dc.width= "90%";
      dc.height= "90%";
      this.dialog.open(AgregarAlmacenComponent, dc).afterClosed().subscribe(result => {
        this.getAlmacenesList();
      });
    }
    createConcepto(){
      const dc= new MatDialogConfig;
      dc.disableClose= true;
      dc.autoFocus= true;
      dc.width= "90%";
      dc.height= "90%";
      this.dialog.open(AgregarConceptoComponent, dc).afterClosed().subscribe(result => {
        this.getConceptosList();
      });
    }

    addArticulo(row: any){
      const dc= new MatDialogConfig;
      dc.disableClose= true;
      dc.autoFocus= true;
      dc.width= "90%";
      dc.height= "90%";
      dc.data={
        art: row
      }
      this.dialog.open(InfoArticuloComponent, dc).afterClosed().subscribe(result => {
        this.getAgregadosTable();
      });
    }

    eliminarArticulo(row: any){
      const dc= new MatDialogConfig;
      dc.disableClose= true;
      dc.autoFocus= true;
      dc.width= "70%";
      dc.height= "70%";
      dc.data={
        art: row
      }
      this.dialog.open(EliminarInfoArticuloComponent, dc).afterClosed().subscribe(result => {
        this.getAgregadosTable();
      });
    }

    editarArticulo(row: any){
      const dc= new MatDialogConfig;
      dc.disableClose= true;
      dc.autoFocus= true;
      dc.width= "90%";
      dc.height= "90%";
      dc.data={
        art: row
      }
      this.dialog.open(EditarInfoArticuloComponent, dc).afterClosed().subscribe(result => {
        this.getAgregadosTable();
      });
    }
    ////// /Formularios externos
    validate() { // No mover
    
    }
}
