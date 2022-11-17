import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NARazonSocial } from 'src/app/shared/classes/NARazonSocial';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { ProveedoresService } from '../proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AgregarRazonSocialComponent } from '../agregar-razon-social/agregar-razon-social.component';
import { EditarRazonSocialComponent } from '../editar-razon-social/editar-razon-social.component';
import { DetalleRazonSocialComponent } from '../detalle-razon-social/detalle-razon-social.component';
import { EliminarRazonSocialComponent } from '../eliminar-razon-social/eliminar-razon-social.component';

@Component({
  selector: 'app-razones-sociales',
  templateUrl: './razones-sociales.component.html',
  styleUrls: ['./razones-sociales.component.scss']
})
export class RazonesSocialesComponent implements OnInit {

///////////// Variables

///////////////////// No mover !!! ///////////////////
  searchKey: string;                                //
  spinner: SpinnerComponent= new SpinnerComponent;  //
  working: boolean=true;                            //
  listData: MatTableDataSource<any>;                //
                                                    //
  @ViewChild(MatSort) sort: MatSort;                //
  @ViewChild(MatPaginator) paginator: MatPaginator; //  
/////////////////// /No mover !!! ////////////////////
theID: string;
proveedor: NAProveedor;
razonessociales: NARazonSocial[]; // Adaptar al nombre de objeto
displayColumns: string[]=['RazonSocial','RFC','Email','acciones']; // Adaptar las columnas (actualizar tabla)
  constructor(
    private dialog: MatDialog, // No mover!!!
    private changeDetectorRefs: ChangeDetectorRef, // No mover!!!
    private theService: ProveedoresService, //Cambiar por el servicio correspondiente
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.theID= this.activatedRoute.snapshot.paramMap.get('id');
    this.proveedor= new NAProveedor;
    this.getRecord(); //No mover

  }

  ///////// Cambiarel objeto y el servicio
  getRecord(): void{
    this.theService.getDetail(parseInt(this.theID))
    .subscribe(
      (response) => {
        console.log("List data: ", response);
        this.proveedor= response as NAProveedor;
        this.razonessociales = response.RazonesSociales as NARazonSocial[];
        this.listData= new MatTableDataSource(this.razonessociales);
        this.listData.sort= this.sort;
        this.listData.paginator= this.paginator;
        this.working= false;
      });
      this.changeDetectorRefs.detectChanges();
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

  ///////// Buscador ////////////////////


  ///////// Ventanas /////////
  ///////// Adaptar los nombres de los componentes
  onCreate(){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data= {
      
      prov: this.proveedor
    }
    this.dialog.open(AgregarRazonSocialComponent, dc).afterClosed().subscribe(result => {
      this.getRecord();
    });
  }

  onEdit(row: any){
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theID: row.ID
    }
    this.dialog.open(EditarRazonSocialComponent, dc).afterClosed().subscribe(result => {
      this.getRecord();
    });
  }

  onDetail(row: any){
    
    console.log('Row: '+JSON.stringify(row));
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theID: row.ID
    }
    this.dialog.open(DetalleRazonSocialComponent, dc).afterClosed().subscribe(result => {
      this.getRecord();
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
      theID: row.ID
    }
    this.dialog.open(EliminarRazonSocialComponent, dc).afterClosed().subscribe(result => {
      this.getRecord();
    });
  }
  ///////// /Ventanas /////////

  onList(row: any){
    let route='/hawk/catalogos/proveedores/razones-sociales';
    this.router.navigate([route, row.ProveedorID], {queryParams:{obj: row}});
  }
  ///////// /Ventanas /////////

}
