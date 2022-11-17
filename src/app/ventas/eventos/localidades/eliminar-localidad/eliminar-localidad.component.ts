///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';       //
import { FormGroup, FormControl,                                                        //
  ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';                  //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA,                                                                       //
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';                                                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { Response } from 'src/app/shared/classes/response';                             //
import { CatalogosService } from 'src/app/servicios/catalogos.service';                 //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Localidad } from 'src/app/shared/classes/localidad';

@Component({
  selector: 'app-eliminar-localidad',
  templateUrl: './eliminar-localidad.component.html',
  styleUrls: ['./eliminar-localidad.component.scss']
})
export class EliminarLocalidadComponent implements OnInit {

  /////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                         //
  submitted= false;                                                   //
  items= <any>[];                                                     //
  keyws= <any>[];                                                     //
  spinner: SpinnerComponent= new SpinnerComponent;                    //
  working: boolean= false;                                            //
  //MatChip                                                           //
  visible: boolean = true;                                            //
  selectable: boolean = true;                                         //
  removable: boolean = true;                                          //
  addOnBlur: boolean = true;                                          //
  keywords = [];                                                      //
  separatorKeysCodes = [ENTER, COMMA];                                //
  @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;    //
  public theID: string;                                               //
  permission: boolean;                                                //
  /////////////////// /No mover !!! ////////////////////////////////////

  private localidad: Localidad;// Adaptar según modelo correspondiente
  title: string="Eliminar";

  constructor(

    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder, //No mover!!!
    public dRef: MatDialogRef<EliminarLocalidadComponent>, //Adaptar al modelo!!!
    private notificationService: NotificationsService, //No mover!!!
    private theService: CatalogosService, // No mover!!!
    
    ) { this.theID= data.theID;}

  ngOnInit() {
    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.spinner.message="Cargando";
    this.theForm = this.formBuilder.group({
        itemID: [''],
        descripcion: [''],
        keys: [''],
        notas: [''],
        fechaCreacion: [''],
        usuarioCreacion: [''],
        ultimaModificacion: [''],
        usuarioModificacion: ['']
    });
    /////////// Traemos datos
    this.getRecord();// No mover!!!
  }


  //////////////// Funciones

  //////////// Formulario
  get f() { return this.theForm.controls; } // No mover

  /////////// Ventanas
  onClose(){
    this.dRef.close();
  
  }


  ////////// Traer datos
  getRecord(): void {
    ///////////// Adaptar al objeto correspondiente
    this.localidad= new Localidad; 
    this.theService.serviceURL= this.localidad.serviceURL;
    this.localidad.ID= this.theID;
    this.theService.getDetail(this.localidad)
    ///////////// /Adaptar al objeto correspondiente
      .subscribe((response: Response )=>{
        this.localidad= <Localidad>response.object; 
        //console.log('Detail: ', this.localidad);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(this.localidad.ID);
        this.theForm.controls['descripcion'].setValue(this.localidad.Descripcion);
        this.theForm.controls['notas'].setValue(this.localidad.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(this.localidad.uaFecha);
        this.theForm.controls['usuarioModificacion'].setValue(this.localidad.uaUsuario);
        this.theForm.controls['fechaCreacion'].setValue(this.localidad.crFecha);
        this.theForm.controls['usuarioCreacion'].setValue(this.localidad.crUsuario);
        this.keyws= this.localidad.Keywords;
        
        ///////////// //Adaptar al modelo correspondiente ////////////

        this.working= false; //No mover
    });
  }

  delete(){
    this.theService.deleteRecord(this.theID)
      .subscribe((response: Response) => {
        if(response.status=="ok"){
          this.notificationService.success('Almacén eliminado'); //Adaptar mensajes
        }
        if(response.status=="error"){
          this.notificationService.error('Error, el almacén no pudo ser eliminado'); //Adaptar mensajes
        }
    });
  
  this.onClose();
  }

////// Keywords No mover!!!
add(event: MatChipInputEvent): void {
  console.log("input");
  let input = event.input;
  let value = event.value;

  // Add our keyword
  if ((value || '').trim()) {
    this.keywords.push(value.trim());
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }
  this.theForm.controls['keys'].setValue(null);
}

remove(keyword: any): void {
  //console.log("Entró: "+this.keywords);
  //console.log("Keyword: "+keyword);
  let index = this.keywords.indexOf(keyword);

  if (index >= 0) {
    this.keywords.splice(index, 1);
  }
  //console.log("Terminó: "+this.keywords);
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.theForm.controls['keys'].setValue(null);
  this.keywords.push(event.option.viewValue.trim());
  this.keysInput.nativeElement.value = '';
}
////////// /Keywords

}
