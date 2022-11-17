///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';        //
import {                                                                                //
  MatPaginator,                                                                         //
  MatSort,                                                                              //
  MatTableDataSource,                                                                   //
  MatDialog,                                                                            //
  MatDialogConfig} from '@angular/material';                                            // 
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           // 
import { Response } from 'src/app/shared/classes/response';                             //
import { CatalogosService } from 'src/app/servicios/catalogos.service';                 //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { ArticuloMovimientoCat } from 'src/app/shared/classes/articulo-movimiento-cat';
import { Router } from '@angular/router';

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
//import { AgregarAlmacenComponent } from 'src/app/catalogos/almacenes/agregar-almacen/agregar-almacen.component';
//import { DetalleAlmacenComponent } from 'src/app/catalogos/almacenes/detalle-almacen/detalle-almacen.component';
//import { EliminarAlmacenComponent } from 'src/app/catalogos/almacenes/eliminar-almacen/eliminar-almacen.component';
//import { EditarAlmacenComponent } from 'src/app/catalogos/almacenes//editar-almacen/editar-almacen.component';


@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.scss']
})
export class ListaEntradasComponent implements OnInit {

  ///////////// Variables

///////////////////// No mover !!! ///////////////////
searchKey: string;                                //
spinner: SpinnerComponent= new SpinnerComponent;  //
working: boolean=true;                            //
listData: MatTableDataSource<any>;                //
                                                  //
@ViewChild(MatSort) sort: MatSort;                //
@ViewChild(MatPaginator) paginator: MatPaginator; //
/////////////////// /No mover !!! ////////////////////

articulos: ArticuloMovimientoCat[]; // Adaptar al nombre de objeto
displayColumns: string[]=['AutoID','DescArticulo','DescConcepto','Fecha','acciones']; // Adaptar las columnas (actualizar tabla)

constructor(
  private dialog: MatDialog, // No mover!!!
  private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
  private theService: CatalogosService, //Cambiar por el servicio correspondiente
  private router: Router
  ) { }

ngOnInit() {

  //Traer la lista de datos
  this.getList(); //No mover
  
}

////// Funciones


///////// Traer datos

///////// Cambiar el objeto y el servicio
getList(): void{
  let art= new ArticuloMovimientoCat;
  this.theService.serviceURL= art.ServiceURL; //Poner la URL del obejto correspondiente
  this.theService.getItems()
  .subscribe(
    (response: Response) => {
      this.articulos = response.object as ArticuloMovimientoCat[];
      this.listData= new MatTableDataSource(this.articulos);
      this.listData.sort= this.sort;
      this.listData.paginator= this.paginator;
      this.working= false;
      console.log("List data: ", this.articulos);
    });
    this.changeDetectorRefs.detectChanges();
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

///////// Buscador ////////////////////


///////// Ventanas /////////
///////// Adaptar los nombres de los componentes
onCreate(){
  this.router.navigateByUrl('/hawk/inventarios/movimientos/entradas');
}
/*
onEdit(row: any){
  const dc= new MatDialogConfig;
  dc.disableClose= true;
  dc.autoFocus= true;
  dc.width= "90%";
  dc.height= "90%";
  dc.data={
    theID: row.ID
  }
  this.dialog.open(EditarAlmacenComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}*/
/*
onDetail(row: any){
  
  console.log('Row: '+JSON.stringify(row));
  
  const dc= new MatDialogConfig;
  dc.disableClose= true;
  dc.autoFocus= true;
  dc.width= "90%";
  dc.height= "90%";
  dc.data={
    theID: row.ID
  }
  this.dialog.open(DetalleAlmacenComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
  

}*/
/*
onDelete(row: any){
  
  //console.log('Row: '+JSON.stringify(row));
  
  const dc= new MatDialogConfig;
  dc.disableClose= true;
  dc.autoFocus= true;
  dc.width= "90%";
  dc.height= "90%";
  dc.data={
    theID: row.ID
  }
  this.dialog.open(EliminarAlmacenComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}
*/
}
