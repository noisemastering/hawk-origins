///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';        //
import {                                                                                //
  MatPaginator,                                                                         //
  MatSort,                                                                              //
  MatTableDataSource,                                                                   //
  MatDialog,                                                                            //
  MatDialogConfig} from '@angular/material';                                            // 
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Concepto } from 'src/app/shared/classes/concepto';

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { AgregarConceptoComponent } from 'src/app/catalogos/conceptos/agregar-concepto/agregar-concepto.component';
import { DetalleConceptoComponent } from 'src/app/catalogos/conceptos/detalle-concepto/detalle-concepto.component';
import { EliminarConceptoComponent } from 'src/app/catalogos/conceptos/eliminar-concepto/eliminar-concepto.component';
import { EditarConceptoComponent } from 'src/app/catalogos/conceptos//editar-concepto/editar-concepto.component';
import { ConceptosService } from '../conceptos.service';

@Component({
  selector: 'app-lista-conceptos',
  templateUrl: './lista-conceptos.component.html',
  styleUrls: ['./lista-conceptos.component.scss']
})
export class ListaConceptosComponent implements OnInit {

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

conceptos: Concepto[]; // Adaptar al nombre de objeto
displayColumns: string[]=['Nombre','Tipo','acciones']; // Adaptar las columnas (actualizar tabla)

constructor(
  private dialog: MatDialog, // No mover!!!
  private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
  private theService: ConceptosService //Cambiar por el servicio correspondiente
  ) { }

ngOnInit() {

  //Traer la lista de datos
  this.getList(); //No mover
  
}

////// Funciones


///////// Traer datos

///////// Cambiar el objeto y el servicio
getList(): void{
  this.theService.getItems()
  .subscribe(
    (res) => {
      console.log("List data: ", res);
      this.conceptos = res as Concepto[];
      this.listData= new MatTableDataSource(this.conceptos);
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
  this.dialog.open(AgregarConceptoComponent, dc).afterClosed().subscribe(result => {
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
    theID: row.ConceptoID
  }
  this.dialog.open(EditarConceptoComponent, dc).afterClosed().subscribe(result => {
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
    theID: row.ConceptoID
  }
  this.dialog.open(DetalleConceptoComponent, dc).afterClosed().subscribe(result => {
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
    theID: row.ConceptoID
  }
  this.dialog.open(EliminarConceptoComponent, dc).afterClosed().subscribe(result => {
    this.getList();
  });
}

///////// Ventanas /////////

}
