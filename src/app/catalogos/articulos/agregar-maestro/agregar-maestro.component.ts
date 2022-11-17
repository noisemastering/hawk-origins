///////////// No Mover!!!!! //////////////////////////////////////////////////////////////  
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';               //
import { FormGroup, FormControl, ReactiveFormsModule,                                   //
        FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';             //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { Articulo } from 'src/app/shared/classes/articulo';
import { GenericList } from 'src/app/shared/classes/generic-list';
import { DuplicatesService } from 'src/app/servicios/duplicates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';                                  //
import { ENTER, COMMA } from '@angular/cdk/keycodes';                                   // 
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';  
import { ArticulosService } from '../articulos.service';
import { ArticuloImportado } from 'src/app/shared/classes/articulo-importado';
import { ArticuloGranel } from 'src/app/shared/classes/articulo-granel';
import { AngularFirestore } from '@angular/fire/firestore';
import { Categoria } from 'src/app/shared/classes/categoria';
import { ArticuloDivisible } from 'src/app/shared/classes/articulo-divisible';
import { ArticuloUnitario } from 'src/app/shared/classes/articulo-unitario';
import { ArticuloPieza } from 'src/app/shared/classes/articulo-pieza';
import { Merma } from 'src/app/shared/classes/merma';
import { Presentacion } from 'src/app/shared/classes/presentacion';

@Component({
  selector: 'app-agregar-maestro',
  templateUrl: './agregar-maestro.component.html',
  styleUrls: ['./agregar-maestro.component.scss'],
  providers: [AutocompleteService]
})
export class AgregarMaestroComponent implements OnInit {

  theForm: FormGroup;
  submitted= false;            
  mermas= <any>[];
  presentaciones= <any>[];
  keyws= <any>[];                                                   //          
//MatChip                                                         //
visible: boolean = true;                                          //
selectable: boolean = true;                                       //
removable: boolean = true;                                        //
addOnBlur: boolean = true;                                        //
keywords = [];         
theCategory: string;                                           //
separatorKeysCodes = [ENTER, COMMA];                              //
@ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;  //
@ViewChild('autoKW') matAutocompleteKW: MatAutocomplete;          //
  ///// Adaptar al objeto correspondiente
  title: string="Agregar Artículo";
  articulo: any;
  articuloImp: ArticuloImportado;
  umcs: GenericList[];
  umvs: GenericList[];
  currentUMB: string;
  granel: boolean=false;
  pieza: boolean=false;
  divisible: boolean= false;
  unitario: boolean= false;
  artGranel: ArticuloGranel;
  artDivisible: ArticuloDivisible;
  artUnitario: ArticuloUnitario;
  artPieza: ArticuloPieza;

  //Arrays y listas
  categorias: any[];
  subcategorias: any[];
  tipos= [
    {id:'granel', descripcion: 'A granel'},
    {id:'pieza', descripcion: 'Pieza'},
    {id:'divisible', descripcion: 'Divisible'},
    {id:'unitario', descripcion: 'Unitario'}
  ]
  umbs: any[];

  constructor(
    private formBuilder: FormBuilder, // No Mover!!!
    private autocompleteService: AutocompleteService, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private duplicateService: DuplicatesService, // No Mover!!!
    private theRouter: Router, // No mover!!!
    private theService: ArticulosService,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.theForm = this.formBuilder.group({
      tipo:[''],
      nombre: ['', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(24)])],
      categoria:['', Validators.compose([Validators.required])],
      subcategoria: ['', Validators.compose([Validators.required])],
      rendimiento:['', Validators.compose([Validators.required, Validators.max(100), Validators.min(1)])],
      umb: ['', Validators.compose([Validators.required])],
      unidad: ['', Validators.compose([Validators.max(1)])],
      upc: ['', Validators.compose([Validators.required, Validators.maxLength(13), Validators.minLength(12)])],
      keys: [''],
      mermas: this.formBuilder.array([]),
      presentaciones: this.formBuilder.array([])
      //iva:[''],
      //ieps:['']
      
    });
    this.addItemMerma();
    this.addItemPresentacion();
    this.theService.getCategories()
      .subscribe(
        (res: any) => {
          this.categorias= res.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data()
              } as any
            }
          )
          console.log("Categorías: ",this.categorias);
        } 
      );
  }


  ////////// Keywords

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

  //////// Keywords


  typeSelected(obj: any){
    
    switch (this.theForm.controls.tipo.value){
      case 'granel':
        this.granel= true;
        this.pieza= false;
        this.divisible= false;
        this.unitario= false;
        this.umbs= [
          {id:'kg', descripcion: 'Kilogramo'},
          {id:'l', descripcion: 'Litro'},
          {id:'pza', descripcion: 'Pieza'}
        ];
        /*
        this.articulo= new ArticuloGranel;
        this.articulo.nombre= this.theForm.controls.descripcion.value;
        this.articulo.pieza= this.theForm.controls.pieza.value;
        this.articulo.rendimiento= this.theForm.controls.rendimiento.value;
        this.articulo.categoria= this.theForm.controls.categoria.value;
        this.articulo.subcategoria= this.theForm.controls.subcategoria.value;
        this.articulo.ubase= this.theForm.controls.umb.value;
        this.articulo.keywords= this.keywords;
        this.articulo.mermas= [];
        this.articulo.presentaciones= [];*/
        break;
      case 'pieza':
        this.granel= false;
        this.pieza= true;
        this.divisible= false;
        this.unitario= false;
        this.umbs= [
          {id:'pza', descripcion: 'Pieza'},
        ];
        break;
      case 'divisible':
        this.granel= false;
        this.pieza= false;
        this.divisible= true;
        this.unitario= false;
        this.umbs= [
          {id:'kg', descripcion: 'Kilogramo'},
          {id:'l', descripcion: 'Litro'}
        ];
        break;
      case 'unitario':
        this.removeItemMerma(0);
        this.theForm.controls.rendimiento.setValue('100');
        this.umbs= [
          {id:'pza', descripcion: 'Pieza'}
        ];
        this.granel= false;
        this.pieza= false;
        this.divisible= false;
        this.unitario= true;
        break;
    }
  }

  categorySelected(obj: any, event){

    let target = event.source.selected._element.nativeElement;
    this.theCategory= target.innerText.trim();
    let res = this.categorias.filter(c => c.id.includes(this.theForm.controls.categoria.value)) as any;
    this.subcategorias= res[0].subcategorias;
    console.log("Seleccionada: ",this.subcategorias);
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

  duplicate(nombre: string){
    
    this.theService.checkForDuplicateFirestore(this.theForm.controls.nombre.value)
      .subscribe(
        res => {
          console.log("Res: ", res);
          if (res.length != 0){
            this.theForm.controls.nombre.setErrors({'duplicate': true});
          }else{
            this.theForm.controls.nombre.setErrors({'duplicate': null});
          }
          this.theForm.controls.nombre.updateValueAndValidity();
        }
      );  

  }

  ////// Formularios dinámicos, de lo contrario, borrar

  //Adaptar al modelo correspondiente
  createItemMerma(): FormGroup {
    return this.formBuilder.group({
      concepto: [''],
      valor: ['']
    });
  }
  ////// No mover!!!
  addItemMerma(): void {
    this.mermas = this.theForm.get('mermas') as FormArray;
    this.mermas.push(this.createItemMerma());
  }

  ////// No mover!!!
  removeItemMerma(index) {
    this.mermas.removeAt(index);
  }
  ////// /Formularios dinámicos, de lo contrario, borrar

  ////// Formularios dinámicos, de lo contrario, borrar

  //Adaptar al modelo correspondiente
  createItemPresentacion(): FormGroup {
    let val= '';
    if(this.theForm.controls.tipo.value=='unitario'){val='1'}
    return this.formBuilder.group({
      nombre: [''],
      descripcion: [''],
      unidades:[''],
      equivalencia: [val],
      upc:['']
    });
  }
  ////// No mover!!!
  addItemPresentacion(): void {
    this.presentaciones = this.theForm.get('presentaciones') as FormArray;
    this.presentaciones.push(this.createItemPresentacion());
  }

  ////// No mover!!!
  removeItemPresentacion(index) {
    this.presentaciones.removeAt(index);
  }
  ////// /Formularios dinámicos, de lo contrario, borrar

  sendItem(){
    switch (this.theForm.controls.tipo.value){
      case 'granel':
        this.artGranel = new ArticuloGranel;
        this.artGranel.ubase= this.theForm.controls.unidad.value;
        this.artGranel.tipo= this.theForm.controls.tipo.value;
        this.artGranel.nombre= this.theForm.controls.nombre.value;
        this.artGranel.categoria= this.theCategory;
        this.artGranel.subcategoria= this.theForm.controls.subcategoria.value;
        this.artGranel.rendimiento= this.theForm.controls.rendimiento.value;
        this.artGranel.ubase= this.theForm.controls.umb.value;
        this.artGranel.keywords= this.keywords;
        if(this.theForm.controls.unidad.value==''){
          this.artGranel.pieza=0;
        }else{
          this.artGranel.pieza= this.theForm.controls.unidad.value; 
        }

        if(this.mermas.length > 0){
          let mms: Merma[]=[];
          for(const m of this.mermas.controls){
            let merm: Merma = new Merma;
            merm.concepto= m.controls['concepto'].value;
            merm.valor= m.controls['valor'].value;
            mms.push(merm);
          }
          const mm = mms.map((obj)=> {return Object.assign({}, obj)});
          this.artGranel.mermas= mm;
        }

        if(this.presentaciones.length > 0){
          let pps: Presentacion[]=[];
          for(const p of this.presentaciones.controls){
            let pre: Presentacion = new Presentacion;
            pre.nombre= p.controls['nombre'].value;
            pre.descripcion= p.controls['descripcion'].value;
            pre.unidades= p.controls['unidades'].value;
            pre.equivalencia= p.controls['equivalencia'].value;
            pre.upc= p.controls['upc'].value;
            pps.push(pre);
          }
          const pp = pps.map((obj)=> {return Object.assign({}, obj)});
          this.artGranel.presentaciones= pp;
        }
        
        //console.log("A subir: ", item);
        let data = Object.assign({}, this.artGranel);
        this.firestore.collection<any>('articulos').add(data)
          .then(
            () => {
              this.notificationService.success("Artículo agregado al catálogo maestro");
              this.theRouter.navigateByUrl("/hawk/catalogos/articulos/maestro");
            },
            err =>{
              this.notificationService.success("Error al agregar artículo");
            }
          );

        break;

      case 'unitario':
        this.artUnitario = new ArticuloUnitario;
        this.artUnitario.ubase= this.theForm.controls.unidad.value;
        this.artUnitario.tipo= this.theForm.controls.tipo.value;
        this.artUnitario.nombre= this.theForm.controls.nombre.value;
        this.artUnitario.categoria= this.theCategory;
        this.artUnitario.subcategoria= this.theForm.controls.subcategoria.value;
        this.artUnitario.rendimiento= this.theForm.controls.rendimiento.value;
        this.artUnitario.ubase= this.theForm.controls.umb.value;
        this.artUnitario.upc= this.theForm.controls.upc.value;
        this.artUnitario.keywords= this.keywords;
        
        if(this.mermas.length > 0){
          let mmsu: Merma[]=[];
          for(const m of this.mermas.controls){
            let merm: Merma = new Merma;
            merm.concepto= m.controls['concepto'].value;
            merm.valor= m.controls['valor'].value;
            mmsu.push(merm);
          }
          const mmu = mmsu.map((obj)=> {return Object.assign({}, obj)});
          this.artUnitario.mermas= mmu;
        }
        
        if(this.presentaciones.length > 0){
          let ppsu: Presentacion[]=[];
          for(const p of this.presentaciones.controls){
            let pre: Presentacion = new Presentacion;
            pre.nombre= p.controls['nombre'].value;
            pre.descripcion= p.controls['descripcion'].value;
            pre.unidades= p.controls['unidades'].value;
            pre.equivalencia= p.controls['equivalencia'].value;
            pre.upc= p.controls['upc'].value;
            ppsu.push(pre);
          }
          const ppu = ppsu.map((obj)=> {return Object.assign({}, obj)});
          this.artUnitario.presentaciones= ppu;
        }
        
        let datau = Object.assign({}, this.artUnitario);
        this.firestore.collection<any>('articulos').add(datau)
          .then(
            res => {
              this.notificationService.success("Artículo agregado al catálogo maestro");
              this.theRouter.navigateByUrl("/hawk/catalogos/articulos/maestro");
            },
            err => {
              this.notificationService.success("Error al agregar artículo");
            }
          );

      break;
      case 'pieza':
        this.artPieza = new ArticuloPieza;
        this.artPieza.ubase= this.theForm.controls.unidad.value;
        this.artPieza.tipo= this.theForm.controls.tipo.value;
        this.artPieza.nombre= this.theForm.controls.nombre.value;
        this.artPieza.categoria= this.theCategory;
        this.artPieza.subcategoria= this.theForm.controls.subcategoria.value;
        this.artPieza.rendimiento= this.theForm.controls.rendimiento.value;
        this.artPieza.ubase= this.theForm.controls.umb.value;
        this.artPieza.keywords= this.keywords;
        
        if(this.mermas.length > 0){
          let mmsp: Merma[]=[];
          for(const m of this.mermas.controls){
            let merm: Merma = new Merma;
            merm.concepto= m.controls['concepto'].value;
            merm.valor= m.controls['valor'].value;
            mmsp.push(merm);
          }
          const mmp = mmsp.map((obj)=> {return Object.assign({}, obj)});
          this.artPieza.mermas= mmp;
        }
        
        if(this.presentaciones.length > 0){
          let ppsp: Presentacion[]=[];
          for(const p of this.presentaciones.controls){
            let pre: Presentacion = new Presentacion;
            pre.nombre= p.controls['nombre'].value;
            pre.descripcion= p.controls['descripcion'].value;
            pre.unidades= p.controls['unidades'].value;
            pre.equivalencia= p.controls['equivalencia'].value;
            pre.upc= p.controls['upc'].value;
            ppsp.push(pre);
          }
          const ppp = ppsp.map((obj)=> {return Object.assign({}, obj)});
          this.artPieza.presentaciones= ppp;
        }
        
        let datap = Object.assign({}, this.artPieza);
        this.firestore.collection<any>('articulos').add(datap)
          .then(
            res => {
              this.notificationService.success("Artículo agregado al catálogo maestro");
              this.theRouter.navigateByUrl("/hawk/catalogos/articulos/maestro");
            },
            err => {
              this.notificationService.success("Error al agregar artículo");
            }
          );

      break;
      case 'divisible':
        this.artDivisible = new ArticuloDivisible;
        this.artDivisible.ubase= this.theForm.controls.unidad.value;
        this.artDivisible.tipo= this.theForm.controls.tipo.value;
        this.artDivisible.nombre= this.theForm.controls.nombre.value;
        this.artDivisible.categoria= this.theCategory;
        this.artDivisible.subcategoria= this.theForm.controls.subcategoria.value;
        this.artDivisible.rendimiento= this.theForm.controls.rendimiento.value;
        this.artDivisible.ubase= this.theForm.controls.umb.value;
        this.artDivisible.keywords= this.keywords;
        
        if(this.mermas.length > 0){
          let mmsd: Merma[]=[];
          for(const m of this.mermas.controls){
            let merm: Merma = new Merma;
            merm.concepto= m.controls['concepto'].value;
            merm.valor= m.controls['valor'].value;
            mmsd.push(merm);
          }
          const mmd = mmsd.map((obj)=> {return Object.assign({}, obj)});
          this.artDivisible.mermas= mmd;
        }
        
        if(this.presentaciones.length > 0){
          let ppsd: Presentacion[]=[];
          for(const p of this.presentaciones.controls){
            let pre: Presentacion = new Presentacion;
            pre.nombre= p.controls['nombre'].value;
            pre.descripcion= p.controls['descripcion'].value;
            pre.unidades= p.controls['unidades'].value;
            pre.equivalencia= p.controls['equivalencia'].value;
            pre.upc= p.controls['upc'].value;
            ppsd.push(pre);
          }
          const ppd = ppsd.map((obj)=> {return Object.assign({}, obj)});
          this.artDivisible.presentaciones= ppd;
        }
        
        let datad = Object.assign({}, this.artDivisible);
        this.firestore.collection<any>('articulos').add(datad)
          .then(
            res => {
              this.notificationService.success("Artículo agregado al catálogo maestro");
              this.theRouter.navigateByUrl("/hawk/catalogos/articulos/maestro");
            },
            err => {
              this.notificationService.success("Error al agregar artículo");
            }
          );

      break;

    }

  }

  validate(){
    this.sendItem();
  }

  resetForm(){}

  onClose(){}

  public findInvalidControls() {
    const invalid = [];
    const controls = this.theForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log('Invalid: '+name);
        }
    }
    
  }
}
