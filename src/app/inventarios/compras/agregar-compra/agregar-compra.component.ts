import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { NARazonSocial } from 'src/app/shared/classes/NARazonSocial';
import { NACompra } from 'src/app/shared/classes/NACompra';
import { Usuario } from 'src/app/shared/classes/usuario';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { DuplicatesService } from 'src/app/servicios/duplicates.service';
import { AlmacenesService } from 'src/app/catalogos/almacenes/almacenes.service';
import { LocacionesService } from 'src/app/catalogos/locaciones/locaciones.service';
import { ComprasService } from '../compras.service';
import { DatePipe } from '@angular/common';
import { ProveedoresService } from 'src/app/catalogos/proveedores/proveedores.service';
import { NAPresentacionCompra } from 'src/app/shared/classes/NAPresentacion';
import { NAElementoMovimiento } from 'src/app/shared/classes/NAElementoMovimiento';
import { NAArticulo } from 'src/app/shared/classes/NAArticulo';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NAElementoCompra } from 'src/app/shared/classes/NAElementoCompra';
import { Router } from '@angular/router';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { ArticulosLocacionesCompraComponent } from '../articulos-locaciones-compra/articulos-locaciones-compra.component';
import { Articulo } from 'src/app/shared/classes/articulo';
import { ArticulosService } from 'src/app/catalogos/articulos/articulos.service';
import { NAMovimiento } from 'src/app/shared/classes/NAMovimiento';
import { MovimientosService } from 'src/app/inventarios/movimientos/movimientos.service';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';
import { NASistema } from 'src/app/shared/classes/NASistema';
import { SistemaService } from 'src/app/sistema/sistema.service';
import { NAArticuloExistencia } from 'src/app/shared/classes/NAArticuloExistencia';

@Component({
  selector: 'app-agregar-compra',
  templateUrl: './agregar-compra.component.html',
  styleUrls: ['./agregar-compra.component.scss']
})
export class AgregarCompraComponent implements OnInit {

/////////////////////// No mover !!! /////////////////////////////////
theForm: FormGroup;                                                 //
submitted= false;                                                   //
spinner: SpinnerComponent= new SpinnerComponent;                    //
working: boolean= false;                                            //
addOnBlur: boolean = true;                                          //
proveedores: NAProveedor[];
almacenes: Almacen[];
almacen: Almacen;
locaciones$: Locacion[];
razones$: any[];
isDefault= true;
locacion: Locacion;
articulo= new NAArticulo;
articulosLocaciones: NAArticulosLocaciones[]=[];
articulosLocacionesUpd: NAArticulosLocaciones[]=[];
foundItemList= false;
estados= [
  {
    ID: '0',
    Desc: 'Orden de Compra'
  },
  {
    ID: '1',
    Desc: 'En Proceso'
  },
  {
    ID: '2',
    Desc: 'Entregada'
  }
];
compra: NACompra;
currentUser: Usuario;
estatus: number=0;
presentacion: NAPresentacionCompra;
presentaciones$: NAPresentacionCompra[];
encontrado= false;
elementos: NAElementoCompra[]=[];
els: NAElementoCompra[]=[];
displayColumns: string[]= ['FirebaseID', 'Nombre', 'Presentacion', 'Cantidad', 'Costo', 'Acciones'];
listData: MatTableDataSource<any>;
usuario= new Usuario;
sistema= new NASistema;
almacenDefault='';
locacionDefault='';
articulosExistencias: NAArticuloExistencia[]=[];

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator; 
/////////////////// /No mover !!! ////////////////////////////////////

  constructor(
    private dialog: MatDialog, // No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private articulosService: ArticulosService,  //No mover!!!
    private almacenesService: AlmacenesService,
    private theService: ComprasService,
    private movimientosService: MovimientosService,
    private locacionesService: LocacionesService,
    private provsService: ProveedoresService,
    private datepipe: DatePipe,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private sistemaService: SistemaService
  ) { 
    this.listData= new MatTableDataSource(this.elementos);
  }

