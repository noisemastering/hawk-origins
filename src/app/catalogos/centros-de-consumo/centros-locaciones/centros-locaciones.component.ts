import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { CentroConsumoService } from '../centro-consumo.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { CentroConsumo } from 'src/app/shared/classes/centro-consumo';
import { Locacion } from 'src/app/shared/classes/locacion';
import { NALocacionesCentrosConsumo } from 'src/app/shared/classes/locaciones-centros-consumo';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { AgregarCentrosLocacionesComponent } from '../agregar-centros-locaciones/agregar-centros-locaciones.component';
import { DetalleLocacionComponent } from '../../locaciones/detalle-locacion/detalle-locacion.component';

@Component({
  selector: 'app-centros-locaciones',
  templateUrl: './centros-locaciones.component.html',
  styleUrls: ['./centros-locaciones.component.scss']
})
export class CentrosLocacionesComponent implements OnInit {

  centro= new CentroConsumo;
  locaciones: NALocacionesCentrosConsumo[]=[];
  displayColumns: string[]=['LocacionID','Nombre','Almacen','acciones'];
  spinner: SpinnerComponent= new SpinnerComponent;

  ///////////////////// No mover !!! ///////////////////
    searchKey: string;                                //
    working: boolean=true;                            //
    listData: MatTableDataSource<any>;                //
                                                      //
    @ViewChild(MatSort) sort: MatSort;                //
    @ViewChild(MatPaginator) paginator: MatPaginator; //  
  /////////////////// /No mover !!! ////////////////////

  constructor(
    private theRouter: Router,
    private dialog: MatDialog, // No mover!!!
    private activatedRoute: ActivatedRoute,
    private theService: CentroConsumoService,
    private centrosService: CentroConsumoService,
    private changeDetectorRefs: ChangeDetectorRef,
    private confirmationDialogService: ConfirmationDialogService,
    private notificationService: NotificationsService
  ) { 
    this.activatedRoute.queryParams.subscribe(
      (p) => {
        this.centro.CentroConsumoID= p['CentroConsumoID'];
        this.getDetail();
      }
      
    );
  }

  ngOnInit() {
  }

  getDetail(){
    this.theService.getDetail(this.centro.CentroConsumoID)
      .subscribe(
        (res) => {
          this.centro= res as CentroConsumo;
          this.locaciones= this.centro.NALocacionesCentros as NALocacionesCentrosConsumo[];
          this.listData= new MatTableDataSource(this.locaciones);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
          this.changeDetectorRefs.detectChanges();
        }
      );
  }

  onCreate(){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theID: this.centro.CentroConsumoID
    }
    this.dialog.open(AgregarCentrosLocacionesComponent, dc).afterClosed().subscribe(result => {
      this.getDetail();
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
      theID: row.LocacionID
    }
    this.dialog.open(DetalleLocacionComponent, dc).afterClosed().subscribe(result => {
      
    });
  }

  onUnlink(row: any) {
    this.confirmationDialogService.confirm('Favor de confirmar..', '¿Realmente desea eliminar la relación entre esta locación y este centro de consumo? No se eliminará ninguna de las dos entidades, únicamente la relación entre ellas.')
    .then(
      (confirmed) => {
        this.theService.deleteRelationCC(row.LocacionID, this.centro.CentroConsumoID)
        .subscribe(
          () => {
            this.notificationService.success('Relación eliminada');
            this.getDetail();
          },
          error => {console.log('Error: '+ error)}
        )
        
      }
    )
    .catch(() => console.log('Cancelado'));
  }


}
