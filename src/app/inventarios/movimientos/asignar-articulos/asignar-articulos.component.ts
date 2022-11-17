import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from '../../compras/compras.service';
import { NACompra } from 'src/app/shared/classes/NACompra';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { Usuario } from 'src/app/shared/classes/usuario';
import { NAElementoCompra } from 'src/app/shared/classes/NAElementoCompra';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { AlmacenesService } from 'src/app/catalogos/almacenes/almacenes.service';
import { DatePipe } from '@angular/common';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { NAElementoMovimiento } from 'src/app/shared/classes/NAElementoMovimiento';
import { AgreagrArticuloAsignacionComponent } from '../agreagr-articulo-asignacion/agreagr-articulo-asignacion.component';
import { EditarArticuloAsignacionComponent } from '../editar-articulo-asignacion/editar-articulo-asignacion.component';
import { EliminarArticuloAsignacionComponent } from '../eliminar-articulo-asignacion/eliminar-articulo-asignacion.component';
import { NAMovimiento } from 'src/app/shared/classes/NAMovimiento';
import { MovimientosService } from 'src/app/inventarios/movimientos/movimientos.service';
import { NANotidicacion } from 'src/app/shared/classes/NANotificacion';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-asignar-articulos',
  templateUrl: './asignar-articulos.component.html',
  styleUrls: ['./asignar-articulos.component.scss']
})
export class AsignarArticulosComponent implements OnInit {

