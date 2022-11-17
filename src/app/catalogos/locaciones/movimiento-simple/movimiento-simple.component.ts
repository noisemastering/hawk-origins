import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { LocacionesService } from '../locaciones.service';
import { MovimientosService } from 'src/app/inventarios/movimientos/movimientos.service';
import { NAMovimiento } from 'src/app/shared/classes/NAMovimiento';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { NAArticulo } from 'src/app/shared/classes/NAArticulo';
import { AlmacenesService } from '../../almacenes/almacenes.service';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';
import { ArticulosService } from '../../articulos/articulos.service';
import { NAPresentacionCompra } from 'src/app/shared/classes/NAPresentacion';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/shared/classes/usuario';
import { NAElementoMovimiento } from 'src/app/shared/classes/NAElementoMovimiento';
import { NASistema } from 'src/app/shared/classes/NASistema';
import { SistemaService } from 'src/app/sistema/sistema.service';
import { NAArticuloExistencia } from 'src/app/shared/classes/NAArticuloExistencia';
import { ConceptosService } from '../../conceptos/conceptos.service';
import { Concepto } from 'src/app/shared/classes/concepto';

@Component({
  selector: 'app-movimiento-simple',
  templateUrl: './movimiento-simple.component.html',
  styleUrls: ['./movimiento-simple.component.scss']
})
export class MovimientoSimpleComponent implements OnInit {

  title='Mover artículo';
  movimiento= new NAMovimiento;
  theForm: FormGroup;
  almacenes: Almacen[]=[];
  locaciones$: Locacion[]=[];
  articulo= new NAArticulo;
  almacen= new Almacen;
  origen= new Locacion;
  destino= new Locacion;
  minimo: number;
  fisica: number;
  teorica: number;
  presentaciones: NAPresentacionCompra[]=[];
  articulosLocaciones: NAArticulosLocaciones[]=[];
  um: string;
  existe: boolean= true;
  date= Date.now();
  usuario= new Usuario;
  sistema= new NASistema;
  existencias: NAArticuloExistencia[]=[];
  submitted= false;
  conceptos: Concepto[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private notificationService: NotificationsService,
    public dRef: MatDialogRef<MovimientoSimpleComponent>, // Adaptar según modelo correspondiente
    private locacionesService: LocacionesService,
    private almacenesService: AlmacenesService,
    private theService: MovimientosService,
    private articulosService: ArticulosService,
    private datepipe: DatePipe,
    private sistemaService: SistemaService,
    private conceptosService: ConceptosService
  ) { 
      this.articulo.ArticuloID= data.theArticuloID;
      this.articulo.FirebaseID = data.theFirebaseID;
      this.articulo.Nombre = data.theName;
      this.articulo.Categoria = data.theCategory;
      this.articulo.Subcategoria = data.theSubcategory;
      this.articulo.Tipo = data.theType;
      this.articulo.StockMaximo = data.theMax;
      this.articulo.StockMinimo = data.theMin;
      this.articulo.Ubase = data.ubase;
      this.origen.LocacionID = data.theLocation;
      this.minimo = data.theCurrentMin;
      this.fisica = data.thePhysical;
      this.teorica = data.theTheoretical;
      this.origen= data.theLoc;
  }

  ngOnInit() {
    this.um= this.articulo.Ubase;
    this.theForm = this.formBuilder.group({
      articulo: [this.articulo.Nombre],
      categoria: [this.articulo.Categoria],
      subcategoria: [this.articulo.Subcategoria],
      origen:[this.origen.NAAlmacen.Nombre+'-'+this.origen.Nombre],
      existencia: [this.teorica],
      almacenSelect: [''],
      locacionSelect: [''],
      conceptoSelect:[''],
      notas:[''],
      presentacionSelect: [''],
      cantidad: ['']
    });
    this.usuario= JSON.parse(localStorage.getItem('Usuario')) as Usuario;
    this.getAlmacenes();
    this.getPresentaciones();
    this.getExistencias();
    this.getConceptos();
    
    //Traer preferencias de sistema
    //Traer los movimientos para descontar
  }

