import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { 
  MatPaginator, 
  MatSort, 
  MatTableDataSource, 
  MatTableModule, 
  MatTable,  
  MatDialog, 
  MatDialogConfig, 
  MatDialogRef, 
  MAT_DIALOG_DATA } from '@angular/material';
import { Response } from 'src/app/shared/classes/response';
import { CentroConsumo } from 'src/app/shared/classes/centro-consumo';
import { CentroConsumoService } from '../centro-consumo.service';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { Router } from '@angular/router';
import { AgregarCentroConsumoComponent } from '../agregar-centro-consumo/agregar-centro-consumo.component';
import { EditarCentroConsumoComponent } from '../editar-centro-consumo/editar-centro-consumo.component';
import { DetalleCentroConsumoComponent } from '../detalle-centro-consumo/detalle-centro-consumo.component';
import { EliminarCentroConsumoComponent } from '../eliminar-centro-consumo/eliminar-centro-consumo.component';

@Component({
  selector: 'app-lista-centros-consumo',
  templateUrl: './lista-centros-consumo.component.html',
  styleUrls: ['./lista-centros-consumo.component.scss']
})
export class ListaCentrosConsumoComponent implements OnInit {

  centros: CentroConsumo[];
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['ID','Descripcion','acciones'];
  searchKey: string;
  spinner: SpinnerComponent= new SpinnerComponent;
  working: boolean=true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private theService: CentroConsumoService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private notification: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList(): void{
    this.working= true;
    this.theService.getItems()
    .subscribe(
      (response) => {
        console.log("Entró a get list", response);
        this.centros = response as CentroConsumo[];
        this.listData= new MatTableDataSource(this.centros);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
        console.log("List data: ", response);
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        console.log("Entró a get list");
        console.log("List data: ", this.centros);
        this.notification.error("Error: "+ err);
        this.changeDetectorRefs.detectChanges();
        this.working= false
      }
      );
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    this.dialog.open(AgregarCentroConsumoComponent, dc).afterClosed().subscribe(result => {
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
      theID: row.CentroConsumoID
    }
    this.dialog.open(EditarCentroConsumoComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }

  onDetail(row: any){
    
    console.log('Row: ',row);
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theID: row.CentroConsumoID
    }
    this.dialog.open(DetalleCentroConsumoComponent, dc).afterClosed().subscribe(result => {
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
      theID: row.CentroConsumoID
    }
    this.dialog.open(EliminarCentroConsumoComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }

  onLocations(row: any){
    this.router.navigate(['hawk/catalogos/centros-locaciones/'], {queryParams: {CentroConsumoID: row.CentroConsumoID}});
  }

}
