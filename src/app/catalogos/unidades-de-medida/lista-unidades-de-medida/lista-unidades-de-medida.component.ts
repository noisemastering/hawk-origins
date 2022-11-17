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
import { UM } from 'src/app/shared/classes/um';

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { AgregarUnidadesDeMedidaComponent } from 'src/app/catalogos/unidades-de-medida/agregar-unidades-de-medida/agregar-unidades-de-medida.component';
import { DetalleUnidadesDeMedidaComponent } from 'src/app/catalogos/unidades-de-medida/detalle-unidades-de-medida/detalle-unidades-de-medida.component';
import { EliminarUnidadesDeMedidaComponent } from 'src/app/catalogos/unidades-de-medida/eliminar-unidades-de-medida/eliminar-unidades-de-medida.component';
import { EditarUnidadesDeMedidaComponent } from 'src/app/catalogos/unidades-de-medida//editar-unidades-de-medida/editar-unidades-de-medida.component';

@Component({
  selector: 'app-lista-unidades-de-medida',
  templateUrl: './lista-unidades-de-medida.component.html',
  styleUrls: ['./lista-unidades-de-medida.component.scss']
})
export class ListaUnidadesDeMedidaComponent implements OnInit {

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

ums: UM[]; // Adaptar al nombre de objeto
um= new UM;
displayColumns: string[]=['ID','Descripcion','Dimension','acciones']; // Adaptar las columnas (actualizar tabla)

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
  this.theService.serviceURL=this.um.serviceURL; //Poner la URL del obejto correspondiente
  this.theService.getItems()
  .subscribe(
    (response: Response) => {
      this.ums = response.object as UM[];
      this.listData= new MatTableDataSource(this.ums);
      this.listData.sort= this.sort;
      this.listData.paginator= this.paginator;
      this.working= false;
      //console.log("List data: ", this.unidades-de-medida);
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
  this.dialog.open(AgregarUnidadesDeMedidaComponent, dc).afterClosed().subscribe(result => {
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
  this.dialog.open(EditarUnidadesDeMedidaComponent, dc).afterClosed().subscribe(result => {
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
  this.dialog.open(DetalleUnidadesDeMedidaComponent, dc).afterClosed().subscribe(result => {
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
  this.dialog.open(EliminarUnidadesDeMedidaComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}

///////// Ventanas /////////

}