  getConceptos(){
    this.conceptosService.getItems()
      .subscribe(
        (res) => {
          this.conceptos= res as Concepto[];
        }
      )
  }

  getExistencias(){
    this.locacionesService.getExistenciasMov(this.origen.LocacionID, this.articulo.ArticuloID)
      .subscribe(
        (res) => {
          this.existencias= res as NAArticuloExistencia[];
          //PEPS
          this.existencias.sort(
            (val1, val2) => {
              return <any>new Date(val1.Fecha) - <any>new Date(val2.Fecha)
            }
          )
          
          //UEPS  
          /*
          this.existencias.sort(
            (val1, val2) => {
              return <any>new Date(val2.Fecha) - <any>new Date(val1.Fecha)
            }
          )*/
        }
      )
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
    this.destino= this.locaciones$.find(x => x.LocacionID==this.theForm.controls.locacionSelect.value);
    this.locacionesService.listaLocacionesArticulos(this.destino.LocacionID)
      .subscribe(
        (res) => {
          this.articulosLocaciones= res as NAArticulosLocaciones[];
          let artloc= this.articulosLocaciones.find(y => y.ArticuloID==this.articulo.ArticuloID);
          if(artloc==undefined){
            this.existe= false;
          }else{
            this.existe= true;
          }
        },
        err => {
          console.log("Error: "+err);
        }
      );
  }

  getPresentaciones(){
    this.articulosService.getNADetail(this.articulo.FirebaseID)
      .subscribe(
        (res) => {
          this.presentaciones= res.PresentacionesCompra as NAPresentacionCompra[];
        }
      );
  }

  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

  validate() {
      
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      this.notificationService.error('El formulario es inválido, revise');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.makeMovement();
    }
  }

  makeMovement(){

    //Meter aquí el alta del movimiento si es que ya es una factura cerrada.
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

    //Checar si hay existencias suficientes para saber cuántos elementos hay que traer

    let m= new NAElementoMovimiento;
    m.Cantidad= this.theForm.controls.cantidad.value;
    m.Costo= 0; //Meter la regla del costo
    m.EntidadID= 0; //Artículo
    m.PresentacionID= this.theForm.controls.presentacionSelect.value;
    m.Tipo= 'Paquete';
    this.movimiento.Elementos.push(m);
    let presentacion= this.presentaciones.find(x => x.PresentacionID==m.PresentacionID);

    this.theService.addRecord(this.movimiento)
      .subscribe(
        () => {
          let basket = 0;
          let i=0;
          for(let ex of this.existencias){
            let totalTraspasar= parseFloat(this.theForm.controls.cantidad.value)*presentacion.Equivalencia*presentacion.Unidades;
            let totalExistencias= parseFloat(this.theForm.controls.cantidad.value);
            //Si la existencia satisface la necesidad
            if(ex.Existencia >= totalTraspasar){
              basket= totalTraspasar;
              ex.Existencia-= totalTraspasar;
              this.existencias[i]= ex;
              break;
            }else{ //Si la existencia no satisface
              basket+= ex.Existencia;
              ex.Existencia=0;
              this.existencias[i]= ex;
            }
            i++;
          }
          let existencia= new NAArticuloExistencia;
          existencia.ArticuloID= this.articulo.ArticuloID;
          existencia.Existencia= basket;
          existencia.Fecha= this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss.sss');
          existencia.FirebaseID= this.articulo.FirebaseID;
          existencia.LocacionID= this.movimiento.Destino;
          existencia.PresentacionID= m.PresentacionID;
          this.locacionesService.addArticuloExistencia(existencia)
            .subscribe(
              () => {
                this.locacionesService.updateInventory(this.existencias)
                  .subscribe(
                    () => {
                      this.notificationService.success('Movimiento realizado exitosamente');
                      this.onClose();
                    },
                    err => {}
                  )
              },
              err => {}
            )
        },
        err => {}
    );

  }

  getSistema(){
    this.sistemaService.getDetail(1)
      .subscribe(
        (res) => {
          this.sistema= res as NASistema;
        }
      )
    }

}
