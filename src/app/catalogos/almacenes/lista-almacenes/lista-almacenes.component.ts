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
import { Almacen } from 'src/app/shared/classes/almacen';
import { AlmacenesService } from '../almacenes.service';
import { AgregarAlmacenComponent } from '../agregar-almacen/agregar-almacen.component';
import { DetalleAlmacenComponent } from '../detalle-almacen/detalle-almacen.component';
import { EliminarAlmacenComponent } from '../eliminar-almacen/eliminar-almacen.component';
import { EditarAlmacenComponent } from '../editar-almacen/editar-almacen.component';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-almacenes',
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.scss']
})
export class ListaAlmacenesComponent implements OnInit {

  almacenes: Almacen[];
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['ID','Nombre','acciones'];
  searchKey: string;
  spinner: SpinnerComponent= new SpinnerComponent;
  working: boolean=true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private theService: AlmacenesService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private notification: NotificationsService,
    private route: Router
  ) { }

  ngOnInit() {
    //this.spinner.message="Cargando";
    this.getList();
  }

  getList(): void{
    this.working= true;
    this.theService.getItems()
    .subscribe(
      (response) => {
        console.log("Entró a get list");
        this.almacenes = response as Almacen[];
        this.listData= new MatTableDataSource(this.almacenes);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
        console.log("List data: ", response);
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        console.log("Entró a get list");
        console.log("List data: ", this.almacenes);
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
    this.dialog.open(AgregarAlmacenComponent, dc).afterClosed().subscribe(result => {
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
      theID: row.AlmacenID
    }
    this.dialog.open(EditarAlmacenComponent, dc).afterClosed().subscribe(result => {
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
      theID: row.AlmacenID
    }
    this.dialog.open(DetalleAlmacenComponent, dc).afterClosed().subscribe(result => {
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
      theID: row.AlmacenID
    }
    this.dialog.open(EliminarAlmacenComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }

  onLocations(row: any){
    this.route.navigate(['hawk/catalogos/locaciones/'], {queryParams: {AlmacenID: row.AlmacenID}});
  }

}
