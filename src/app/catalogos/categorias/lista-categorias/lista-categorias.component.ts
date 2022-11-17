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

///////////////////// Cargar los objetos y servicios del catálogo en cuestión (con rutas absolutas)
import { Categoria } from 'src/app/shared/classes/categoria'

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { AgregarCategoriaComponent } from 'src/app/catalogos/categorias/agregar-categoria/agregar-categoria.component';
import { DetalleCategoriaComponent } from 'src/app/catalogos/categorias/detalle-categoria/detalle-categoria.component';
import { EliminarCategoriaComponent } from 'src/app/catalogos/categorias/eliminar-categoria/eliminar-categoria.component';
import { EditarCategoriaComponent } from 'src/app/catalogos/categorias//editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit {

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

categorias: Categoria[]; // Adaptar al nombre de objeto
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
    let cat= new Categoria;
    this.theService.serviceURL= cat.serviceURL; //Poner la URL del obejto correspondiente
    this.theService.getItems()
    .subscribe(
      (response: Response) => {
        this.categorias = response.object as Categoria[];
        this.listData= new MatTableDataSource(this.categorias);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
        //console.log("List data: ", this.categorias);
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
    this.dialog.open(AgregarCategoriaComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(EditarCategoriaComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(DetalleCategoriaComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(EliminarCategoriaComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }

  ///////// Ventanas /////////

}
