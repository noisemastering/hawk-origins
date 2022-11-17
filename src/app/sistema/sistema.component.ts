import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SistemaService } from './sistema.service';
import { NASistema } from '../shared/classes/NASistema';
import { Almacen } from '../shared/classes/almacen';
import { Locacion } from '../shared/classes/locacion';
import { AlmacenesService } from '../catalogos/almacenes/almacenes.service';
import { DatePipe } from '@angular/common';
import { Usuario } from '../shared/classes/usuario';
import { NotificationsService } from '../servicios/notifications.service';
import { NAArticulo } from '../shared/classes/NAArticulo';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {

  theForm: FormGroup;
  sistema= new NASistema;
  almacen='';
  locacion='';
  stock='';
  costeo='';
  inventario='';
  importacion='';
  StockRequisiciones= [
    { ID: 0, Descripcion: 'Máximos'},
    { ID: 1, Descripcion: 'Mínimos'}
  ];
  TipoCosteo= [
    { ID: 0, Descripcion: 'Último'}, 
    { ID: 1, Descripcion: 'Promedio'}, 
    { ID: 2, Descripcion: 'Estándar'}
  ];
  TipoInventario= [
    { ID: 0, Descripcion:'Primeras Entradas, Primeras Salidas (PEPS)'}, 
    { ID: 1, Descripcion:'Últimas Entradas, Primeras Salidas (UEPS)'}
  ];
  TipoImportacion= [
   { ID: 0, Descripcion: 'Aloha'}, 
   { ID: 1, Descripcion: 'SoftRestaurant'}, 
   { ID: 2, Descripcion: 'HostelTactil'}
  ];
  almacenes: Almacen[]=[];
  locaciones$: Locacion[]=[];
  usuario= new Usuario;
  //almacenSelect:FormControl = new FormControl(null);
  //locacionSelect:FormControl = new FormControl(null);

  constructor(
    private formBuilder: FormBuilder,
    private theService: SistemaService,
    private almacenesService: AlmacenesService,
    private notificationService: NotificationsService,
    private datepipe: DatePipe
  ) { }

  

  ngOnInit() {

    this.usuario= JSON.parse(localStorage.getItem('Usuario')) as Usuario;
    
    this.theForm = this.formBuilder.group({
      almacenSelect:[''],
      locacionSelect:[''],
      stockSelect:[''],
      costeoSelect:[''],
      utilidad: [''],
      inventarioSelect:[''],
      importacionSelect: [''],
      categoria:['']
    });
    this.getDetail();
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

  getDetail(){
    this.theService.getDetail(1)
      .subscribe(
        (res) => {
          this.sistema= res as NASistema;
          this.stock= this.sistema.StockRequisiciones.toString();
          this.theForm.controls.stockSelect.setValue(this.stock);
          this.costeo= this.sistema.Costeo.toString();
          this.theForm.controls.costeoSelect.setValue(this.costeo)
          this.inventario= this.sistema.TipoInventario.toString();
          this.theForm.controls.inventarioSelect.setValue(this.inventario);
          this.importacion= this.sistema.Importacion.toString();
          this.theForm.controls.importacionSelect.setValue(this.importacion);
          this.theForm.controls.categoria.setValue(this.sistema.CategoriaInexistentes);
          this.theForm.controls.utilidad.setValue(this.sistema.UtilidadRecetas);
          
        },
        err => {
          
        }
      )
  }

  validate(){
    this.sistema.CategoriaInexistentes= this.theForm.controls.categoria.value;
    this.sistema.Costeo= this.theForm.controls.costeoSelect.value;
    this.sistema.Importacion= this.theForm.controls.importacionSelect.value;
    this.sistema.LocacionCompras= this.sistema.LocacionCompras;
    let date= Date.now();
    this.sistema.Modificado= this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
    this.sistema.Modifico= this.usuario.ID;
    this.sistema.SistemaID= 1;
    this.sistema.StockRequisiciones= this.theForm.controls.stockSelect.value;
    this.sistema.TipoInventario= this.theForm.controls.inventarioSelect.value;
    this.sistema.UtilidadRecetas= this.theForm.controls.utilidad.value;

    this.theService.editRecord(this.sistema, this.sistema.SistemaID)
      .subscribe(
        (res) => {
          this.notificationService.success('Ajustes actualizados')
        },
        err => {
          this.notificationService.error('Error al actualiar, intente más tarde.');
          this.notificationService.error('Error: '+ err);
        }
      );
  }
}
