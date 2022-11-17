import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from '../articulos.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArticuloGranel } from 'src/app/shared/classes/articulo-granel';
import { ArticuloDivisible } from 'src/app/shared/classes/articulo-divisible';
import { ArticuloUnitario } from 'src/app/shared/classes/articulo-unitario';
import { ArticuloPieza } from 'src/app/shared/classes/articulo-pieza';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { Locacion } from 'src/app/shared/classes/locacion';
import { AgregarArticuloLocacionComponent } from '../agregar-articulo-locacion/agregar-articulo-locacion.component';
import { EditarArticuloLocacionComponent } from '../editar-articulo-locacion/editar-articulo-locacion.component';
import { DetalleArticuloLocacionComponent } from '../detalle-articulo-locacion/detalle-articulo-locacion.component';
import { EliminarArticuloLocacionComponent } from '../eliminar-articulo-locacion/eliminar-articulo-locacion.component';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';

@Component({
  selector: 'app-articulos-locaciones',
  templateUrl: './articulos-locaciones.component.html',
  styleUrls: ['./articulos-locaciones.component.scss']
})
export class ArticulosLocacionesComponent implements OnInit {

  theForm: FormGroup;
  submitted= false;   

  ///// Adaptar al objeto correspondiente
  title: string="Administrar locaciones para artículo";
  currentUMB: string;
  artGranel: ArticuloGranel;
  artDivisible: ArticuloDivisible;
  artUnitario: ArticuloUnitario;
  artPieza: ArticuloPieza;
  locaciones: Locacion[];
  
  FirebaseID: string;
  locacionID: number;
  ArticuloID: number;

  working: boolean= true;
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['Nombre','Almacen','Maximo', 'Minimo', 'Existencias', 'acciones'];
  searchKey: string;
  spinner: SpinnerComponent= new SpinnerComponent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private actRoute: ActivatedRoute, // No mover!!!
    private articuloService: ArticulosService,
    private formBuilder: FormBuilder, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private theRouter: Router, // No mover!!!
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.FirebaseID= this.actRoute.snapshot.params.ida;
    this.locacionID= this.actRoute.snapshot.params.idl;

    this.theForm = this.formBuilder.group({
      nombre: [''],
      categoria:[''],
      subcategoria: [''],
      tipo:[''],
      stockMinimo: [''],
      stockMaximo: [''],
      costo: ['']
    });

    this.getDetail();
    this.getLocaciones(this.FirebaseID);
  }


  getDetail(){

    this.articuloService.getNADetail(this.FirebaseID)
      .subscribe(
        (res) => {
          console.log("Response: ",res);
          switch(res.Tipo){
            case "granel":
              this.artGranel= res as ArticuloGranel;
              break;
            case "divisible":
              this.artDivisible= res as ArticuloDivisible;
              break;
            case "pieza":
              this.artPieza= res as ArticuloPieza;
              break;
            case "unitario":
              this.artUnitario= res as ArticuloUnitario;
              break;
          }
          this.currentUMB= res.Ubase;
          this.theForm.controls.nombre.setValue(res.Nombre);
          this.theForm.controls.categoria.setValue(res.Categoria);
          this.theForm.controls.subcategoria.setValue(res.Subcategoria);
          this.theForm.controls.tipo.setValue(res.Tipo);
          this.theForm.controls.stockMinimo.setValue(res.StockMinimo);
          this.theForm.controls.stockMaximo.setValue(res.StockMaximo);
          this.theForm.controls.costo.setValue(res.Costo);
          this.ArticuloID= res.ArticuloID;
          
        },
        err => {
          console.log("Error: ",err);
        }
      )
  }

  getLocaciones(id: string){
    this.articuloService.listaArticulosLocaciones(id)
      .subscribe(
        res => {
          console.log("Lista: ", res);
          this.locaciones = res as Locacion[];
          console.log("Array: ", this.locaciones);
          this.listData= new MatTableDataSource(this.locaciones);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
          this.changeDetectorRefs.detectChanges();
        },
        err => {

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
    dc.data={
      theArticuloID: this.ArticuloID,
      theFirebaseID: this.FirebaseID,
      theName: this.theForm.controls.nombre.value,
      theCategory: this.theForm.controls.categoria.value,
      theSubcategory: this.theForm.controls.subcategoria.value,
      theType: this.theForm.controls.tipo.value,
      theMax: this.theForm.controls.stockMaximo.value,
      theMin: this.theForm.controls.stockMinimo.value,
      ubase: this.currentUMB
    }
    this.dialog.open(AgregarArticuloLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getLocaciones(this.FirebaseID);
      this.changeDetectorRefs.detectChanges();
    });
  }
  
  onEdit(row: any){
    console.log("Fila: ", row);
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theArticuloID: this.ArticuloID,
      theFirebaseID: this.FirebaseID,
      theName: this.theForm.controls.nombre.value,
      theCategory: this.theForm.controls.categoria.value,
      theSubcategory: this.theForm.controls.subcategoria.value,
      theType: this.theForm.controls.tipo.value,
      theMax: this.theForm.controls.stockMaximo.value,
      theMin: this.theForm.controls.stockMinimo.value,
      ubase: this.currentUMB,
      theLocation: row.NALocacion,
      theCurrentMax: row.StockMaximo,
      theCurrentMin: row.StockMinimo,
      thePhysical: row.ExistenciaFisica,
      theTheoretical: row.ExistenciaTeorica,
    }
    this.dialog.open(EditarArticuloLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getLocaciones(this.FirebaseID);
      this.changeDetectorRefs.detectChanges();
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
      theArticuloID: this.ArticuloID,
      theFirebaseID: this.FirebaseID,
      theName: this.theForm.controls.nombre.value,
      theCategory: this.theForm.controls.categoria.value,
      theSubcategory: this.theForm.controls.subcategoria.value,
      theType: this.theForm.controls.tipo.value,
      theMax: this.theForm.controls.stockMaximo.value,
      theMin: this.theForm.controls.stockMinimo.value,
      ubase: this.currentUMB,
      theLocation: row.NALocacion,
      theCurrentMax: row.StockMaximo,
      theCurrentMin: row.StockMinimo,
      thePhysical: row.ExistenciaFisica,
      theTheoretical: row.ExistenciaTeorica,
    }
    this.dialog.open(DetalleArticuloLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getLocaciones(this.FirebaseID);
      this.changeDetectorRefs.detectChanges();
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
      theArticuloID: this.ArticuloID,
      theFirebaseID: this.FirebaseID,
      theName: this.theForm.controls.nombre.value,
      theCategory: this.theForm.controls.categoria.value,
      theSubcategory: this.theForm.controls.subcategoria.value,
      theType: this.theForm.controls.tipo.value,
      theMax: this.theForm.controls.stockMaximo.value,
      theMin: this.theForm.controls.stockMinimo.value,
      ubase: this.currentUMB,
      theLocation: row.NALocacion,
      theCurrentMax: row.StockMaximo,
      theCurrentMin: row.StockMinimo,
      thePhysical: row.ExistenciaFisica,
      theTheoretical: row.ExistenciaTeorica,
    }
    this.dialog.open(EliminarArticuloLocacionComponent, dc).afterClosed().subscribe(result => {
      this.getLocaciones(this.FirebaseID);
      this.changeDetectorRefs.detectChanges();
    });
  }

  onClose(){
    this.theRouter.navigateByUrl('/hawk/catalogos/articulos/lista-articulos');
  }
  
}
