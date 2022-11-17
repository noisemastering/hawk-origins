import { Component, OnInit, Inject } from '@angular/core';
import { Almacen } from 'src/app/shared/classes/almacen';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Locacion } from 'src/app/shared/classes/locacion';
import { ArticulosService } from '../articulos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-eliminar-articulo-locacion',
  templateUrl: './eliminar-articulo-locacion.component.html',
  styleUrls: ['./eliminar-articulo-locacion.component.scss']
})
export class EliminarArticuloLocacionComponent implements OnInit {

  almacenes: Almacen[];
  theForm: FormGroup;
  submitted= false;
  locaciones$: Locacion[];
  title: string="Eliminar Relación Artículo-Locación";
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
    private theService: ArticulosService, 
    private formBuilder: FormBuilder, 
    public dRef: MatDialogRef<EliminarArticuloLocacionComponent>,
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
      this.Locacion= data.theLocation;
      this.theCurrentMin= data.theCurrentMin;
      this.theCurrentMax= data.theCurrentMax;
      this.thePhysical= data.thePhysical;
      this.theTheoretical= data.theTheoretical;
  }

  ngOnInit() {

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
      stockMinimo: [this.theCurrentMin],
      stockMaximo: [this.theCurrentMax],
      existencias: [this.thePhysical]
    });
    if((this.theTheoretical>0)||(this.thePhysical>0)){
      this.permission=false;
    }
  }

  get f() { return this.theForm.controls; }

  sendData(){
    this.theService.deleteArticuloLocacion(this.theArticuloID, this.Locacion.LocacionID)
      .subscribe(
        res => {
          this.notificationService.success("Locación Eliminada");
          console.log("Response: ", res);
        },
        err => {
          this.notificationService.success("Error: "+ err);
          console.log("Response: ", err);
        }
      );
    this.onClose();
  }

  onDelete(){
    this.sendData();
  }

  onClose(){
    this.theForm.reset();
    this.dRef.close();
  }

}
