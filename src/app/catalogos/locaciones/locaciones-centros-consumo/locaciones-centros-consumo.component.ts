import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Locacion } from 'src/app/shared/classes/locacion';
import { Almacen } from 'src/app/shared/classes/almacen';
import { CentroConsumo } from 'src/app/shared/classes/centro-consumo';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LocacionesService } from '../locaciones.service';
import { CentroConsumoService } from '../../centros-de-consumo/centro-consumo.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-locaciones-centros-consumo',
  templateUrl: './locaciones-centros-consumo.component.html',
  styleUrls: ['./locaciones-centros-consumo.component.scss']
})
export class LocacionesCentrosConsumoComponent implements OnInit {


  locacionID: number;
  locacion= new Locacion;
  almacen= new Almacen;
  nombreAlmacen: string;
  nombreLocacion: string;
  centros: CentroConsumo[];

///////////////////// No mover !!! ///////////////////
  searchKey: string;                                //
  working: boolean=true;                            //
  listData: MatTableDataSource<any>;                //
                                                    //
  @ViewChild(MatSort) sort: MatSort;                //
  @ViewChild(MatPaginator) paginator: MatPaginator; //  
/////////////////// /No mover !!! ////////////////////

  displayColumns: string[]=['CentroConsumoID','Descripcion','ID_puntoVenta', 'acciones'];
  
  constructor(
    private theRouter: Router,
    private dialog: MatDialog, // No mover!!!
    private activatedRoute: ActivatedRoute,
    private theService: LocacionesService,
    private centrosService: CentroConsumoService,
    private changeDetectorRefs: ChangeDetectorRef,
    private confirmationDialogService: ConfirmationDialogService,
    private notificationService: NotificationsService
  ) { 
    this.activatedRoute.queryParams.subscribe(
      p => {this.locacionID= p['LocacionID']}
    );
    console.log("Loc ID:", this.locacionID);
  }

  ngOnInit() {
    this.getDetail();
  }
 
  ////////// Traer datos
  getDetail(): void {
    this.theService.getDetail(this.locacionID)
      .subscribe((response )=>{
        this.locacion= new Locacion;
        this.locacion = response as Locacion;
        this.almacen= response.NAAlmacen as Almacen; 
        this.nombreAlmacen= this.almacen.Nombre;
        this.nombreLocacion= this.locacion.Nombre;
        this.centros= response.NALocacionesCentros as CentroConsumo[];
        this.listData= new MatTableDataSource(this.centros);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
        this.changeDetectorRefs.detectChanges();
    });
  }


  onUnlink(row: any) {
    this.confirmationDialogService.confirm('Favor de confirmar..', '¿Realmente desea eliminar la relación entre esta locación y este centro de consumo? No se eliminará ninguna de las dos entidades, únicamente la relación entre ellas.')
    .then(
      (confirmed) => {
        this.theService.deleteRelationCC(this.locacion.LocacionID, row.CentroConsumoID)
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
