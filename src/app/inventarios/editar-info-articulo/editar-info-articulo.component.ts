import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule,                                   //
  FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';             //
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Articulo } from 'src/app/shared/classes/articulo';
import { ArticuloMovimiento } from 'src/app/shared/classes/articulo-movimiento';
import { MovimientosService } from 'src/app/servicios/movimientos.service';
import { GenericsService } from 'src/app/servicios/generics.service';
import { Response } from 'src/app/shared/classes/response';
import { GenericList } from 'src/app/shared/classes/generic-list';
import { SimpleResponse } from 'src/app/shared/classes/simple-response';
import { Observable } from 'rxjs';
import { ArticuloUM } from 'src/app/shared/classes/articulo-um';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { UM } from 'src/app/shared/classes/um';

@Component({
  selector: 'app-editar-info-articulo',
  templateUrl: './editar-info-articulo.component.html',
  styleUrls: ['./editar-info-articulo.component.scss']
})
export class EditarInfoArticuloComponent implements OnInit {

  theForm: FormGroup;  
  title= 'Editar artículo para entrada';
  articulo= new Articulo;
  movimiento: ArticuloMovimiento;
  submitted: boolean=false;
  ums: ArticuloUM[];
  compraDefault: string;
  currentUM= new ArticuloUM;
  currentCosto= 0;
  currentDesc=0;
  currentTotal=0;
  currentCantidad=0;
  working= true;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, // No Mover!!!
    public dRef: MatDialogRef<EditarInfoArticuloComponent>,
    private movService: MovimientosService,
    private catService: CatalogosService,
    private notService: NotificationsService,
  ) {
    this.movimiento= data.art as ArticuloMovimiento; console.log('ID: ', this.movimiento);
   }

  ngOnInit() {
    this.theForm = this.formBuilder.group({
      um: ['', Validators.compose([Validators.required])],
      cantidad: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      costo: ['' , Validators.compose([Validators.required])],
      descuento: [''],
      total: ['']
    });
    this.currentCantidad= this.movimiento.Cantidad; console.log('Cantidad: ', this.currentCantidad);
    this.currentCosto= this.movimiento.CostoUnitario; console.log('Costo: ', this.currentCosto);
    this.currentDesc= this.movimiento.Descuento; console.log('Desc: ', this.currentDesc);
    this.articulo.ID= this.movimiento.ID;
    this.getArtDetail();
    this.getUM();
    this.calculateTotal();
    this.working=false;
  }

  getUM(){
    this.movService.getUMS(this.articulo)
    .subscribe(
      (res: Response)=>{
        this.ums= res.object.ums as ArticuloUM[];
        for(const u of this.ums){
          u as ArticuloUM;
          if(u.AutoID==this.movimiento.UM.AutoID){
            this.currentUM= u as ArticuloUM; console.log("Current UM: ", this.currentUM);
          }
        }
      }
    );
    this.calculateTotal();
  }

  getArtDetail(){
    this.catService.serviceURL= this.articulo.serviceURL;
    this.catService.getDetail(this.articulo)
    .subscribe(
      (res: Response)=>{
        this.articulo= res.object as Articulo;
        console.log("Articulo: ", this.articulo);
        this.theForm.controls['cantidad'].setValue(this.movimiento.Cantidad);
        this.theForm.controls['descripcion'].setValue(this.articulo.Descripcion);
        this.theForm.controls['costo'].setValue(this.movimiento.CostoUnitario);
        this.theForm.controls['descuento'].setValue(this.movimiento.Descuento);
        this.calculateTotal();
      },
      err =>{
        this.notService.error('Error en Artículo');
      }
    );
  }

  calculateTotal(){
    console.log("Entro", this.currentTotal);
    this.currentCantidad= this.theForm.controls['cantidad'].value;
    this.currentCosto= this.theForm.controls['costo'].value;
    this.currentDesc= this.theForm.controls['descuento'].value;
    this.currentTotal= (this.currentCantidad*this.currentCosto)+((this.articulo.PorcentajeIVA/100)*this.currentCosto)+((this.articulo.PorcentajeIEPS/100)*this.currentCosto)-this.currentDesc
    console.log("Total", this.currentTotal);
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

  validate() { // No mover
      
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.addMovimiento();
    }
  }

  addMovimiento(): void {
    //this.movimiento= new ArticuloMovimiento;
    ///////// Adaptar según el modelo correspondiente
    this.movimiento.UM= this.currentUM;
    this.movimiento.Cantidad= Number(this.theForm.controls['cantidad'].value);
    this.movimiento.ID= this.articulo.ID;
    this.movimiento.NombreAgr= this.articulo.Descripcion;
    this.movimiento.CostoUnitario= Number(this.theForm.controls['costo'].value);
    (this.theForm.controls['descuento'].value=="") ? this.movimiento.Descuento=0 : this.movimiento.Descuento= Number(this.theForm.controls['descuento'].value);
    (this.articulo.PorcentajeIEPS==null) ? this.movimiento.IEPS=0 : this.movimiento.IEPS=this.articulo.PorcentajeIEPS;
    (this.articulo.PorcentajeIVA==null) ? this.movimiento.IVA=0 : this.movimiento.IVA=this.articulo.PorcentajeIVA;
    console.log("Mov a act: ", this.movimiento);
    this.movService.updateEntrada(this.movimiento).subscribe(()=>{});
    
    this.onClose();
  } 

  updateObject(val: string, text: string){
    for(const u of this.ums){
      u as ArticuloUM;
      if (u.AutoID==val){ 
        this.currentUM=u;
        this.currentCosto= this.currentUM.Costo;
        //this.calculateTotal();
        console.log("Current UM: ", this.currentUM);
      }
    }
  }

  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }
}
