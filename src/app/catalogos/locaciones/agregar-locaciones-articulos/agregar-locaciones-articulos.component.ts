import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Locacion } from 'src/app/shared/classes/locacion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ArticulosService } from '../../articulos/articulos.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';

@Component({
  selector: 'app-agregar-locaciones-articulos',
  templateUrl: './agregar-locaciones-articulos.component.html',
  styleUrls: ['./agregar-locaciones-articulos.component.scss']
})
export class AgregarLocacionesArticulosComponent implements OnInit {

  theForm: FormGroup;
  submitted= false;
  locacion: Locacion;
  title: string="Relacionar Locación con Artículo";
  um: string;
  theFirebaseID: string;
  theName: string;
  theCategory: string;
  theSubcategory: string;
  theType: string;
  theMax: string;
  theMin: string;
  theArticuloID: number;
  articulo: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private theService: ArticulosService, 
    private formBuilder: FormBuilder, 
    public dRef: MatDialogRef<AgregarLocacionesArticulosComponent>,
    private notificationService: NotificationsService
  ) {
      this.articulo= data.articulo;
      this.locacion= data.locacion;
      console.log("Art: ", this.articulo);
      console.log("Loc: ", this.locacion);
      this.um= this.articulo.Ubase;
   }

  ngOnInit() {

     //this.spinner.message="Cargando";
     //this.spinner.message="Cargando";
    this.theForm = this.formBuilder.group({
      articulo: [''],
      firebaseID:[''],
      tipo:[''],
      categoria:[''],
      subcategoria:[''],
      minimoGlobal:[''],
      maximoGlobal:[''],
      almacen: [''],
      locacion: [''],
      stockMinimo: ['', Validators.compose([Validators.required, Validators.min(0)])],
      stockMaximo: ['', Validators.compose([Validators.required, Validators.max(this.articulo.StockMaximo)])],
      existencias: ['', Validators.compose([Validators.required])]
    });
  }

  validateExistencias(obj: any){
    if (this.theForm.controls.existencias.value > this.theForm.controls.stockMaximo.value) {
      this.theForm.controls.existencias.setValidators([Validators.required, Validators.max(this.theForm.controls.stockMaximo.value)]);
    } else {
      this.theForm.controls.stockMaximo.setValidators(null);
    }
    this.theForm.controls.stockMaximo.updateValueAndValidity();
  }

  validateStock(obj: any){
    if (this.theForm.controls.stockMinimo.value >= this.theForm.controls.stockMaximo.value) {
      this.theForm.controls.stockMinimo.setValidators([Validators.required, Validators.max(this.theForm.controls.stockMaximo.value)]);
    } else {
      this.theForm.controls.stockMinimo.setValidators(null);
    }
    this.theForm.controls.stockMinimo.updateValueAndValidity();
  }

  // convenience getter for easy access to form fields
  get f() { return this.theForm.controls; }

  validate(){
    this.sendData();
  }

  sendData(){
    let al= new NAArticulosLocaciones;
    //console.log("ArtID: ", this.theArticuloID);
    al.ArticuloID= this.articulo.ArticuloID;
    al.FirebaseID= this.articulo.FirebaseID;
    al.StockMaximo= this.theForm.controls.stockMaximo.value;
    al.StockMinimo= this.theForm.controls.stockMinimo.value;
    al.LocacionID= this.locacion.LocacionID;
    al.ExistenciaFisica= parseFloat(this.theForm.controls.existencias.value);
    al.ExistenciaTeorica= this.theForm.controls.existencias.value;
    //console.log("A enviar: ", al);/*
    this.theService.addArticuloLocacion(al)
      .subscribe(
        res => {
          this.notificationService.success("Artículo Agregado");
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
