import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { NAMovimiento } from 'src/app/shared/classes/NAMovimiento';
import { MovimientosService } from '../movimientos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.scss']
})
export class ListaMovimientosComponent implements OnInit {

  ///////////////////// No mover !!! ///////////////////
  searchKey: string;                                //
  spinner: SpinnerComponent= new SpinnerComponent;  //
  working: boolean=true;                            //
  listData: MatTableDataSource<any>;                //
                                                    //
  @ViewChild(MatSort) sort: MatSort;                //
  @ViewChild(MatPaginator) paginator: MatPaginator; //
/////////////////// /No mover !!! ////////////////////

movimientos: NAMovimiento[]; // Adaptar al nombre de objeto
displayColumns: string[]=['Concepto','Fecha','Origen','Destino','acciones']; // Adaptar las columnas (actualizar tabla)

  constructor(
    private dialog: MatDialog, // No mover!!!
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
    private theService: MovimientosService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getList(); //No mover

  }

  getList(): void{
    this.theService.getItems()
    .subscribe(
      (res) => {
        this.movimientos = res as NAMovimiento[]; 
        this.listData= new MatTableDataSource(this.movimientos);
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

  
  onDetail(row: any){
    let route='/hawk/inventarios/movimientos/detalle-movimiento';
    this.router.navigate([route, row.MovimeintoID]);
    
  }
  

}
