import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Locacion } from 'src/app/shared/classes/locacion';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LocacionesService } from '../locaciones.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { EditarArticuloLocacionComponent } from '../../articulos/editar-articulo-locacion/editar-articulo-locacion.component';
import { DetalleArticuloLocacionComponent } from '../../articulos/detalle-articulo-locacion/detalle-articulo-locacion.component';
import { EliminarArticuloLocacionComponent } from '../../articulos/eliminar-articulo-locacion/eliminar-articulo-locacion.component';
import { MovimientoSimpleComponent } from '../movimiento-simple/movimiento-simple.component';
import { NAArticuloExistencia } from 'src/app/shared/classes/NAArticuloExistencia';
import { AlmacenesService } from '../../almacenes/almacenes.service';
import { Almacen } from 'src/app/shared/classes/almacen';


@Component({
  selector: 'app-locaciones-articulos',
  templateUrl: './locaciones-articulos.component.html',
  styleUrls: ['./locaciones-articulos.component.scss']
})
export class LocacionesArticulosComponent implements OnInit {

  theForm: FormGroup;
  submitted= false;

  ///// Adaptar al objeto correspondiente
  title: string="Administrar locaciones para artículo";
  currentUMB: string;
  articulos: any[];
  locacion: Locacion;
  almacen: string;
  nombre: string;
  almacenes: Almacen[];
  locaciones$:  Locacion[];
  almacenSelected: Almacen;
  
  FirebaseID: string;
  locacionID: number;
  ArticuloID: number;

