import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComprasService } from '../../compras/compras.service';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';

@Component({
  selector: 'app-agreagr-articulo-asignacion',
  templateUrl: './agreagr-articulo-asignacion.component.html',
  styleUrls: ['./agreagr-articulo-asignacion.component.scss']
})
export class AgreagrArticuloAsignacionComponent implements OnInit {

  index: number;
  elemento: any;
  almacen: Almacen;
  locacion: Locacion;
  theForm: FormGroup;
  submitted= false;
  title: string="Agregar artículo";
  artloc: NAArticulosLocaciones= new NAArticulosLocaciones;
  medidas= [
    {ID:'empaque', Descripcion: 'Empaque completo'},
    {ID:'pieza', Descripcion: 'Por pieza'},
    {ID:'granel', Descripcion: 'A granel'}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService,
    public dRef: MatDialogRef<AgreagrArticuloAsignacionComponent>,
    private theService: ComprasService // Adaptar según modelo correspondienteya lo 
  ) {
      this.elemento= data.art;
      console.log("Elemento: ", this.elemento);
      this.almacen= data.al;
      console.log("Almacen: ", this.almacen);
      this.locacion= data.loc;
      console.log("Locacion: ", this.locacion);
      this.index= data.index;
      console.log("Index: ", this.index);
   }

  ngOnInit() {
    this.theForm = this.formBuilder.group({
      ID: [this.elemento.Presentacion.Articulo.FirebaseID],
      nombre: [this.elemento.Presentacion.Articulo.Nombre],
      presentacion: [this.elemento.Presentacion.Nombre],
      descripcion: [this.elemento.Presentacion.Descripcion],
      aMover:['', Validators.compose([Validators.required])],
      medida: [''],
      almacen:[this.almacen.Nombre],
      locacion:[this.locacion.Nombre],
      maximo: [''],
      minimo: [''],
      actual:[''],
      cantidad:['']
    });
    //console.log("Medias: ", this.medidas)
    this.getArtLocDetail();
  }

  validate() { // No mover
      
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.addItem();
      this.onClose();
    }
  }

  ////// Ventanas
  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

  getArtLocDetail(){
    this.theService.detalleArticuloLocacion(this.elemento.Presentacion.Articulo.FirebaseID,this.locacion.LocacionID)
    .subscribe(
      (res) => {
        this.artloc= res as NAArticulosLocaciones;
        this.theForm.controls.maximo.setValue(this.artloc.StockMaximo);
        this.theForm.controls.minimo.setValue(this.artloc.StockMinimo);
        this.theForm.controls.actual.setValue(this.artloc.ExistenciaTeorica);
      }
    )
  }

  addItem(){
    this.elemento.Added= this.theForm.controls.aMover.value;
    this.elemento.Disponible-= this.theForm.controls.aMover.value;
    this.elemento.Tipo= this.theForm.controls.medida.value;
    this.elemento.Index= this.index;
    localStorage.setItem("itemCompra",JSON.stringify(this.elemento));
  }

  get f() { return this.theForm.controls; }


  resetForm(){}
}
 