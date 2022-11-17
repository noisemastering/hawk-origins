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
import { Articulo } from 'src/app/shared/classes/articulo';

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { DetalleArticuloComponent } from 'src/app/catalogos/articulos/detalle-articulo/detalle-articulo.component';
import { EliminarArticuloComponent } from 'src/app/catalogos/articulos/eliminar-articulo/eliminar-articulo.component';
import { AgregarAlCarritoComponent } from 'src/app/herramientas/carrito/agregar-al-carrito/agregar-al-carrito.component';
import { Router } from '@angular/router';
import { ArticulosService } from '../articulos.service';

///////////// Adaptar al nombre //////////////////////////////////////////////////////////
@Component({                                                                            
  selector: 'app-lista-articulos',                                                     
  templateUrl: './lista-articulos.component.html',                                       
  styleUrls: ['./lista-articulos.component.scss']                                       
})                                                                                      
///////////// //Adaptar al nombre ////////////////////////////////////////////////////////  


export class ListaArticulosComponent implements OnInit {

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

  articulos: Articulo[]; // Adaptar al nombre de objeto
  displayColumns: string[]=['FirebaseID','Nombre','Subcategoria', 'Tipo', 'acciones']; // Adaptar las columnas (actualizar tabla)
  
  constructor(
    private dialog: MatDialog, // No mover!!!
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
    private theService: ArticulosService, //Cambiar por el servicio correspondiente
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
    let art = new Articulo;
    this.theService.getNAItems()
    .subscribe(
      (response: Response) => {
        let arts: any[];
        arts= response as any;
        console.log("Articulos: ", arts)
        this.listData= new MatTableDataSource(arts);
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
    this.router.navigateByUrl('/hawk/catalogos/articulos/maestro');
  }

  onEdit(row: any){

    let route='/hawk/catalogos/articulos/editar';
    //var url = `${route}/${id}`;
    this.router.navigate([route, row.ID], {queryParams:{obj: row}});
  }

  onLocations(row: any){

    let route='/hawk/catalogos/articulos/articulos-locaciones';
    let loc=0;
    this.router.navigate([route, row.FirebaseID, loc]);
  }

  onProviders(row: any){

    let route='/hawk/catalogos/articulos/articulos-proveedores';
    this.router.navigate([route, row.FirebaseID]);
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
    
    //console.log('Row: '+JSON.stringify(row));
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theID: row.ID
    }
    this.dialog.open(EliminarArticuloComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
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