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

///////////////////// Cargar los componentes del catálogo en cuestión  (con rutas absolutas)
import { AgregarProveedorComponent } from 'src/app/catalogos/proveedores/agregar-proveedor/agregar-proveedor.component';
import { DetalleProveedorComponent } from 'src/app/catalogos/proveedores/detalle-proveedor/detalle-proveedor.component';
import { EliminarProveedorComponent } from 'src/app/catalogos/proveedores/eliminar-proveedor/eliminar-proveedor.component';
import { EditarProveedorComponent } from 'src/app/catalogos/proveedores//editar-proveedor/editar-proveedor.component';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { ProveedoresService } from '../proveedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.scss']
})
export class ListaProveedoresComponent implements OnInit {

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

  proveedores: NAProveedor[]; // Adaptar al nombre de objeto
  displayColumns: string[]=['Nombre','Email','Localidad','acciones']; // Adaptar las columnas (actualizar tabla)

  constructor(
    private dialog: MatDialog, // No mover!!!
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
    private theService: ProveedoresService, //Cambiar por el servicio correspondiente
    private router: Router
    ) { }

    ngOnInit() {

      //Traer la lista de datos
      this.getList(); //No mover
      
    }
////// Funciones


  ///////// Traer datos

  ///////// Cambiarel objeto y el servicio
  getList(): void{
    this.theService.getItems()
    .subscribe(
      (response) => {
        console.log("List data: ", response);
        this.proveedores = response as NAProveedor[];
        this.listData= new MatTableDataSource(this.proveedores);
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
    this.dialog.open(AgregarProveedorComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(EditarProveedorComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(DetalleProveedorComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(EliminarProveedorComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }
  ///////// /Ventanas /////////

  onList(row: any){
    let route='/hawk/catalogos/proveedores/razones-sociales';
    this.router.navigate([route, row.ProveedorID], {queryParams:{obj: row}});
  }
  ///////// /Ventanas /////////
}