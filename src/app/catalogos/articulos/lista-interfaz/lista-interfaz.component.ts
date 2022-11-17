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
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Articulo } from 'src/app/shared/classes/articulo';

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { DetalleArticuloComponent } from 'src/app/catalogos/articulos/detalle-articulo/detalle-articulo.component';
import { EliminarArticuloComponent } from 'src/app/catalogos/articulos/eliminar-articulo/eliminar-articulo.component';
import { AgregarAlCarritoComponent } from 'src/app/herramientas/carrito/agregar-al-carrito/agregar-al-carrito.component';
import { Router } from '@angular/router';
import { ArticulosService } from '../articulos.service';
import { ArticuloImportado } from 'src/app/shared/classes/articulo-importado';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-lista-interfaz',
  templateUrl: './lista-interfaz.component.html',
  styleUrls: ['./lista-interfaz.component.scss']
})
export class ListaInterfazComponent implements OnInit {

  ///////////// Variables

///////////////////// No mover !!! ///////////////////
searchKey: string;                                //
spinner: SpinnerComponent= new SpinnerComponent;  //
working: boolean=true;                            //
listData: MatTableDataSource<any>;                //
articulos: ArticuloImportado[];
                                                  //
@ViewChild(MatSort) sort: MatSort;                //
@ViewChild(MatPaginator) paginator: MatPaginator; //  
/////////////////// /No mover !!! ////////////////////

displayColumns: string[]=['ID','Descripcion','ID_Categoria', 'ID_Subcategoria','acciones']; // Adaptar las columnas (actualizar tabla)


constructor(
  private dialog: MatDialog, // No mover!!!
  private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
  private theService: ArticulosService, //Cambiar por el servicio correspondiente
  private router: Router,
  private notificationService: NotificationsService, // No Mover!!!
  ) { }

ngOnInit() {

  //Traer la lista de datos
  this.getList(); //No mover
  
}

////// Funciones


///////// Traer datos

///////// Cambiar el objeto y el servicio
getList(): void{
  //console.log('URL', art.serviceURL);
  this.theService.getItems()
  .subscribe(
    (response) => {
      console.log("Articulos: ", response)
      this.articulos= response as ArticuloImportado[];
      this.listData= new MatTableDataSource(this.articulos);
      this.listData.sort= this.sort;
      this.listData.paginator= this.paginator;
      this.working= false;
      console.log("Articulos: ", this.articulos);
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
  let route='/hawk/catalogos/articulos/importar';
  //var url = `${route}/${id}`;
  this.router.navigateByUrl(route);
}

onImport(row: any){

  let route='/hawk/catalogos/articulos/importar';
  //var url = `${route}/${id}`;
  this.router.navigate([route, row.ID], {queryParams:{obj: row}});
}

onEdit(row: any){

  let route='/hawk/catalogos/articulos/editar';
  //var url = `${route}/${id}`;
  this.router.navigate([route, row.ID], {queryParams:{obj: row}});
}

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
  this.dialog.open(DetalleArticuloComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
  

}

onDelete(row: any){
  
  if (confirm("¿Está seguro de querer borrar este registro?")) {
    console.log("Art a borrar: ", row.ID);
    this.theService.deleteRecord(row.ID)
      .subscribe(
        (res) => {
          this.notificationService.success("Artículo borrado");
        },
        err => {
          this.notificationService.error("Error "+ err);
        }
      );
    
  }
  this.getList();
}

///////// Adaptar los nombres de los componentes
onCart(row: any){
  const dc= new MatDialogConfig;
  dc.disableClose= true;
  dc.autoFocus= true;
  dc.width= "90%";
  dc.height= "90%";
  dc.data={
    row
  }
  this.dialog.open(AgregarAlCarritoComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}

///////// Ventanas /////////

}