  ngOnInit() {
    this.spinner.message="Cargando"; //No mover!!!
    this.usuario= JSON.parse(localStorage.getItem('Usuario')) as Usuario;
    this.getSistema();

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
        proveedorSelect: [''],
        razonsocialSelect: [''],
        estatusSelect:[''],
        factura: [''],
        fechaFactura:[''],
        notas: [''],
        almacenSelect: [''],
        locacionSelect: [''],
        upc:[''],
        presentacionSelect:[''],
        cantidad:[''],
        costo:['']
    });
    this.getProvs();
    this.getAlmacenes();
    this.listData.sort= this.sort;
    this.listData.paginator= this.paginator;
    this.changeDetectorRefs.detectChanges();
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

  changeStatus(obj:any){
    this.estatus= this.theForm.controls.estatusSelect.value;
  }

  getProvs(){
    this.provsService.getItems()
    .subscribe(
      (res) =>{
        this.proveedores= res as NAProveedor[];
      }
    );
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
    this.isDefault= false;
    this.locacionesService.listaLocacionesArticulos(this.locacion.LocacionID)
      .subscribe(
        (res) => {
          this.articulosLocaciones= res as NAArticulosLocaciones[];
        },
        err => {
          console.log("Error: "+err);
        }
      );
  }

  updateRazones(obj: any){
    let prov: NAProveedor;
    prov = this.proveedores.find(obj => {
      return obj.ProveedorID == this.theForm.controls.proveedorSelect.value
    });
    this.razones$= prov.RazonesSociales as any;
  }

  searchItem(abj: any){
    this.encontrado= false;
    this.theService.getPresentacion(this.theForm.controls.upc.value)
      .subscribe(
        (res) =>{
          this.presentacion= res as NAPresentacionCompra;
          this.encontrado= true;
        },
        err => {
          this.encontrado= false;
          this.notificationService.error('Código no encontrado');
        }
      );

  }

  searchItemById(theID: string){
    this.articulosService.getNADetail(theID)
      .subscribe(
        (res) => {
          this.articulo= res as NAArticulo;
          this.presentaciones$= this.articulo.PresentacionesCompra;
          this.foundItemList= true;
        },
        err => {
          console.log('Error: '+err)
        }
      );
  }
 
  addItem(obj:any){
    
    let el= new NAElementoCompra;
    el.Costo= this.theForm.controls.costo.value;
    el.Cantidad= this.theForm.controls.cantidad.value;
    if(this.foundItemList){
      el.ElementoID= this.articulo.ArticuloID;
      el.PresentacionID= this.theForm.controls.presentacionSelect.value;
      el.Articulo= this.articulo;
      el.Presentacion = this.presentaciones$.find(obj => {
        return obj.PresentacionID == this.theForm.controls.presentacionSelect.value
      });

    }else{
      el.ElementoID= this.presentacion.ArticuloID;
      el.PresentacionID= this.presentacion.PresentacionID;
      el.Articulo= this.presentacion.Articulo as NAArticulo;
      el.Presentacion= this.presentacion as NAPresentacionCompra;
    }
    this.elementos.push(el);
    console.log('Array: ', this.elementos);
    this.listData= new MatTableDataSource(this.elementos);
    this.listData.sort= this.sort;
    this.listData.paginator= this.paginator;
    this.theForm.controls.upc.setValue('');
    this.theForm.controls.cantidad.setValue('');
    this.theForm.controls.costo.setValue('');
    this.changeDetectorRefs.detectChanges();

  }

  listItems(){
    
    const dc= new MatDialogConfig;
    dc.disableClose= true;
    dc.autoFocus= true;
    dc.width= "90%";
    dc.height= "90%";
    dc.data={
      theAlm: this.almacen,
      theLocation: this.locacion
    }
    this.dialog.open(ArticulosLocacionesCompraComponent, dc).afterClosed().subscribe(result => {
      let item= new NAArticulo;
      item= JSON.parse(localStorage.getItem('ArticuloEncontrado')) as NAArticulo;
      this.searchItemById(item.FirebaseID);
    });
  }

  getPresentaciones(){
    console.log('Entró a presentaciones');
  }

  addCompra(){
    
    let compra= new NACompra;
    compra.Creo= this.usuario.ID;
    compra.Estatus= this.theForm.controls.estatusSelect.value;
    compra.Factura= this.theForm.controls.factura.value;
    let date= Date.now();
    compra.Modificado=  this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    compra.Modifico= this.usuario.ID;
    compra.Creado=  this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    compra.Autorizado=  this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    compra.FechaFactura= this.datepipe.transform(this.theForm.controls.fechaFactura.value, 'yyyy-MM-dd hh:mm:ss.sss');
    compra.Notas= this.theForm.controls.notas.value;
    compra.RazonSocialID= this.theForm.controls.razonsocialSelect.value;
    compra.Autorizo= this.usuario.ID;
    if(this.isDefault){
      compra.LocacionID=this.sistema.LocacionCompras;
    }else{
      compra.LocacionID= this.theForm.controls.locacionSelect.value;
    }
    
    this.theService.addRecord(compra)
      .subscribe(
        (res) => {
          for(let el of this.elementos){
            let e= new NAElementoCompra;
            e.Costo= el.Costo;
            e.Cantidad= el.Cantidad;
            e.Disponible= 0.0;
            e.Disponible= el.Cantidad;
            e.CompraID= res.CompraID;
            e.PresentacionID= el.PresentacionID;
            this.els.push(e);
          }
          this.theService.addElementos(this.els)
          .subscribe(
            (res) => { 
              let addedCompra= new NACompra;
              addedCompra = res as NACompra;
              //Esto es para determinar si es una compra entregada con destino dado
              if(this.theForm.controls.estatusSelect.value=='2'){
                  
                  //Meter aquí el alta del movimiento si es que ya es una factura cerrada.
                  let mov = new NAMovimiento;
                  mov.Autorizado= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
                  mov.Autorizo= this.usuario.ID;
                  mov.ConceptoID=1;
                  mov.Creado= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
                  mov.Creo= this.usuario.ID;
                  if(this.isDefault){
                    mov.Destino= this.sistema.LocacionCompras;
                  }else{
                    mov.Destino= this.locacion.LocacionID;
                  }
                  mov.Estatus= 2;
                  mov.Modificado= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
                  mov.Modifico= this.usuario.ID;
                  mov.Notas= this.theForm.controls.notas.value;
                  mov.Origen= 1;
                  mov.Elementos= [];
                  for(let el of addedCompra.Elementos){
                    let m= new NAElementoMovimiento;
                    m.Cantidad= el.Cantidad;
                    m.Costo= el.Costo;
                    m.EntidadID= 0; //Artículo
                    m.PresentacionID= el.PresentacionID;
                    m.Tipo= 'Paquete';
                    mov.Elementos.push(m);
                  }
                  this.movimientosService.addRecord(mov)
                    .subscribe(
                      () => {
                        this.notificationService.success('Movimiento agregado');    
                        //actualizar existencias
                        for(let el of this.elementos){
                          let ae= new NAArticuloExistencia;
                          ae.ArticuloID= el.Articulo.ArticuloID;
                          ae.Existencia= el.Cantidad * el.Presentacion.Equivalencia * el.Presentacion.Unidades;
                          ae.FirebaseID= el.Articulo.FirebaseID;
                          ae.Fecha= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
                          ae.LocacionID= mov.Destino;
                          ae.PresentacionID= el.PresentacionID;
                          this.articulosExistencias.push(ae);
                        }

                        

                        /*
                        for(let el of this.elementos){
                          let al= new NAArticulosLocaciones;
                          al= this.articulosLocaciones.find(x => x.FirebaseID==el.Articulo.FirebaseID);
                          al.ExistenciaTeorica+= el.Cantidad * el.Presentacion.Equivalencia * el.Presentacion.Unidades; 
                          this.articulosLocacionesUpd.push(al);
                        }
                        */
                        //this.locacionesService.updateLocacionArticuloLista(this.articulosLocacionesUpd)
                        this.theService.addArticulosExistencias(this.articulosExistencias)
                          .subscribe( 
                            () => {
                              
                              this.router.navigateByUrl('/hawk/inventarios/compras')
                               
                            },
                            err => {
                              this.notificationService.error('Error '+err);
                            }
                          )


                      },
                      err => {
                        this.notificationService.error('Error: '+err);
                      }
                    )
              }
            },
            err => {
              this.notificationService.error('Error en elementos')}
          );
          this.notificationService.success('Compra agregada');
        },
        err => {
          this.notificationService.error('Error');
        }
      );
     
  }


  actualizarExistencias(){
    
  }

  validate() {
      
    this.submitted = true;
    // stop here if form is invalid
    //if (this.theForm.invalid) {
      //console.log('Form invalid');
      //return;
    //}else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.addCompra();
    //}
  }

  resetForm(){
    this.theForm.reset();
  }

  onClose(){}

  getSistema(){
    this.sistemaService.getDetail(1)
      .subscribe(
        (res) => {
          this.sistema= res as NASistema;
          this.almacenDefault= this.sistema.Locacion.NAAlmacen.Nombre;
          this.locacionDefault= this.sistema.Locacion.Nombre;
          this.almacen= this.sistema.Locacion.NAAlmacen;
          this.locacion= this.sistema.Locacion;
          this.locacionesService.listaLocacionesArticulos(this.locacion.LocacionID)
            .subscribe(
              (res) => {
                this.articulosLocaciones= res as NAArticulosLocaciones[];
              },
              err => {
                console.log("Error: "+err);
              }
            );
        }
      )
  }
  
}
