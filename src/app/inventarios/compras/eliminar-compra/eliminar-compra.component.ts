import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProveedoresService } from 'src/app/catalogos/proveedores/proveedores.service';
import { ComprasService } from '../compras.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NACompra } from 'src/app/shared/classes/NACompra';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-eliminar-compra',
  templateUrl: './eliminar-compra.component.html',
  styleUrls: ['./eliminar-compra.component.scss']
})
export class EliminarCompraComponent implements OnInit {

theForm: FormGroup;
proveedor: NAProveedor;
compra: NACompra= new NACompra;
theID: number;
delete: boolean=false;
articulos: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    private theService: ComprasService,
    private provsService: ProveedoresService,
    private datepipe: DatePipe,
    private router: Router,
    public dRef: MatDialogRef<EliminarCompraComponent>, //Adaptar al modelo!!!
  ) { 
    this.theID= data.ID;
  }

  ngOnInit() {

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
      proveedor: [''],
      razonsocial: [''],
      estatus:[''],
      factura: [''],
      fechaFactura:[''],
      notas: ['']
    });
    this.getDetail();
  }

  onDelete(){
    this.theService.deleteRecord(this.compra.CompraID)
      .subscribe(
        () => {
          this.notificationService.success("Compra eliminada")
        },
        err=>{
          this.notificationService.error('Se ha producido un error');
        }
      );
      this.onClose();
  }

  onClose(){
    this.dRef.close();
  
  }

  getDetail(){
    
    this.theService.getDetail(this.theID)
      .subscribe(
        (res) => {
          this.compra= res as NACompra;
          this.theForm.controls.proveedor.setValue(this.compra.RazonSocial.Proveedor.Nombre);
          this.theForm.controls.razonsocial.setValue(this.compra.RazonSocial.RazonSocial);
          this.theForm.controls.notas.setValue(this.compra.Notas);
          this.theForm.controls.factura.setValue(this.compra.Factura);
          this.theForm.controls.fechaFactura.setValue(this.compra.FechaFactura);
          switch (this.compra.Estatus){
            case 0:
              this.theForm.controls.estatus.setValue('Orden de Compra');
              break;
            case 1:
              this.theForm.controls.estatus.setValue('En Proceso');
              break;
            case 2:
              this.theForm.controls.estatus.setValue('Entregada');
              break;
          }
          if(this.compra.Elementos.length == 0){
            this.delete= true;
            this.articulos=0;
          }else{
            this.articulos= this.compra.Elementos.length;
          }
        },
        err => {
          console.log("Error")
        }
      );
  }

}
