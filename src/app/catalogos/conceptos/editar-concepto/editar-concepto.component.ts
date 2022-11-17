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
  selector: 'app-editar-concepto',
  templateUrl: './editar-concepto.component.html',
  styleUrls: ['./editar-concepto.component.scss'], 
  providers:[AutocompleteService]
})
export class EditarConceptoComponent implements OnInit {

    /////////////////////// No mover !!! /////////////////////////////////
    theForm: FormGroup;                                         //
    submitted= false;                                                   //
    tipos= [
      {ID:'E', Nombre: 'Entrada'},
      {ID:'S', Nombre: 'Salida'},
    ];                                                                  //
    spinner: SpinnerComponent= new SpinnerComponent;                    //
    working: boolean= false;                                            //
    public theID: string;                                               //
    permission: boolean;          
    tipo: string;                                      //
    /////////////////// /No mover !!! ////////////////////////////////////
  
    private concepto: Concepto;// Adaptar según modelo correspondiente
    title: string="Eliminar";
  
    constructor(
      @Inject(MAT_DIALOG_DATA) data, //No mover!!!
      private formBuilder: FormBuilder,  //No mover!!!
      private notificationService: NotificationsService,  //No mover!!!
      public dRef: MatDialogRef<EditarConceptoComponent>, // Adaptar según modelo correspondiente
      private theService: ConceptosService // Adaptar según modelo correspondienteya lo 
      ) { 
        this.theID= data.theID; console.log('Obj: '+this.theID);
      }
  
    ngOnInit() {
  
      this.spinner.message="Cargando"; //No mover!!!
  
      ////////// Creación de formulario, adaptar según modelo correspondiente
      this.theForm = this.formBuilder.group({
          nombre: ['', Validators.compose([Validators.minLength(4), Validators.required])],
          tipo: ['', Validators.compose([Validators.required])],
          descripcion: ['', Validators.compose([Validators.minLength(10)])],
          fechaCreacion: [''],
          usuarioCreacion: [''],
          ultimaModificacion: [''],
          usuarioModificacion: ['']
      });
      this.working=false;
      /////////////// /No mover!!! ////////////
  
      /////////// Traemos datos
      this.getRecord();// No mover!!!
  
    }
  
    ////// Funciones
  
    ////// Formularios y validaciones
  
    get f() { return this.theForm.controls; } // Mo mover!!!
  
  
    duplicate(obj: any){

      this.theService.checkForDuplicate(this.theForm.controls.nombre.value, 1, this.concepto.ConceptoID)
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
        this.editRecord();
      }
    }
  
    /////////// /Formularios
    
    ////////// Traer datos
    getRecord(): void {

      this.theService.getDetail(parseInt(this.theID))
        .subscribe((res )=>{
          this.concepto= res as Concepto; 
          console.log('Detail: ', this.concepto);
          this.theForm.controls['descripcion'].setValue(this.concepto.Descripcion);
          this.theForm.controls['nombre'].setValue(this.concepto.Nombre);
          this.theForm.controls['ultimaModificacion'].setValue(this.concepto.Modificado);
          this.theForm.controls['usuarioModificacion'].setValue(this.concepto.Modifico);
          this.theForm.controls['fechaCreacion'].setValue(this.concepto.Creado);
          this.theForm.controls['usuarioCreacion'].setValue(this.concepto.Creo);
          this.theForm.controls.tipo.setValue(this.concepto.Tipo);
          this.tipo= this.concepto.Tipo;
          this.working= false; //No mover
      });
    }
  
  
    ////// Ventanas
    onClose(){ //No mover
      this.theForm.reset();
      this.dRef.close();
    }
    
    //// Envío de datos al servidor
  
    editRecord(): void {
  
      this.concepto.Descripcion=  this.theForm.controls['descripcion'].value;
      this.concepto.Nombre=  this.theForm.controls['nombre'].value;
      if(this.theForm.controls['tipo'].value!=""){
        this.concepto.Tipo=  this.theForm.controls['tipo'].value;
      }
      let pipe = new DatePipe('en-US'); // Use your own locale
      const now = Date.now();
      const formattedDate = pipe.transform(now,'yyyy-MM-dd h:m:s');
      this.concepto.Modificado= formattedDate;
      console.log("Concepto: ", this.concepto);
  
      this.theService.editRecord(this.concepto)
        .subscribe(
          (res) => {
            this.notificationService.success('Concepto actualizado');
          },
          err =>{
            this.notificationService.error('Error, no fue posible actualizar el concepto');
          //console.log(response);
      });
    
    this.onClose();
    } 

}
