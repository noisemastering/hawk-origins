import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
///////////// No Mover /////////////////////////////////////////////
import { Injectable } from '@angular/core';                       //
import { Observable, of } from 'rxjs';                            //
import { HttpClient, HttpHeaders} from '@angular/common/http';    //
import { Request } from 'src/app/shared/classes/request';         //
import { Usuario } from 'src/app/shared/classes/usuario';         //
import { GenericList } from 'src/app/shared/classes/generic-list';//
import { Strings } from '../../../shared/classes/strings';           //
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { LocacionesService } from '../locaciones.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { AgregarLocacionComponent } from '../agregar-locacion/agregar-locacion.component';
import { EditarLocacionComponent } from '../editar-locacion/editar-locacion.component';
import { DetalleLocacionComponent } from '../detalle-locacion/detalle-locacion.component';
import { EliminarLocacionComponent } from '../eliminar-locacion/eliminar-locacion.component';
///////////// /No Mover ////////////////////////////////////////////

@Component({
  selector: 'app-lista-locaciones',
  templateUrl: './lista-locaciones.component.html',
  styleUrls: ['./lista-locaciones.component.scss']
})
export class ListaLocacionesComponent implements OnInit {

  almacen: Almacen;
  locaciones: Locacion[];
  working: boolean= true;
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['Nombre','acciones'];
  searchKey: string;
  spinner: SpinnerComponent= new SpinnerComponent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private route: ActivatedRoute,
    private theService: LocacionesService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private notification: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.almacen= new Almacen;
    this.route.queryParams.subscribe(
      p => {this.almacen.AlmacenID= p['AlmacenID']}
    );
    this.getList();
  }

  getList(): void{
    this.working= true;
    this.theService.getLocations(this.almacen.AlmacenID)
    .subscribe(
      (response) => {
        console.log("Entró a get list");
        this.almacen = response as Almacen;
        this.locaciones = response.NALocaciones as Locacion[];
        this.listData= new MatTableDataSource(this.locaciones);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
        console.log("List data: ", response);
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        console.log("Entró a get list");
        console.log("List data: ", this.locaciones);
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
    this.dialog.open(AgregarLocacionComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(EditarLocacionComponent, dc).afterClosed().subscribe(result => {
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
    this.dialog.open(DetalleLocacionComponent, dc).afterClosed().subscribe(result => {
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
      theID: row.LocacionID
    }
    this.dialog.open(EliminarLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getList();
    });
  }

  onItems(row: any){
    this.router.navigate(['hawk/catalogos/locaciones-articulos/'], {queryParams: {LocacionID: row.LocacionID}});
  }

  onCCs(row: any){
    this.router.navigate(['hawk/catalogos/locaciones-centros-consumo/'], {queryParams: {LocacionID: row.LocacionID}});
  }
}
