import { Component, OnInit, Inject } from '@angular/core';
import { Almacen } from 'src/app/shared/classes/almacen';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Locacion } from 'src/app/shared/classes/locacion';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-detalle-articulo-locacion',
  templateUrl: './detalle-articulo-locacion.component.html',
  styleUrls: ['./detalle-articulo-locacion.component.scss']
})
export class DetalleArticuloLocacionComponent implements OnInit {

  almacenes: Almacen[];
  theForm: FormGroup;
  submitted= false;
  locaciones$: Locacion[];
  title: string="Detalle de Relación Artículo-Locación";
  um: string;
  theFirebaseID: string;
  theName: string;
  theCategory: string;
  theSubcategory: string;
  theType: string;
  theMax: number;
  theMin: number;
  theArticuloID: number;
  theAlmacenID: number;
  theLocationID: number;
  Locacion: Locacion;
  theCurrentMax: number;
  theCurrentMin: number;
  thePhysical: number;
  theTheoretical: number;
  permission: boolean= true;

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, 
    public dRef: MatDialogRef<DetalleArticuloLocacionComponent>,
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
      this.Locacion= data.theLocation;
      this.theCurrentMin= data.theCurrentMin;
      this.theCurrentMax= data.theCurrentMax;
      this.thePhysical= data.thePhysical;
      this.theTheoretical= data.theTheoretical;
  }

  ngOnInit() {
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
      stockMinimo: [''],
      stockMaximo: [''],
      existencias: ['']
    });
  }

  onClose(){
    this.theForm.reset();
    this.dRef.close();
  }

}
