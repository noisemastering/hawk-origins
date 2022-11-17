import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Locacion } from 'src/app/shared/classes/locacion';
import { LocacionesService } from 'src/app/catalogos/locaciones/locaciones.service';
import { NAArticuloExistencia } from 'src/app/shared/classes/NAArticuloExistencia';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NAMovimiento } from 'src/app/shared/classes/NAMovimiento';
import { MovimientosService } from '../movimientos.service';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/shared/classes/usuario';
import { NAElementoMovimiento } from 'src/app/shared/classes/NAElementoMovimiento';
import { ConceptosService } from 'src/app/catalogos/conceptos/conceptos.service';
import { Concepto } from 'src/app/shared/classes/concepto';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { NAPresentacionCompra } from 'src/app/shared/classes/NAPresentacion';

@Component({
  selector: 'app-traspasos',
  templateUrl: './traspasos.component.html',
  styleUrls: ['./traspasos.component.scss']
})
export class TraspasosComponent implements OnInit {

  origen= new Locacion;
  destino= new Locacion;
  movimiento: NAMovimiento;
  origenLocacion: string;
  origenAlmacen: string;
  destinoLocacion: string;
  destinoAlmacen: string;
  articulosOrigen: any[]=[];
  articulosDestino: any[]=[];
  listData: MatTableDataSource<any>;
  displayColumns: string[]=['Articulo','Tipo','Existencias', 'Traspasar', 'Presentaciones', 'Maximo', 'ExistenciasDest'];
  searchKey: string;
  spinner: SpinnerComponent= new SpinnerComponent;
  working= true;
  theForm: FormGroup;
  usuario= new Usuario;
  date= Date.now();
  invalid= false;
  conceptos: Concepto[]=[];
  nuevasExistenciasDestino: NAArticuloExistencia[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private theRoute: ActivatedRoute,
    private router: Router,
    private locacionesService: LocacionesService,
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private theService: MovimientosService,
    private datepipe: DatePipe,
    private conceptosService: ConceptosService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.usuario= JSON.parse(localStorage.getItem('Usuario')) as Usuario;
    this.theRoute.queryParams.subscribe(
      p => {
        this.origen.LocacionID= p['Origen'],
        this.destino.LocacionID= p['Destino']
      }
    );
    this.theForm = this.formBuilder.group({
      conceptoSelect:[''],
      notas:['']
    });
    this.getOrigen();
    this.getConceptos();
  }

  getConceptos(){
    this.conceptosService.getItems()
      .subscribe(
        (res) => {
          this.conceptos= res as Concepto[];
        }
      )
  }

  getOrigen(){
    this.locacionesService.getDetail(this.origen.LocacionID)
      .subscribe(
        (res) => {
          this.origen= res as Locacion;
          this.origenLocacion= this.origen.Nombre;
          this.origenAlmacen= this.origen.NAAlmacen.Nombre;
          this.getArticulos(this.origen.LocacionID);
        },
        err => {}
      );
  }

  getDestino(){
    this.locacionesService.getDetail(this.destino.LocacionID)
      .subscribe(
        (res) => {
          this.destino= res as Locacion;
          this.destinoLocacion= this.destino.Nombre;
          this.destinoAlmacen= this.destino.NAAlmacen.Nombre;
          this.getArticulosDestino(this.destino.LocacionID);
          
        },
        err => {}
      );
  }

  getArticulos(id: number){
    this.locacionesService.listaLocacionesArticulos(id)
      .subscribe(
        res => {
          this.articulosOrigen = res as any[];
          //Calculamos las existencias
          let i=0;
          for(let ar of this.articulosOrigen){
            let arr: NAArticuloExistencia[]=[];
            arr= this.origen.Existencias.filter(x => x.ArticuloID==ar.ArticuloID);
            let ex=0;
            for(let ae of arr){
              ex+= ae.Existencia;
            }
            ar.ExistenciaTeorica= ex;
            this.articulosOrigen[i]=ar;
            i++;
          }
          this.getDestino()
          console.log('Articulos origen', this.origen);
        },
        err => {

        }
      );
  }

