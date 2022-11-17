import { Component, OnInit, Inject } from '@angular/core';
import { NAArticulo } from 'src/app/shared/classes/NAArticulo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { ArticulosService } from '../articulos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { NAArticuloProveedor } from 'src/app/shared/classes/NAArticuloProveedor';

@Component({
  selector: 'app-agregar-articulos-proveedores',
  templateUrl: './agregar-articulos-proveedores.component.html',
  styleUrls: ['./agregar-articulos-proveedores.component.scss']
})
export class AgregarArticulosProveedoresComponent implements OnInit {

  articulo= new NAArticulo;
  theForm: FormGroup;
  submitted= false;
  proveedores: NAProveedor[]=[];
  title: string="Relacionar proveedor con artículo";

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private theService: ArticulosService, 
    private provsService: ProveedoresService,
    private formBuilder: FormBuilder, 
    public dRef: MatDialogRef<AgregarArticulosProveedoresComponent>,
    private notificationService: NotificationsService
  ) { 
    this.articulo= data.art as NAArticulo;
    console.log('Artículo: ', this.articulo);
  }

  ngOnInit() {
    
    this.theForm = this.formBuilder.group({
      ID: [this.articulo.FirebaseID],
      nombre: [this.articulo.Nombre],
      proveedorSelect: ['', Validators.required]
    });
    this.getProvs();
  }

  getProvs(){
    this.provsService.getItems()
      .subscribe(
        (res) => {
          this.proveedores= res as NAProveedor[];
          console.log('Proveedores: ', this.proveedores)
        },
        err => {
          console.log('Error al cargar proveedores')
        }
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.theForm.controls; }

  onClose(){
    this.theForm.reset();
    this.dRef.close();
  }

  validate() {
      
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      this.addRelation();
    }
  }

  addRelation(){

    let ap= new NAArticuloProveedor;
    ap.ArticuloID= this.articulo.ArticuloID;
    ap.FirebaseID= this.articulo.FirebaseID;
    ap.ProveedorID= this.theForm.controls.proveedorSelect.value;
    this.theService.linkProvider(ap)
      .subscribe(
        () => {
          this.notificationService.success('Relación agregada');
          this.onClose();
        },
        err => {
          this.notificationService.error('Error'+ err);
          this.onClose();
        }
        
      )

  }

}
