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

@Component({
  selector: 'app-info-articulo',
  templateUrl: './info-articulo.component.html',
  styleUrls: ['./info-articulo.component.scss']
})
export class InfoArticuloComponent implements OnInit {

  theForm: FormGroup;  
  title= 'Agregar artículo para entrada';
  articulo: Articulo;
  movimiento: ArticuloMovimiento;
  submitted: boolean=false;
  ums: ArticuloUM[];
  compraDefault: string;
  currentUM= new ArticuloUM;
  currentCosto= 0;
  currentDesc=0;
  currentTotal=0;
  currentCantidad=0;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, // No Mover!!!
    public dRef: MatDialogRef<InfoArticuloComponent>,
    private movService: MovimientosService
  ) {
    this.articulo= data.art as Articulo; console.log('ID: ', this.articulo);
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
    this.theForm.controls['descripcion'].setValue(this.articulo.Descripcion);
    this.getUM();
  }

  getUM(){
    this.movService.getUMS(this.articulo)
    .subscribe(
      (res: Response)=>{
        this.ums= res.object.ums as ArticuloUM[];
        for(const u of this.ums){
          //console.log("Current: ", u);
          if (u.EsUnidadCompra=="-1"){ //console.log("Entro Es U Compra")
            this.compraDefault=u.AutoID; //console.log("Compra Default", this.compraDefault);
            this.currentCosto= u.Costo;
            this.currentUM= u; console.log("Current UM", this.currentUM);
            //this.currentUM.AutoID= u.AutoID;
            //this.currentUM.Descripcion= u.Descripcion;
          }
        }
        console.log("UMS", this.ums);
      }
    );
    this.calculateTotal();
  }

  calculateTotal(){
    console.log("Entro", this.currentTotal);
    this.currentCantidad= this.theForm.controls['cantidad'].value;
    this.currentCosto= this.theForm.controls['costo'].value;
    this.currentDesc= this.theForm.controls['descuento'].value;
    this.currentTotal= (this.currentCantidad*this.currentCosto)+((this.articulo.PorcentajeIVA/100)*this.currentCosto)+((this.articulo.PorcentajeIEPS/100)*this.currentCosto);
    this.currentTotal= this.currentTotal-((this.currentDesc/100)*this.currentTotal);
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
    this.movimiento= new ArticuloMovimiento;
    ///////// Adaptar según el modelo correspondiente
    this.movimiento.UM= this.currentUM;
    this.movimiento.Cantidad= Number(this.theForm.controls['cantidad'].value);
    this.movimiento.ID= this.articulo.ID;
    this.movimiento.NombreAgr= this.articulo.Descripcion;
    this.movimiento.CostoUnitario= Number(this.theForm.controls['costo'].value);
    (this.theForm.controls['descuento'].value=="") ? this.movimiento.Descuento=0 : this.movimiento.Descuento= Number(this.theForm.controls['descuento'].value);
    (this.articulo.PorcentajeIEPS==null) ? this.movimiento.IEPS=0 : this.movimiento.IEPS=this.articulo.PorcentajeIEPS;
    (this.articulo.PorcentajeIVA==null) ? this.movimiento.IVA=0 : this.movimiento.IVA=this.articulo.PorcentajeIVA;
    this.movService.addEntrada(this.movimiento).subscribe(()=>{});
    
    this.onClose();
  } 

  updateObject(val: string, text: string){
    for(const u of this.ums){
      console.log("Current UM: ", u);
      if (u.AutoID==val){ this.currentUM=u as ArticuloUM}
    }
    this.currentCosto= this.currentUM.Costo;
  }

  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }
}