  getArticulosDestino(id: number){
    this.locacionesService.listaLocacionesArticulos(id)
      .subscribe(
        res => {
          this.articulosDestino = res as any[];
          //Calculamos las existencias
          let i=0;
          for(let ar of this.articulosDestino){
            let arr: NAArticuloExistencia[]=[];
            arr= this.destino.Existencias.filter(x => x.ArticuloID==ar.ArticuloID);
            let ex=0;
            for(let ae of arr){
              ex+= ae.Existencia;
            }
            ar.ExistenciaTeorica= ex;
            this.articulosDestino[i]=ar;
            i++;
          }
          i=0;
          for(let art of this.articulosOrigen){
            let found= this.articulosDestino.find(x => x.ArticuloID == art.ArticuloID)
            if(found==undefined){
              art.existe= false;
              art.maximoDest= 0;
              art.existenciaDestino= 0;
            }else{
              art.existe= true;
              art.maximoDestino= found.StockMaximo;
              art.existenciaDestino= found.ExistenciaTeorica
            }
            art.traspasar= 0;
            art.presentacionTraspaso=0;
            this.articulosOrigen[i]= art;
            i++;
          }
          this.listData= new MatTableDataSource(this.articulosOrigen);
          this.listData.sort= this.sort;
          this.listData.paginator= this.paginator;
          this.working= false;
          this.changeDetectorRefs.detectChanges();
        },
        err => {

        }
      );
  }

  onMovement(){
    //Meter aquí el alta del movimiento si es que ya es una factura cerrada.
    this.movimiento= new NAMovimiento;
    this.movimiento.Autorizado= this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.movimiento.Autorizo= this.usuario.ID;
    this.movimiento.ConceptoID= this.theForm.controls.conceptoSelect.value;
    this.movimiento.Creado= this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.movimiento.Creo= this.usuario.ID;
    this.movimiento.Destino= this.destino.LocacionID;
    this.movimiento.Estatus= 2;
    this.movimiento.Modificado= this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.movimiento.Modifico= this.usuario.ID;
    this.movimiento.Notas= this.theForm.controls.notas.value;
    this.movimiento.Origen= this.origen.LocacionID;
    this.movimiento.Elementos= [];

    for(let el of this.articulosOrigen){
      if(el.traspasar>0){
        let m= new NAElementoMovimiento;
        m.Cantidad= el.traspasar;
        m.Costo= 0; //Meter la regla del costo
        m.EntidadID= 0; //Artículo
        m.PresentacionID= el.presentacionTraspaso;
        m.Tipo= 'Paquete';
        this.movimiento.Elementos.push(m);
      }
    }
    this.theService.addRecord(this.movimiento)
      .subscribe(
        () => {
          this.nuevasExistenciasDestino=[];
          let totalTraspasar=0.0;
          for(let el of this.articulosOrigen){
            if(el.traspasar>0){
              let basket = 0;
              let i=0;
              for(let ex of this.origen.Existencias){
                //Si la existencia satisface la necesidad
                if(el.ArticuloID==ex.ArticuloID){
                  let artspres= this.origen.Existencias.find(x => x.PresentacionCompra.PresentacionID==el.presentacionTraspaso);
                  let pres = new NAPresentacionCompra;
                  pres= artspres.PresentacionCompra;
                  totalTraspasar= el.traspasar * (pres.Equivalencia*pres.Unidades);
                  if(ex.Existencia >= totalTraspasar){
                    basket= totalTraspasar;
                    ex.Existencia-= totalTraspasar;
                    this.origen.Existencias[i]= ex;
                    break;
                  }else{ //Si la existencia no satisface
                    basket+= ex.Existencia;
                    ex.Existencia=0;
                    this.origen.Existencias[i]= ex;
                  }
                }
                i++;
              }
              let existencia= new NAArticuloExistencia;
              existencia.ArticuloID= el.ArticuloID;
              existencia.Existencia= totalTraspasar;
              existencia.Fecha= this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss.sss');
              existencia.FirebaseID= el.FirebaseID;
              existencia.LocacionID= this.movimiento.Destino;
              existencia.PresentacionID= el.presentacionTraspaso;
              this.nuevasExistenciasDestino.push(existencia);
            }
          }
          console.log('Articulos origen: ', this.articulosOrigen);
          console.log('Existencias destino: ', this.nuevasExistenciasDestino);
          
          this.locacionesService.addArticuloExistenciaList(this.nuevasExistenciasDestino)
            .subscribe(
              () => {
                this.locacionesService.updateInventory(this.origen.Existencias)
                  .subscribe(
                    () => {
                      this.notificationService.success('Movimiento realizado exitosamente');
                      this.router.navigateByUrl('hawk/inventarios/movimientos');
                    },
                    err => {}
                  )
              },
              err => {
                this.notificationService.error("Error en existencia destino")
              }
            )
        }
      );
    /*
    
          
          
            
            
          
          
        },
        err => {}
    );*/
  }

  validate(){

   /* for(let arr of this.articulosOrigen){
      if(arr.ExistenciaTeorica > arr.traspasar){
        this.invalid= true;
      }
    }
*/
    if(!this.invalid){
      this.onMovement();
    }
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }

}
