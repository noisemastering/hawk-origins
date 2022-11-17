import { Component, OnInit, Inject } from '@angular/core';
import { Almacen } from 'src/app/shared/classes/almacen';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Locacion } from 'src/app/shared/classes/locacion';
import { ArticulosService } from '../articulos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';
import { max, min } from 'rxjs/operators';

@Component({
  selector: 'app-editar-articulo-locacion',
  templateUrl: './editar-articulo-locacion.component.html',
  styleUrls: ['./editar-articulo-locacion.component.scss']
})
export class EditarArticuloLocacionComponent implements OnInit {

  almacenes: Almacen[];
  theForm: FormGroup;
  submitted= false;
  locaciones$: Locacion[];
  title: string="Editar Relación Artículo-Locación";
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

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private theService: ArticulosService, 
    private formBuilder: FormBuilder, 
    public dRef: MatDialogRef<EditarArticuloLocacionComponent>,
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
      stockMinimo: [this.theCurrentMin, Validators.compose([Validators.required, Validators.min(0)])],
      stockMaximo: [this.theCurrentMax, Validators.compose([Validators.required, Validators.max(this.theMax)])],
      existencias: [this.thePhysical, Validators.compose([Validators.required])]
  });


  }

  validateExistencias(obj: any){
    console.log("Entró a validación");
    if (this.theForm.controls.existencias.value > this.theForm.controls.stockMaximo) {
      this.theForm.controls.existencias.setValidators([Validators.required, Validators.max(this.theMax)]);
    } else {
      this.theForm.controls.stockMaximo.setValidators(null);
    }
    this.theForm.controls.stockMaximo.updateValueAndValidity();
  }
  // convenience getter for easy access to form fields
  get f() { return this.theForm.controls; }

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
    al.LocacionID= this.Locacion.LocacionID;
    al.ExistenciaFisica= this.theForm.controls.existencias.value;
    al.ExistenciaTeorica= this.theTheoretical;
    //console.log("A enviar: ", al);
    this.theService.updateArticuloLocacion(al, this.theArticuloID, this.Locacion.LocacionID)
      .subscribe(
        res => {
          this.notificationService.success("Locación Atualizada");
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
