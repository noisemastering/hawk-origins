import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { 
  MatDialogRef,
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from '@angular/material'; 

import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';
import { Response } from 'src/app/shared/classes/response';

import { AlmacenesService } from '../almacenes.service';                                //
import { AutocompleteService } from 'src/app/servicios/autocomplete.service'; 
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { DuplicatesService } from 'src/app/servicios/duplicates.service';
import { SimpleResponse } from 'src/app/shared/classes/simple-response';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/shared/classes/usuario';

@Component({
  selector: 'app-agregar-almacen',
  templateUrl: './agregar-almacen.component.html',
  styleUrls: ['./agregar-almacen.component.scss'],
  providers:[AutocompleteService]
})
export class AgregarAlmacenComponent implements OnInit {

  almacen: Almacen;
  theForm: FormGroup;
  submitted= false;
  items= <any>[];
  keyws= <any>[];
  locaciones: Locacion[];
  selectedFile: File = null;
  title: string="Agregar Almacén";
  usuario: Usuario;
  //spinner: SpinnerComponent= new SpinnerComponent;
  working: boolean= false;

  //Chip
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  keywords = [];
  separatorKeysCodes = [ENTER, COMMA];

  @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoKW') matAutocompleteKW: MatAutocomplete;
  

  constructor(
    private almacenService: AlmacenesService, 
    private formBuilder: FormBuilder, 
    private autocompleteService: AutocompleteService,
    public dRef: MatDialogRef<AgregarAlmacenComponent>,
    private notificationService: NotificationsService,
    private duplicateService: DuplicatesService,
    public datepipe: DatePipe
    ) { }

    ngOnInit() {
        //this.spinner.message="Cargando";
        this.theForm = this.formBuilder.group({
            descripcion: ['', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(24)])],
            keys: [''],
            notas: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(160)])],
            items: this.formBuilder.array([ this.createItem() ])
        });
        this.items.push(this.createItem());
        this.theForm.controls['keys'].valueChanges.subscribe(
          term => { console.log('entro')
            if (term != '') {
              this.autocompleteService.searchKW(term).subscribe(
                data => {
                  this.keyws = data as any[];
                  console.log(data[0].Name);
              })
            }
        });  
        this.working=false;
        this.usuario= JSON.parse(localStorage.getItem('user')) as Usuario;
    }

    // convenience getter for easy access to form fields
    get f() { return this.theForm.controls; }

    addAlmacen(): void {
      this.almacen = new Almacen;
      this.almacen.Clave= "xxxx"
      this.almacen.Nombre=  this.theForm.controls['descripcion'].value;
      this.almacen.Notas=  this.theForm.controls['notas'].value;
      this.almacen.Keywords=  JSON.stringify(this.keywords);
      let date= Date.now();
      this.almacen.Modificado=  this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
      this.almacen.Modifico= this.usuario.ID;
      this.almacen.Creado=  this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');;
      //this.almacen.Creo= 0;
      console.log("New: ", this.almacen);
      /*
      let locs= [];
      for(const control of this.items.controls){
        let loc = new Locacion;
        loc.ID_Almacen= "";
        loc.LineNum= this.items.controls.indexOf(control);
        loc.Descripcion= control.controls['descripcion'].value;
        loc.Notas=control.controls['notas'].value;
        loc.crFecha="";
        loc.crUsuario="";
        loc.uaFecha="";
        loc.uaUsuario="";
        locs.push(loc);
      }
      this.almacen.Locaciones=  JSON.stringify(locs);*/
      //console.log("Almacen a agregar: ", this.almacen);

    this.almacenService.addRecord(this.almacen)
      .subscribe(
        (response: Response) => {
        this.notificationService.success('Almacén creado');
        console.log(response);
        },
        err => {
          this.notificationService.error("Error: "+ err);
        }
      );
    
    this.onClose();
    }
  
    resetForm(){
      console.log('Form reset');
      this.theForm.reset();
    }
  
    validate() {
      
      this.submitted = true;
      // stop here if form is invalid
      if (this.theForm.invalid) {
        console.log('Form invalid');
        return;
      }else{
        //console.log('Form is valid');
        //alert('SUCCESS!! \n\n' + JSON.stringify(this.keywords))
        this.addAlmacen();
      }
    }

    onClose(){
      this.theForm.reset();
      this.dRef.close();
    }

    onFileSelected(event){
      this.selectedFile= <File>event.target.files[0];
      console.log(event);
    }

    duplicate(valor: string){
     this.almacenService.checkForDuplicate(this.theForm.controls.descripcion.value)
      .subscribe(
        (res: any) => {
          if(res.Code==100){
            this.theForm.controls.descripcion.setErrors({'duplicate': false});
          }else{
            this.theForm.controls.descripcion.setErrors({'duplicate': true});
          }
        }
      );
    }

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
      console.log("Entró: "+this.keywords);
      console.log("Keyword: "+keyword);
      let index = this.keywords.indexOf(keyword);
  
      if (index >= 0) {
        this.keywords.splice(index, 1);
      }
      console.log("Terminó: "+this.keywords);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.theForm.controls['keys'].setValue(null);
      this.keywords.push(event.option.viewValue.trim());
      this.keysInput.nativeElement.value = '';
    }

    createItem(): FormGroup {
      return this.formBuilder.group({
        descripcion: [''],
        notas: ['']
      });
    }

    addItem(): void {
      this.items = this.theForm.get('items') as FormArray;
      this.items.push(this.createItem());
    }

    removeItem(index) {
      // this.contactList = this.form.get('contacts') as FormArray;
      this.items.removeAt(index);
    }
}