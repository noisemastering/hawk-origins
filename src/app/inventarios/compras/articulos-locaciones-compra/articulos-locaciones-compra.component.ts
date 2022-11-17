import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Locacion } from 'src/app/shared/classes/locacion';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { LocacionesService } from 'src/app/catalogos/locaciones/locaciones.service';
import { Almacen } from 'src/app/shared/classes/almacen';

@Component({
  selector: 'app-articulos-locaciones-compra',
  templateUrl: './articulos-locaciones-compra.component.html',
  styleUrls: ['./articulos-locaciones-compra.component.scss']
})
export class ArticulosLocacionesCompraComponent implements OnInit {

    theForm: FormGroup;
  submitted= false;

  ///// Adaptar al objeto correspondiente
  title: string="Administrar locaciones para artículo";
  currentUMB: string;
  articulos: any[];
  locacion= new Locacion;
  almacen= new Almacen;
  nombre: string;
  
  FirebaseID: string;
  locacionID: number;
  ArticuloID: number;

  working: boolean= true;
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['Articulo','Tipo','Maximo', 'Minimo', 'Existencias', 'acciones'];
  searchKey: string;
  spinner: SpinnerComponent= new SpinnerComponent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private theService: LocacionesService,
    public dRef: MatDialogRef<ArticulosLocacionesCompraComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { 
      this.locacion= data.theLocation;
      this.almacen= data.theAlm;
  }

  ngOnInit() {
    
    this.getArticulos(this.locacion.LocacionID);
  }

  getArticulos(id: number){
    this.theService.listaLocacionesArticulos(id)
      .subscribe(
        res => {
          this.articulos = res as any[];
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

  onSelect(row: any){
    
    localStorage.setItem('ArticuloEncontrado',JSON.stringify(row));
    this.onClose();

  }

  onClose(){
    this.dRef.close();
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }

}
