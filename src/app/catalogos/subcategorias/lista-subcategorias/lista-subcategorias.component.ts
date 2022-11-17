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
import { Subcategoria } from 'src/app/shared/classes/subcategoria';

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { AgregarSubcategoriaComponent } from 'src/app/catalogos/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { DetalleSubcategoriaComponent } from 'src/app/catalogos/subcategorias/detalle-subcategoria/detalle-subcategoria.component';
import { EliminarSubcategoriaComponent } from 'src/app/catalogos/subcategorias/eliminar-subcategoria/eliminar-subcategoria.component';
import { EditarSubcategoriaComponent } from 'src/app/catalogos/subcategorias//editar-subcategoria/editar-subcategoria.component';

@Component({
  selector: 'app-lista-subcategorias',
  templateUrl: './lista-subcategorias.component.html',
  styleUrls: ['./lista-subcategorias.component.scss']
})
export class ListaSubcategoriasComponent implements OnInit {

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

subcategorias: Subcategoria[]; // Adaptar al nombre de objeto
displayColumns: string[]=['ID','Descripcion','nombreCategoria','acciones']; // Adaptar las columnas (actualizar tabla)

constructor(
  private dialog: MatDialog, // No mover!!!
  private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
  private theService: CatalogosService //Cambiar por el servicio correspondiente
  ) { }

ngOnInit() {

  //Traer la lista de datos
  this.getList(); //No mover
  
}

////// Funciones


///////// Traer datos

///////// Cambiar el objeto y el servicio
getList(): void{
  let sub= new Subcategoria;
  this.theService.serviceURL= sub.serviceURL; //Poner la URL del obejto correspondiente
  this.theService.getItems()
  .subscribe(
    (response: Response) => {
      console.log("List data: ", response);
      this.subcategorias = response.object as Subcategoria[];
      this.listData= new MatTableDataSource(this.subcategorias);
      this.listData.sort= this.sort;
      this.listData.paginator= this.paginator;
      this.working= false;
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
  const dc= new MatDialogConfig;
  dc.disableClose= true;
  dc.autoFocus= true;
  dc.width= "90%";
  dc.height= "90%";
  this.dialog.open(AgregarSubcategoriaComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}

onEdit(row: any){
  const dc= new MatDialogConfig;
  dc.disableClose= true;
  dc.autoFocus= true;
  dc.width= "90%";
  dc.height= "90%";
  dc.data={
    theID: row.ID
  }
  this.dialog.open(EditarSubcategoriaComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
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
  this.dialog.open(DetalleSubcategoriaComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
  

}

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
  this.dialog.open(EliminarSubcategoriaComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}

///////// Ventanas /////////

}
