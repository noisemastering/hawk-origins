///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';        //
import {                                                                                //
  MatPaginator,                                                                         //
  MatSort,                                                                              //
  MatTableDataSource,                                                                   //
  MatDialog,                                                                            //
  MatDialogConfig} from '@angular/material';                                            // 
import { ListaArticuloMaestro } from 'src/app/shared/classes/lista-articulo-maestro';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { firestore } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ArticulosService } from '../articulos.service';

@Component({
  selector: 'app-lista-maestro',
  templateUrl: './lista-maestro.component.html',
  styleUrls: ['./lista-maestro.component.scss']
})
export class ListaMaestroComponent implements OnInit {

///////////////////// No mover !!! ///////////////////
searchKey: string;                                //
spinner: SpinnerComponent= new SpinnerComponent;  //
working: boolean=true;                            //
listData: MatTableDataSource<any>;                //
articulos: ListaArticuloMaestro[];
                                                  //
@ViewChild(MatSort) sort: MatSort;                //
@ViewChild(MatPaginator) paginator: MatPaginator; //  
/////////////////// /No mover !!! ////////////////////

displayColumns: string[]=['id', 'nombre', 'tipo', 'categoria', 'subcategoria', 'acciones']; // Adaptar las columnas (actualizar tabla)
  constructor(
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
    private firestore: AngularFirestore, //Cambiar por el servicio correspondiente
    private router: Router,
    private notificationService: NotificationsService, // No Mover!!!
    private theService: ArticulosService
  ) { }

  ngOnInit() {
    this.getList();
  }


  getList(){
    this.theService.getMasterList()
      .subscribe(
        (res) => {
          this.articulos= res.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data()
              } as ListaArticuloMaestro
            }
          )
          console.log("Lista: ",this.articulos);
          this.listData= new MatTableDataSource(this.articulos);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
      });
      this.changeDetectorRefs.detectChanges();
  }

  
  ///////// Buscador No mover!!! /////////
  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }
  ///////// Buscador ////////////////////


  ////////// Navegación
  onCreate(){
    let route='/hawk/catalogos/articulos/agregar-maestro';
    //var url = `${route}/${id}`;
    this.router.navigateByUrl(route);
  }

  onDownload(row: any){
    let route='/hawk/catalogos/articulos/descargar-articulo';
    this.router.navigate([route, row.id], {queryParams:{obj: row}});
  }

  onEdit(row: any){
    let route='/hawk/catalogos/articulos/editar-maestro';
    this.router.navigate([route, row.id], {queryParams:{obj: row}});
  }

  onDetail(row: any){
    let route='/hawk/catalogos/articulos/detalle-maestro';
    this.router.navigate([route, row.id], {queryParams:{obj: row}});
  }



}
