import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NACompra } from 'src/app/shared/classes/NACompra';
import { ComprasService } from '../compras.service';
import { Router } from '@angular/router';
import { EliminarCompraComponent } from '../eliminar-compra/eliminar-compra.component';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss']
})
export class ListaComprasComponent implements OnInit {

///////////////////// No mover !!! ///////////////////
  searchKey: string;                                //
  spinner: SpinnerComponent= new SpinnerComponent;  //
  working: boolean=true;                            //
  listData: MatTableDataSource<any>;                //
                                                    //
  @ViewChild(MatSort) sort: MatSort;                //
  @ViewChild(MatPaginator) paginator: MatPaginator; //
/////////////////// /No mover !!! ////////////////////

compras: NACompra[]; // Adaptar al nombre de objeto
displayColumns: string[]=['Fecha','Proveedor','Estatus','Factura','acciones']; // Adaptar las columnas (actualizar tabla)

  constructor(
    private dialog: MatDialog, // No mover!!!
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
    private theService: ComprasService, //Cambiar por el servicio correspondiente
    private router: Router
  ) { }

  ngOnInit() {

    localStorage.removeItem("itemCompra");
    this.getList(); //No mover

  }

  getList(): void{
    this.theService.getItems()
    .subscribe(
      (res) => {
        console.log("List data: ", res);
        this.compras = res as NACompra[];
        this.listData= new MatTableDataSource(this.compras);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
      });
      this.changeDetectorRefs.detectChanges();
  }

  ///////// Buscador No mover!!! /////////

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }

  ///////// Buscador ////////////////////

  onCreate(){
  
    this.router.navigateByUrl('/hawk/inventarios/compras/agregar-compra');
  
  }

  onMovement(row: any){

    let route='/hawk/inventarios/movimientos/asignar-articulos';
    this.router.navigate([route, row.CompraID], {queryParams:{obj: row}});
    
  }

  
  onDelete(row: any){
      
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      ID: row.CompraID
    }
    this.dialog.open(EliminarCompraComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
    

  }
  

}
