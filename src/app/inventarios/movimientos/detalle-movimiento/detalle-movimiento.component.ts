import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NAMovimiento } from 'src/app/shared/classes/NAMovimiento';
import { MovimientosService } from '../movimientos.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { NAElementoMovimiento } from 'src/app/shared/classes/NAElementoMovimiento';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.scss']
})
export class DetalleMovimientoComponent implements OnInit {

  movimiento= new NAMovimiento;
  working: boolean= true;
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['Articulo', 'Cantidad', 'Presentacion', 'acciones'];
  searchKey: string;
  spinner= new SpinnerComponent;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  theForm: FormGroup;  
  elementos: NAElementoMovimiento[]=[];

  ///// Adaptar al objeto correspondiente
  title: string="Proveedores ligados con este artículo";

  constructor(
    private activatedRoute: ActivatedRoute,
    private theService: MovimientosService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private notificationService: NotificationsService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder
  ) {
    this.movimiento.MovimeintoID= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit() {

    this.theForm = this.formBuilder.group({
      concepto: [''],
      fecha: [''],
      origen: [''],
      destino:[''],
      realizo:['']
    });

    this.getRecord();
  }

  getRecord(){
    this.theService.getDetail(this.movimiento.MovimeintoID)
      .subscribe(
        (res) => {
          this.movimiento = res as NAMovimiento;
          console.log('Ileana: ', this.movimiento);
          this.theForm.controls.concepto.setValue(this.movimiento.Concepto.Nombre);
          this.theForm.controls.origen.setValue(this.movimiento.LocacionOrigen.NAAlmacen.Nombre+' - '+this.movimiento.LocacionOrigen.Nombre);
          this.theForm.controls.destino.setValue(this.movimiento.LocacionDestino.NAAlmacen.Nombre+' - '+this.movimiento.LocacionDestino.Nombre);
          this.theForm.controls.fecha.setValue(this.movimiento.Creado);
          this.theForm.controls.realizo.setValue(this.movimiento.UserCreo.Profile.Nombres+' '+this.movimiento.UserCreo.Profile.Apellidos);
          this.elementos= this.movimiento.Elementos;
          this.listData= new MatTableDataSource(this.elementos);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
          this.changeDetectorRefs.detectChanges();
        },
        err => {

        }
      )
  }

}
