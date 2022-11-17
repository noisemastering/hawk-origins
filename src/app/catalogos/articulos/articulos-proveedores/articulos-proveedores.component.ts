import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NAArticulo } from 'src/app/shared/classes/NAArticulo';
import { ArticulosService } from '../articulos.service';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { AgregarArticulosProveedoresComponent } from '../agregar-articulos-proveedores/agregar-articulos-proveedores.component';
import { EliminarArticulosProveedoresComponent } from '../eliminar-articulos-proveedores/eliminar-articulos-proveedores.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

@Component({
  selector: 'app-articulos-proveedores',
  templateUrl: './articulos-proveedores.component.html',
  styleUrls: ['./articulos-proveedores.component.scss']
})
export class ArticulosProveedoresComponent implements OnInit {

  articulo= new NAArticulo;
  proveedores: NAProveedor[]=[];
  working: boolean= true;
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['ProveedorID','Nombre','acciones'];
  searchKey: string;
  spinner= new SpinnerComponent;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  theForm: FormGroup;  

  ///// Adaptar al objeto correspondiente
  title: string="Proveedores ligados con este artículo";

  constructor(
    private activatedRoute: ActivatedRoute,
    private theService: ArticulosService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private notificationService: NotificationsService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder
  ) { 
   this.articulo.FirebaseID= this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.theForm = this.formBuilder.group({
      nombre: [''],
      ID: [''],
      categoria:[''],
      subcategoria: [''],
      tipo:['']
    });

    this.getRecord();

  }

  getRecord(){
    
    this.theService.getNADetail(this.articulo.FirebaseID)
      .subscribe(
        (res) => {
          this.articulo= res as NAArticulo;
          this.theForm.controls.ID.setValue(this.articulo.FirebaseID);
          this.theForm.controls.nombre.setValue(this.articulo.Nombre);
          this.theForm.controls.subcategoria.setValue(this.articulo.Subcategoria);
          this.theForm.controls.categoria.setValue(this.articulo.Categoria);
          this.theForm.controls.tipo.setValue(this.articulo.Tipo);
          this.proveedores= res.Proveedores as NAProveedor[];
          this.listData= new MatTableDataSource(this.proveedores);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
          this.changeDetectorRefs.detectChanges();
        },
        err => {
          console.log('Error')
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
      art: this.articulo
    }
    this.dialog.open(AgregarArticulosProveedoresComponent, dc).afterClosed().subscribe(result => {
      this.getRecord();
    });
  }
  
  onUnlink(row: any) {
    this.confirmationDialogService.confirm('Favor de confirmar..', '¿Realmente desea eliminar la relación entre este artículo y este proveedor? No se eliminará ninguna de las dos entidades, únicamente la relación entre ellas.')
    .then(
      (confirmed) => {
        this.theService.unlinkProvider(this.articulo.FirebaseID, row.ProveedorID)
        .subscribe(
          () => {
            this.notificationService.success('Relación eliminada');
            this.getRecord();
          },
          error => {console.log('Error: '+ error)}
        )
        
      }
    )
    .catch(() => console.log('Cancelado'));
  }

  onClose(){

    let route='/hawk/catalogos/lista-articulos';
  }

}
