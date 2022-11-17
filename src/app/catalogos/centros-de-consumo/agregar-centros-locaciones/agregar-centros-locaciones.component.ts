import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { AlmacenesService } from '../../almacenes/almacenes.service';
import { CentroConsumoService } from '../centro-consumo.service';
import { DatePipe } from '@angular/common';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { NALocacionesCentrosConsumo } from 'src/app/shared/classes/locaciones-centros-consumo';

@Component({
  selector: 'app-agregar-centros-locaciones',
  templateUrl: './agregar-centros-locaciones.component.html',
  styleUrls: ['./agregar-centros-locaciones.component.scss']
})
export class AgregarCentrosLocacionesComponent implements OnInit {

  theForm: FormGroup;
  almacenes: Almacen[];
  locaciones$: Locacion[];
  centroID: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private notificationService: NotificationsService,  //No mover!!!
    public dRef: MatDialogRef<AgregarCentrosLocacionesComponent>, // Adaptar según modelo correspondiente
    private almacenesService: AlmacenesService,
    private theService: CentroConsumoService,
    private datepipe: DatePipe
  ) { 
    this.centroID= data.theID;
  }

  ngOnInit() {

    this.theForm = this.formBuilder.group({
      almacenSelect:[''],
      locacionSelect:['']
    });

    this.getAlmacenes();

  }

  getAlmacenes(){
    this.almacenesService.getItems()
      .subscribe(
        (res) => {
          this.almacenes= res as Almacen[];
        },
        err => {
        }
      );
  }

  updateLocs(){
    this.almacenesService.getDetailNA(this.theForm.controls.almacenSelect.value)
      .subscribe(
        (res) => {
          let alm: any;
          alm= res;
          this.locaciones$= alm.NALocaciones;
        }
      );
  }

  onAdd(){
    let LCC= new NALocacionesCentrosConsumo;
    LCC.CentroConsumoID= this.centroID;
    LCC.LocacionID= this.theForm.controls.locacionSelect.value;
    this.theService.addRelationCC(LCC)
      .subscribe(
        () => {
          this.notificationService.success('Relación agregada');
          this.onClose();
        },
        err => {
          this.notificationService.success('Error al agregar relación: '+err);
          this.onClose();
        }
      )
  }

  onClose(){
    this.dRef.close()
  }

}
