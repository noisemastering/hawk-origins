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
import { Paquete } from 'src/app/shared/classes/paquete';

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { AgregarPaqueteComponent } from 'src/app/ventas/banquetes/agregar-paquete/agregar-paquete.component';
import { DetallePaqueteComponent } from 'src/app/ventas/banquetes/detalle-paquete/detalle-paquete.component';
import { EliminarPaqueteComponent } from 'src/app/ventas/banquetes/eliminar-paquete/eliminar-paquete.component';
import { EditarPaqueteComponent } from 'src/app/ventas/banquetes//editar-paquete/editar-paquete.component';

@Component({
  selector: 'app-lista-paquetes',
  templateUrl: './lista-paquetes.component.html',
  styleUrls: ['./lista-paquetes.component.scss']
})
export class ListaPaquetesComponent implements OnInit {

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

paquetes: Paquete[]; // Adaptar al nombre de objeto
displayColumns: string[]=['ID','Descripcion','acciones']; // Adaptar las columnas (actualizar tabla)

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
  let paq= new Paquete;
  this.theService.serviceURL=paq.serviceURL; //Poner la URL del obejto correspondiente
  this.theService.getItems()
  .subscribe(
    (response: Response) => {
      this.paquetes = response.object as Paquete[];
      this.listData= new MatTableDataSource(this.paquetes);
      this.listData.sort= this.sort;
      this.listData.paginator= this.paginator;
      this.working= false;
      //console.log("List data: ", this.paquetes);
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
  this.dialog.open(AgregarPaqueteComponent, dc).afterClosed().subscribe(result => {
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
  this.dialog.open(EditarPaqueteComponent, dc).afterClosed().subscribe(result => {
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
  this.dialog.open(DetallePaqueteComponent, dc).afterClosed().subscribe(result => {
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
  this.dialog.open(EliminarPaqueteComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}

///////// Ventanas /////////

}
