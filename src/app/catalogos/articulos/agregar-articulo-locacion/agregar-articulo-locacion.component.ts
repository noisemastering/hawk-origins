import { Component, OnInit, Inject } from '@angular/core';
import { Almacen } from 'src/app/shared/classes/almacen';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Locacion } from 'src/app/shared/classes/locacion';
import { ArticulosService } from '../articulos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { AlmacenesService } from '../../almacenes/almacenes.service';
import { LocacionesService } from '../../locaciones/locaciones.service';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';

@Component({
  selector: 'app-agregar-articulo-locacion',
  templateUrl: './agregar-articulo-locacion.component.html',
  styleUrls: ['./agregar-articulo-locacion.component.scss']
})
export class AgregarArticuloLocacionComponent implements OnInit {

  almacenes: Almacen[];
  theForm: FormGroup;
  submitted= false;
  locaciones$: Locacion[];
  title: string="Relacionar Artículo con Locación";
  um: string;
  theFirebaseID: string;
  theName: string;
  theCategory: string;
  theSubcategory: string;
  theType: string;
  theMax: string;
  theMin: string;
  theArticuloID: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private theService: ArticulosService, 
    private almacenesService: AlmacenesService,
    private locacionesService: LocacionesService,
    private formBuilder: FormBuilder, 
    public dRef: MatDialogRef<AgregarArticuloLocacionComponent>,
    private notificationService: NotificationsService
  ) { 
      this.theArticuloID= data.theArticuloID;
      this.theFirebaseID= data.theFirebaseID;
      this.theName= data.theName;
      this.theCategory= data.theCategory;
      this.theSubcategory= data.theSubcategory;
      this.theType= data.theType;
      this.theMax= data.theMax;
      this.theMin= data.theMin;
      this.um= data.ubase;
  }

  ngOnInit() {
    //this.spinner.message="Cargando";
    this.theForm = this.formBuilder.group({
        almacen: ['', Validators.compose([Validators.required])],
        locacion: ['', Validators.compose([Validators.required])],
        stockMinimo: ['', Validators.compose([Validators.required])],
        stockMaximo: ['', Validators.compose([Validators.required])],
        existencias: [0]
    });
    this.getAlmacenes();
  }

  // convenience getter for easy access to form fields
  get f() { return this.theForm.controls; }

  getAlmacenes(){
    this.almacenesService.getItems()
    .subscribe(
      res => {
          this.almacenes = res as Almacen[];
          console.log("Lista almacenes: ", this.almacenes);
      },
      err => {
        console.log("List data: ", err);
      }
    );
  }

  almacenSelected(obj: any){
    
    this.locacionesService.getLocations(this.theForm.controls.almacen.value)
      .subscribe(
        res => {
          this.locaciones$= res.NALocaciones;
        },
        err => {}
        //this.locaciones$= ;
      );
  }

  validate(){
    this.sendData();
  }

  sendData(){
    let al= new NAArticulosLocaciones;
    //console.log("ArtID: ", this.theArticuloID);
    al.ArticuloID= this.theArticuloID;
    al.FirebaseID= this.theFirebaseID;
    al.StockMaximo= this.theForm.controls.stockMaximo.value;
    al.StockMinimo= this.theForm.controls.stockMinimo.value;
    al.LocacionID= this.theForm.controls.locacion.value;
    al.ExistenciaFisica= this.theForm.controls.existencias.value;
    al.ExistenciaTeorica= this.theForm.controls.existencias.value;
    //console.log("A enviar: ", al);
    this.theService.addArticuloLocacion(al)
      .subscribe(
        res => {
          this.notificationService.success("Locación Agregada");
          console.log("Response: ", res);
        },
        err => {
          this.notificationService.success("Error: "+ err);
          console.log("Response: ", err);
        }
      );
    this.onClose();
  }

  onClose(){
    this.theForm.reset();
    this.dRef.close();
  }

  resetForm(){}
}