  currentIndex=-1;
  theForm: FormGroup;  
  submitted= false;                                                   
  spinner: SpinnerComponent= new SpinnerComponent;                    
  working: boolean= false;                                            
  compraID: number;
  compra: NACompra= new NACompra;
  currentUser: Usuario;
  encontrado= false;
  elementos: NAElementoCompra[]=[];
  els: NAElementoCompra[]=[];
  almacenes: Almacen[]=[];
  almacen: Almacen= new Almacen;
  locacion: Locacion;
  locaciones$: Locacion[];
  agregados: NAElementoMovimiento[];
  elementosTabla: any[]=[];
  notificacion: NANotidicacion;
  now: number;
  nowString: string;
  displayColumns: string[]= ['FirebaseID', 'Nombre', 'Presentacion', 'Costo', 'Cantidad', 'Mover', 'Acciones'];
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private theService: ComprasService,
    private formBuilder: FormBuilder, 
    private notificationService: NotificationsService,
    private almacenesService: AlmacenesService,
    private datepipe: DatePipe,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private movsService: MovimientosService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
        proveedor: [''],
        razonsocial: [''],
        factura: [''],
        fechaFactura:[''],
        notas: [''],
        almacenSelect: [''],
        locacionSelect: ['']
    });
    this.compraID= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getDetail();
    this.getAlmacenes();
  }

  getDetail(){
    this.theService.getDetail(this.compraID)
      .subscribe(
        (res) => {
          //console.log("Res: ", res);
          this.compra= res as NACompra;
          this.theForm.controls.proveedor.setValue(this.compra.RazonSocial.Proveedor.Nombre);
          this.theForm.controls.razonsocial.setValue(this.compra.RazonSocial.RazonSocial);
          this.theForm.controls.factura.setValue(this.compra.Factura);
          this.theForm.controls.fechaFactura.setValue(this.compra.FechaFactura);
          this.theForm.controls.notas.setValue(this.compra.Notas);
          //console.log("Elementos: ", this.compra.Elementos);
          this.elementosTabla= this.compra.Elementos
          this.listData= new MatTableDataSource(this.elementosTabla as NAElementoCompra[]);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
        }
      );
      this.changeDetectorRefs.detectChanges(); 
  }

  getAlmacenes(){
    this.almacenesService.getItems()
      .subscribe(
        (res) => {
          this.almacenes= res as Almacen[];
          console.log("Almacenes: ", this.almacenes)
        }
      );
  }

  updateDrop(obj: any){
    this.almacen= this.almacenes.find(x => x.AlmacenID==this.theForm.controls.almacenSelect.value);
    let o= this.almacen as any;
    this.locaciones$= o.NALocaciones; 
    //console.log('Locaciones: ', this.locaciones$);
  }

  updateLoc(obj: any){
    this.locacion= this.locaciones$.find(x => x.LocacionID==this.theForm.controls.locacionSelect.value);
    //console.log("Loc: ", this.locacion);
  }

  updateList(){
    let el: any=[];
    let str= localStorage.getItem('itemCompra');
    el= JSON.parse(str) as any;
    this.elementosTabla[this.currentIndex]= el;
    this.changeDetectorRefs.detectChanges();
    localStorage.removeItem('itemCompra');
  }

  onAdd(row: any){
    let el= this.elementosTabla.find(x => x==row);
    this.currentIndex= this.elementosTabla.indexOf(row);
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      index: this.currentIndex,
      art: row,
      al: this.almacen,
      loc: this.locacion
    }
    this.dialog.open(AgreagrArticuloAsignacionComponent, dc).afterClosed().subscribe(result => {
      this.updateList();
    });
  }

  onEdit(row: any){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theID: row.ConceptoID
    }
    this.dialog.open(EditarArticuloAsignacionComponent, dc).afterClosed().subscribe(result => {
      this.getDetail();
    });
  }

  onDelete(row: any){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theID: row.ConceptoID
    }
    this.dialog.open(EliminarArticuloAsignacionComponent, dc).afterClosed().subscribe(result => {
      this.getDetail();
    });
  }
  

  validate(){
    let movimiento= new NAMovimiento;
    movimiento.Creo= 0;
    movimiento.Destino= this.locacion.LocacionID;
    movimiento.Origen= 0;
    this.now= Date.now();
    this.nowString= this.datepipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss.sss');
    movimiento.Modificado=  this.nowString;
    movimiento.Creado=  this.nowString;
    movimiento.Modifico= 0;
    movimiento.Notas= this.compra.Notas;
    movimiento.Autorizo= 0;
    movimiento.Autorizado= this.nowString;
    movimiento.ConceptoID= 0;
    movimiento.Elementos= [];
    for(var e of this.elementosTabla){
      let ele = new NAElementoMovimiento;
      let el= e as any;
      ele.Cantidad= el.Added;
      ele.EntidadID= 0;
      ele.PresentacionID= el.PresentacionID;
      ele.Tipo= el.Tipo;
      ele.Costo= el.Costo;
      movimiento.Elementos.push(ele);
    }
    console.log("Movimiento a agregar: ", movimiento);
    this.movsService.addRecord(movimiento)
    .subscribe(
      (res)=>{
        this.compra.Elementos= [];
        for(var e of this.elementosTabla){
          let ele = new NAElementoCompra;
          let el= e as any;
          ele.Cantidad= el.Cantidad;
          ele.ElementoID= el.ElementoID;
          ele.Disponible= el.Disponible
          ele.PresentacionID= el.PresentacionID;
          ele.Costo= el.Costo;
          ele.CompraID= this.compra.CompraID;
          this.compra.Elementos.push(ele);
        }
        this.theService.addUpdateElementos(this.compra.Elementos)
          .subscribe(
            () => {
              //Enviar notificación a Firebase
              this.notificacion= new NANotidicacion;
              this.notificacion.emitio= 0;
              this.notificacion.respondio= 0;
              this.notificacion.estatus='Pendiente';
              this.notificacion.proceso= 'Asignación';
              this.notificacion.businesID='noiseapp';
              this.notificacion.creacion= this.nowString;
              var sdate = new Date();
              sdate.setDate(sdate.getDate() + 5);
              this.notificacion.caducidad= this.datepipe.transform(sdate, 'yyyy-MM-dd hh:mm:ss.sss');
              let or=0;
              this.notificacion.origen= [
                {
                  id: or.toString(),
                  entidad: 'comisariato'
                }
              ]
              this.notificacion.destino= [
                {
                  id: this.locacion.LocacionID.toString(),
                  entidad: 'locacion'
                }
              ]
              let data = Object.assign({}, this.notificacion);
              this.firestore.collection<any>('notificaciones').add(data)
                .then(
                  res => {
                    this.notificationService.success("Movimiento agregado");
                    this.router.navigateByUrl('/hawk/inventarios/compras/lista-compras');
                  },
                  err => {
                    this.notificationService.success("Error al agregar artículo");
                  }
                );
            },
            err => {
              this.notificationService.error("Error")
            }
          );
      },
      err => {
        this.notificationService.error("Error")
      }
    )
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

  onClose(){}
}