  working: boolean= true;
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['Articulo','Tipo','Maximo', 'Minimo', 'Existencias', 'acciones'];
  searchKey: string;
  spinner: SpinnerComponent= new SpinnerComponent;
  complex= false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private theRoute: ActivatedRoute, // No mover!!!
    private theService: LocacionesService,
    private almacenesService: AlmacenesService,
    private formBuilder: FormBuilder, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private theRouter: Router, // No mover!!!
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.theRoute.queryParams.subscribe(
      p => {this.locacionID= p['LocacionID']}
    );
    console.log("Loc ID:", this.locacionID);
    this.theForm = this.formBuilder.group({
      almacenSelect: [''],
      locacionSelect: ['']
    });
    this.getDetail();
  }

  getDetail(){
    this.theService.getDetail(this.locacionID)
      .subscribe((response )=>{
        this.locacion= new Locacion;
        this.locacion = response as Locacion;
        this.almacen= response.NAAlmacen.Nombre;
        this.nombre= response.Nombre;
        this.working= false; //No mover
        this.getArticulos(this.locacionID);
    });
  }

  getArticulos(id: number){
    this.theService.listaLocacionesArticulos(id)
      .subscribe(
        res => {
          this.articulos = res as any[];
          //Calculamos las existencias
          let i=0;
          for(let ar of this.articulos){
            let arr: NAArticuloExistencia[]=[];
            arr= this.locacion.Existencias.filter(x => x.ArticuloID==ar.ArticuloID);
            let ex=0;
            for(let ae of arr){
              ex+= ae.Existencia;
            }
            ar.ExistenciaTeorica= ex;
            this.articulos[i]=ar;
            i++;
          }
          this.listData= new MatTableDataSource(this.articulos);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
          this.changeDetectorRefs.detectChanges();
        },
        err => {

        }
      );
  }

  onCreate(){
    let route='/hawk/catalogos/locaciones-articulos-lista';
    //var url = `${route}/${id}`;
    this.theRouter.navigate([route, this.locacion.LocacionID], {queryParams:{obj: this.locacion}});
  }

  onEdit(row: any){
    console.log("Fila: ", row);
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theArticuloID: row.ArticuloID,
      theFirebaseID: row.FirebaseID,
      theName: row.NAArticulo.Nombre,
      theCategory: row.NAArticulo.Categoria,
      theSubcategory: row.NAArticulo.Subcategoria,
      theType: row.NAArticulo.Tipo,
      theMax: row.NAArticulo.StockMaximo,
      theMin: row.NAArticulo.StockMinimo,
      ubase: row.NAArticulo.Ubase,
      theLocation: this.locacion,
      theCurrentMax: row.StockMaximo,
      theCurrentMin: row.StockMinimo,
      thePhysical: row.ExistenciaFisica,
      theTheoretical: row.ExistenciaTeorica,
    }
    this.dialog.open(EditarArticuloLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getArticulos(this.locacionID);
      this.changeDetectorRefs.detectChanges();
    });
  }

  onDetail(row: any){
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theArticuloID: row.ArticuloID,
      theFirebaseID: row.FirebaseID,
      theName: row.NAArticulo.Nombre,
      theCategory: row.NAArticulo.Categoria,
      theSubcategory: row.NAArticulo.Subcategoria,
      theType: row.NAArticulo.Tipo,
      theMax: row.NAArticulo.StockMaximo,
      theMin: row.NAArticulo.StockMinimo,
      ubase: row.NAArticulo.Ubase,
      theLocation: this.locacion,
      theCurrentMax: row.StockMaximo,
      theCurrentMin: row.StockMinimo,
      thePhysical: row.ExistenciaFisica,
      theTheoretical: row.ExistenciaTeorica,
    }
    this.dialog.open(DetalleArticuloLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getArticulos(this.locacionID);
      this.changeDetectorRefs.detectChanges();
    });
    

  }

  onDelete(row: any){
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theArticuloID: row.ArticuloID,
      theFirebaseID: row.FirebaseID,
      theName: row.NAArticulo.Nombre,
      theCategory: row.NAArticulo.Categoria,
      theSubcategory: row.NAArticulo.Subcategoria,
      theType: row.NAArticulo.Tipo,
      theMax: row.NAArticulo.StockMaximo,
      theMin: row.NAArticulo.StockMinimo,
      ubase: row.NAArticulo.Ubase,
      theLocation: this.locacion,
      theCurrentMax: row.StockMaximo,
      theCurrentMin: row.StockMinimo,
      thePhysical: row.ExistenciaFisica,
      theTheoretical: row.ExistenciaTeorica,
    }
    this.dialog.open(EliminarArticuloLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getArticulos(this.locacionID);
      this.changeDetectorRefs.detectChanges();
    });
  }

  onMovement(row: any){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theArticuloID: row.ArticuloID,
      theFirebaseID: row.FirebaseID,
      theName: row.NAArticulo.Nombre,
      theCategory: row.NAArticulo.Categoria,
      theSubcategory: row.NAArticulo.Subcategoria,
      theType: row.NAArticulo.Tipo,
      theMax: row.NAArticulo.StockMaximo,
      theMin: row.NAArticulo.StockMinimo,
      ubase: row.NAArticulo.Ubase,
      theLocation: this.locacion,
      theCurrentMax: row.StockMaximo,
      theCurrentMin: row.StockMinimo,
      thePhysical: row.ExistenciaFisica,
      theTheoretical: row.ExistenciaTeorica,
      theLoc: this.locacion
    }
    this.dialog.open(MovimientoSimpleComponent, dc).afterClosed().subscribe(result => {
      this.changeDetectorRefs.detectChanges();
    });
  }

  onClose(){
    this.theRouter.navigateByUrl('/hawk/catalogos/almacenes');
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }

  onComplexMovement(){
    this.complex= true;
    this.getAlmacenes();
  }

  onCancelComplexMovement(){
    this.complex= false;
  }

  getAlmacenes(){
    this.almacenesService.getItems()
      .subscribe(
        (res) => {
          this.almacenes=[];
          this.almacenes= res as Almacen[];
        },
        err => {}
      )
  }

  updateDrop(obj: any){
    this.almacenSelected= this.almacenes.find(x => x.AlmacenID==this.theForm.controls.almacenSelect.value);
    let o= this.almacenSelected as any;
    this.locaciones$= o.NALocaciones; 
    this.locaciones$.filter(x => x.LocacionID == this.locacion.LocacionID);
  }

  onContinueComplexMovement(){
    this.theRouter.navigate(['hawk/inventarios/movimientos/traspasos/'], 
                              {
                                queryParams: 
                                  {
                                    Origen: this.locacion.LocacionID,
                                    Destino: this.theForm.controls.locacionSelect.value
                                  }
                              }
                            );
  }
}
