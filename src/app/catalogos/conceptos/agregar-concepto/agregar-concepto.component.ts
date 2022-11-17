///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import {                                                                                //  
  Component, OnInit, Inject                                                         //  
} from '@angular/core';                                                                 //
import {                                                                                //
  FormGroup,                                                                            //
  FormBuilder,                                                                          //
  Validators,                                                                           //
} from '@angular/forms';                                                                //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA,                                                                      //
} from '@angular/material';                                                             //
//                                                                                      //
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';           //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { DuplicatesService } from 'src/app/servicios/duplicates.service';               //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Concepto } from 'src/app/shared/classes/concepto';
import { ConceptosService } from '../conceptos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-concepto',
  templateUrl: './agregar-concepto.component.html',
  styleUrls: ['./agregar-concepto.component.scss'], 
  providers:[AutocompleteService]
})
export class AgregarConceptoComponent implements OnInit {

    /////////////////////// No mover !!! /////////////////////////////////
    theForm: FormGroup;                                         //
    submitted= false;                                                   //
    tipos= [
      {ID:'E', Nombre: 'Entrada'},
      {ID:'S', Nombre: 'Salida'},
    ];                                                                  //
    spinner: SpinnerComponent= new SpinnerComponent;                    //
    working: boolean= false;                           //
    /////////////////// /No mover !!! ////////////////////////////////////
  
    private concepto: Concepto;// Adaptar según modelo correspondiente
    title: string="Eliminar";
  
    constructor(
      private formBuilder: FormBuilder,  //No mover!!!
      private notificationService: NotificationsService,  //No mover!!!
      public dRef: MatDialogRef<AgregarConceptoComponent>, // Adaptar según modelo correspondiente
      private theService: ConceptosService // Adaptar según modelo correspondienteya lo 
      ) { 
      }
  
    ngOnInit() {
  
      this.spinner.message="Cargando"; //No mover!!!
  
      ////////// Creación de formulario, adaptar según modelo correspondiente
      this.theForm = this.formBuilder.group({
          nombre: ['', Validators.compose([Validators.minLength(4), Validators.required])],
          tipo: ['', Validators.compose([Validators.required])],
          descripcion: ['', Validators.compose([Validators.minLength(10)])]
      });
      this.working=false;
      /////////////// /No mover!!! ////////////
    
    }
  
    ////// Funciones
  
    ////// Formularios y validaciones
  
    get f() { return this.theForm.controls; } // Mo mover!!!
  
  
    duplicate(obj: any){

      this.theService.checkForDuplicate(this.theForm.controls.nombre.value, 0, 0)
        .subscribe(
          (res: any) => {
            console.log("Duplicate",res);
            if(res.Code==100){
              this.theForm.controls.nombre.setErrors({'duplicate': false});
              this.theForm.controls.nombre.updateValueAndValidity();
            }else{
              this.theForm.controls.nombre.setErrors({'duplicate': true});
            }
          }
        );
      
    }
  
    resetForm(){ // No mover
      console.log('Form reset');
      this.theForm.reset();
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
        this.addRecord();
      }
    }
   
  
    ////// Ventanas
    onClose(){ //No mover
      this.theForm.reset();
      this.dRef.close();
    }
    
    //// Envío de datos al servidor
  
    addRecord(): void {
      this.concepto= new Concepto;
      this.concepto.Descripcion=  this.theForm.controls['descripcion'].value;
      this.concepto.Nombre=  this.theForm.controls['nombre'].value;
      this.concepto.Tipo=  this.theForm.controls['tipo'].value;
      let pipe = new DatePipe('en-US'); // Use your own locale
      const now = Date.now();
      const formattedDate = pipe.transform(now,'yyyy-MM-dd h:m:s');
      this.concepto.Modificado= formattedDate;
      this.concepto.Creado= formattedDate;
      this.concepto.Creo= 1;
      this.concepto.Modifico= 1;
      console.log("Concepto: ", this.concepto);
  
      this.theService.addRecord(this.concepto)
        .subscribe(
          (res) => {
            this.notificationService.success('Concepto actualizado');
          },
          err =>{
            this.notificationService.error('Error, no fue posible actualizar el concepto');
      });
    
    this.onClose();
    } 

}
