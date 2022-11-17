import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';
import { Locacion } from 'src/app/shared/classes/locacion';
import 'rxjs/add/operator/filter';
import { LocacionesService } from '../locaciones.service';
import { Almacen } from 'src/app/shared/classes/almacen';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Articulo } from 'src/app/shared/classes/articulo';
import { ArticulosService } from '../../articulos/articulos.service';
import { AgregarLocacionesArticulosComponent } from '../agregar-locaciones-articulos/agregar-locaciones-articulos.component';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';

@Component({
  selector: 'app-locaciones-articulos-lista',
  templateUrl: './locaciones-articulos-lista.component.html',
  styleUrls: ['./locaciones-articulos-lista.component.scss']
})
export class LocacionesArticulosListaComponent implements OnInit {

  locacionID: number;
  locacion: Locacion;
  almacen: Almacen;
  nombreAlmacen: string;
  nombreLocacion: string;
  existentes: NAArticulosLocaciones[];
  articulos: any[];

///////////////////// No mover !!! ///////////////////
  searchKey: string;                                //
  spinner: SpinnerComponent= new SpinnerComponent;  //
  working: boolean=true;                            //
  listData: MatTableDataSource<any>;                //
                                                    //
  @ViewChild(MatSort) sort: MatSort;                //
  @ViewChild(MatPaginator) paginator: MatPaginator; //  
/////////////////// /No mover !!! ////////////////////

  displayColumns: string[]=['FirebaseID','Nombre','Subcategoria', 'Tipo', 'acciones'];

  constructor(
    private theRouter: Router,
    private dialog: MatDialog, // No mover!!!
    private activatedRoute: ActivatedRoute,
    private theService: LocacionesService,
    private articulosService: ArticulosService,
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
  ) { 
    this.locacionID = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    
    this.getDetail();
    this.getExistent();
  }


  compareExistent(){
    this.existentes.forEach(function (value: any) {
      this.articulos = this.articulos.filter(art => art.FirebaseID !== value.FirebaseID);
    });
    console.log("Resultante: ", this.articulos)
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
        console.log('Locación a editar: ', this.locacion);
        console.log('Almacén a editar: ', this.almacen);

        this.working= false; //No mover*/
    });
  }

  getExistent(){
    this.theService.listaLocacionesArticulos(this.locacionID)
      .subscribe(
        (response) => {
          this.existentes= response as NAArticulosLocaciones[];
          this.getList();
        }
      )
  }
  ///////// Cambiar el objeto y el servicio
  getList(): void{
    this.articulosService.getNAItems()
    .subscribe(
      (response) => {
        this.articulos= response as any[];
        console.log("Artículos XXX: ", this.articulos);
        //this.existentes.forEach(function (value: any) {
        //  
        //});
        for (let i = 0; i < this.existentes.length; i++) {
          this.articulos = this.articulos.filter((art: any) => art.FirebaseID != this.existentes[i].FirebaseID);
        }
        this.listData= new MatTableDataSource(this.articulos);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
        this.changeDetectorRefs.detectChanges();
      });
  }
  ///////// Traer datos


  ///////// Buscador No mover!!! /////////

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }

  onAdd(row: any){
    
    console.log('Row: ', row);
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      ArticuloID: row.ArticuloID,
      FirebaseID: row.FirebaseID,
      AlmacenName: this.nombreAlmacen,
      LoacionName: this.nombreLocacion,
      articulo: row,
      locacion: this.locacion
    }
    this.dialog.open(AgregarLocacionesArticulosComponent, dc).afterClosed().subscribe(result => {
      this.theRouter.navigate(['hawk/catalogos/locaciones-articulos/'], {queryParams: {LocacionID: this.locacion.LocacionID}});
    });
  }

}
