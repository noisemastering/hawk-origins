import { Component, OnInit, Inject } from '@angular/core';
import { MovimientosService } from 'src/app/servicios/movimientos.service';
import { ArticuloMovimiento } from 'src/app/shared/classes/articulo-movimiento';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-eliminar-info-articulo',
  templateUrl: './eliminar-info-articulo.component.html',
  styleUrls: ['./eliminar-info-articulo.component.scss']
})
export class EliminarInfoArticuloComponent implements OnInit {

  title= 'Editar artículo para entrada';
  movimiento: ArticuloMovimiento;

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private movService: MovimientosService,
    public dRef: MatDialogRef<EliminarInfoArticuloComponent>,
  ) {
    this.movimiento= data.art as ArticuloMovimiento; console.log('ID: ', this.movimiento);
   }

  ngOnInit() {
  }

  eliminar(){
    
    this.movService.deleteEntrada(this.movimiento).subscribe(()=>{});
    
    this.onClose();
  }

  onClose(){ //No mover
    this.dRef.close();
  }
}
