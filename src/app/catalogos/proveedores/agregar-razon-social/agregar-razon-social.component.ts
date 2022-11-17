import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../proveedores.service';
import { NAProveedor } from 'src/app/shared/classes/NAProveedor';
import { NARazonSocial } from 'src/app/shared/classes/NARazonSocial';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-agregar-razon-social',
  templateUrl: './agregar-razon-social.component.html',
  styleUrls: ['./agregar-razon-social.component.scss']
})
export class AgregarRazonSocialComponent implements OnInit {


  proveedor: NAProveedor;

  theForm: FormGroup;                                       
  submitted= false;        
  working: boolean= true;    
  title: string= 'Asociar Razón Social con Proveedor';                                     

  constructor(@Inject(MAT_DIALOG_DATA) data, //No mover!!!
  private formBuilder: FormBuilder, //No mover!!!
  public dRef: MatDialogRef<AgregarRazonSocialComponent>, //Adaptar según modelo correspondiente
  private theService: ProveedoresService, //Adaptar según modelo correspondiente
  private notificationService: NotificationsService
  ) 
  { this.proveedor= data.prov as NAProveedor; }//No mover

  ngOnInit() {

    this.theForm = this.formBuilder.group({
      razon: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      rfc: ['', Validators.compose([Validators.required,Validators.minLength(12),Validators.maxLength(13)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      calle: ['', Validators.required],
      exterior: ['', Validators.compose([Validators.required])],
      interior: [''],
      colonia: ['', Validators.required],
      cp: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(5)])],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],
      zipID: ['', Validators.required]
    });
    
  }

  ////// Funciones

  ////// Formularios y validaciones

  get f() { return this.theForm.controls; } // Mo mover!!!


  duplicate(valor: string){ // Adaptar a los campos utilizados

    this.working= true;
    /*
    this.theService.checkForDuplicate("duplicate", "RazonSocial", "Proveedores", )
        .subscribe((response: SimpleResponse) => {
          if(response.value=="Duplicate"){
            this.theForm.controls['razon'].setErrors({'duplicate': true});
          }
          console.log(response);
  

    this.working= false;
    */
  }

  resetForm(){ // No mover
    console.log('Form reset');
    this.theForm.reset();
  }

  validate() { // No mover
    
    this.submitted = true;
    this.theForm.controls.zipID.setValue(0);
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      //console.log('Form is valid');
      //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
      this.addRecord();
    }
  }

 //// Envío de datos al servidor

  // Adaptar al modelo correspondiente
  addRecord(): void {
       
    let razon= new NARazonSocial;
    razon.Calle= this.theForm.controls.calle.value;
    razon.CodigoPostal= this.theForm.controls.cp.value;
    razon.CodigoPostalID=0;
    razon.Colonia= this.theForm.controls.colonia.value;
    razon.Email= this.theForm.controls.email.value;
    razon.Estado= this.theForm.controls.estado.value;
    razon.Exterior= this.theForm.controls.exterior.value;
    razon.Interior= this.theForm.controls.interior.value;
    razon.Municipio= this.theForm.controls.municipio.value;
    razon.ProveedorID= this.proveedor.ProveedorID;
    razon.RFC= this.theForm.controls.rfc.value;
    razon.RazonSocial= this.theForm.controls.razon.value;

  this.theService.addRazon(razon)
      .subscribe(
        (res) => {
          this.notificationService.success('Razón social asociada');
        },
        err => {
          this.notificationService.error('Error, el registro no pudo ser creado');
        }
    );
  
  this.onClose();
  }

  ////// Otras funciones
  getZips(): void {
    /*
    this.working= true;
    console.log('Durante working: '+ this.working);
    this.zips$=this.zipService.getZip(this.theForm.controls['cp'].value);
    this.working= false;
    console.log('Después working: '+ this.working);*/
  }

  onClose(){
    this.dRef.close();
  
  }

}
