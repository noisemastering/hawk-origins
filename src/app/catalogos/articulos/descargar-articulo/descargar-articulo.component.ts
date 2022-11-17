import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AutocompleteService } from 'src/app/servicios/autocomplete.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatDialog, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Articulo } from 'src/app/shared/classes/articulo';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/shared/classes/categoria';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { DuplicatesService } from 'src/app/servicios/duplicates.service';
import { ArticulosService } from '../articulos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NAArticulo } from 'src/app/shared/classes/NAArticulo';
import { NAPresentacionCompra } from 'src/app/shared/classes/NAPresentacion';
import { NAMerma } from 'src/app/shared/classes/NAMerma';
import { Presentacion } from 'src/app/shared/classes/presentacion';
import { DatePipe } from '@angular/common';
import { NAArticulosLocaciones } from 'src/app/shared/classes/articulos-locaciones';
import { SistemaService } from 'src/app/sistema/sistema.service';
import { NASistema } from 'src/app/shared/classes/NASistema';

@Component({
  selector: 'app-descargar-articulo',
  templateUrl: './descargar-articulo.component.html',
  styleUrls: ['./descargar-articulo.component.scss'],
  providers: [AutocompleteService]
})
export class DescargarArticuloComponent implements OnInit {

  //////////////////// No mover !!! ///////////////////////////////////
  theForm: FormGroup;                                       //
  submitted= false;                                                 //
  items= <any>[];                                                   //
  keyws= <any>[];                                                   //
  working: boolean= true;                                          //
  //MatChip                                                         //
  visible: boolean = true;                                          //
  selectable: boolean = true;                                       //
  removable: boolean = true;                                        //
  addOnBlur: boolean = true;                                        //
  keywords = [];                                                    //
  separatorKeysCodes = [ENTER, COMMA];                              //
  @ViewChild('keysInput') keysInput: ElementRef<HTMLInputElement>;  //
  @ViewChild('autoKW') matAutocompleteKW: MatAutocomplete;          //
/////////////////// /No mover !!! ////////////////////////////////////

///// Adaptar al objeto correspondiente
title: string="Descargar Artículo";
articulo: NAArticulo;
almacenes: Almacen[];
locaciones$: Observable<any[]>;
categorias: Categoria[];
subcategorias$: Observable<any[]>;
ubase: string;
theID: string;
presentacionesForm= <any>[];
mermasForm= <any>[];
presentaciones: NAPresentacionCompra[]= [];
mermas: NAMerma[]=[];
sistema= new NASistema;
///// Adaptar al objeto correspondiente


  constructor(
    private formBuilder: FormBuilder, // No Mover!!!
    private autocompleteService: AutocompleteService, // No Mover!!!
    private notificationService: NotificationsService, // No Mover!!!
    private duplicateService: DuplicatesService, // No Mover!!!
    private theService: ArticulosService, // Adaptar al objeto correspondiente
    private dialog: MatDialog,
    private theRouter: Router, // No mover!!!
    private actRoute: ActivatedRoute, // No mover!!!
    private firestore: AngularFirestore,
    private sistemaService: SistemaService
  ) { 
    this.theID= this.actRoute.snapshot.params.id;
    console.log("ID: ", this.theID);
  }

  ngOnInit() {

    this.theForm = this.formBuilder.group({
      nombre: [''],
      firebaseID:[''],
      tipo:[''],
      //almacen:['', Validators.compose([Validators.required])],
      //locacion: ['', Validators.compose([Validators.required])],
      categoria:['', Validators.compose([Validators.required])],
      subcategoria: ['', Validators.compose([Validators.required])],
      costo:['', Validators.compose([Validators.required])],
      stockmaximo:['', Validators.compose([Validators.required])],
      stockminimo:['', Validators.compose([Validators.required])],
      keys: [''],
      presentaciones: this.formBuilder.array([]),
      mermas: this.formBuilder.array([])

    });
    /////////////// No mover!!! ////////////
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
    this.articulo= new NAArticulo;
    this.getItemMasterDetail();
    this.getSistema();
  }


  getItemMasterDetail(){
    this.theService.getMasterItem(this.theID)
      .subscribe(
        (res) => {
          this.articulo.FirebaseID= res.payload.id;
          let art = res.payload.data() as any;
          this.articulo.Categoria= art.categoria;
          this.articulo.Subcategoria= art.subcategoria;
          this.ubase= art.ubase;
          this.articulo.Nombre= art.nombre;
          this.articulo.Tipo= art.tipo;
          this.articulo.Ubase= art.ubase;
          this.articulo.Pieza= parseFloat(art.pieza);
          this.articulo.Rendimiento= art.rendimiento;
          this.articulo.UPC= art.upc;
          this.articulo.Keywords= art.keywords;
          this.keywords= art.keywords;
          this.articulo.PresentacionesCompra= art.presentaciones as NAPresentacionCompra[];
          this.articulo.Mermas= art.mermas as NAMerma[];
          this.articulo.IVA= art.iva;
          this.assignValues();
          if(this.articulo.PresentacionesCompra != null){
            for(const p of this.articulo.PresentacionesCompra){
              this.addItemPresentacion(p);
            }
          }
          if(this.articulo.Mermas != null){
            for(const m of this.articulo.Mermas){
              this.addItemMerma(m);
            } 
          }
        }
      );
  }

  getSistema(){
    this.sistemaService.getDetail(1)
      .subscribe(
        (res) => {
          this.sistema= res as NASistema;       
          console.log('Mirlette: ', this.sistema)   
        },
        err => {
          
        }
      )
  }

  assignValues(){
    this.theForm.controls.firebaseID.setValue(this.articulo.FirebaseID);
    this.theForm.controls.categoria.setValue(this.articulo.Categoria);
    this.theForm.controls.subcategoria.setValue(this.articulo.Subcategoria);
    this.theForm.controls.nombre.setValue(this.articulo.Nombre);
    this.theForm.controls.tipo.setValue(this.articulo.Tipo);
    //this.keyws= this.articulo.Keywords;
  }
    

  validate(){
    this.articulo.StockMaximo= parseFloat(this.theForm.controls.stockmaximo.value);
    this.articulo.StockMinimo= parseFloat(this.theForm.controls.stockminimo.value);
    this.articulo.Costo= parseFloat(this.theForm.controls.costo.value);    
    this.articulo.IVA= 0.0;
    this.articulo.Keywords= JSON.stringify(this.keywords);
    if((this.articulo.UPC==null)||(this.articulo.UPC="")){this.articulo.UPC=""};

    this.articulo.PresentacionesCompra= [];
    this.articulo.Mermas= [];
    
    console.log("A insertar: ", this.articulo);
    console.log("Presentaciones: ", this.presentaciones);
    this.theService.addRecord(this.articulo)
      .subscribe(
        (res) => {
          
          
          if(this.presentacionesForm.controls!=null){
            let pipe = new DatePipe('en-US'); // Use your own locale
            const now = Date.now();
            const formattedDate = pipe.transform(now,'yyyy-MM-dd h:m:s');
            for(const control of this.presentacionesForm.controls){
              let pres = new NAPresentacionCompra;
              pres.UPC= control.controls.upc.value;
              pres.Nombre= control.controls.nombre.value;
              pres.Descripcion= control.controls.descripcion.value;
              pres.Unidades= control.controls.unidades.value;
              pres.Equivalencia= control.controls.equivalencia.value;
              pres.Caducidad= formattedDate;
              pres.ArticuloID= res.ArticuloID;
              pres.FirebaseID= this.articulo.FirebaseID;
              this.presentaciones.push(pres);
            }
          }
          console.log("Presentaciones: ", this.presentaciones);
          this.theService.addPresentaciones(this.presentaciones)
            .subscribe(
              () => {
                
              },
              err => {
                this.notificationService.error("Error"+ err);
              }
            );
            if(this.mermasForm.controls!=null){
              for(const control of this.mermasForm.controls){
                let merm= new NAMerma;
                merm.Concepto= control.controls.concepto.value;
                merm.Valor= control.controls.valor.value;
                merm.FirebaseID= this.articulo.FirebaseID;
                merm.ArticuloID= res.ArticuloID;
                this.mermas.push(merm);
              }
              this.theService.addMerma(this.mermas)
              .subscribe(
                () => {
                  let artloc = new NAArticulosLocaciones;
                  artloc.ArticuloID= res.ArticuloID;
                  artloc.FirebaseID= this.articulo.FirebaseID;
                  artloc.ExistenciaFisica= 0;
                  artloc.ExistenciaTeorica= 0;
                  artloc.StockMaximo= this.articulo.StockMaximo;
                  artloc.StockMinimo= this.articulo.StockMinimo;
                  artloc.LocacionID= this.sistema.LocacionCompras;
                  console.log('Sabina: ', artloc)
                  this.theService.addArticuloLocacion(artloc).subscribe(
                    () => {
                      this.notificationService.success("Artículo importado: ");
                      this.theRouter.navigateByUrl('/hawk/catalogos/articulos/lista-articulos');
                    }
                  );
                },
                err => {
                  this.notificationService.error("Error"+ err);
                }
              );
            }
        },
        err => {
          this.notificationService.error("Error"+ err);
        }
      );
    
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
  ////////// /Keywords

  ////// Formularios dinámicos, de lo contrario, borrar

  //Adaptar al modelo correspondiente
  createItemMerma(mer: any): FormGroup {
    return this.formBuilder.group({
      concepto: [mer.concepto],
      valor: [mer.valor]
    });
  }
  ////// No mover!!!
  addItemMerma(mer: any): void {
    this.mermasForm = this.theForm.get('mermas') as FormArray;
    this.mermasForm.push(this.createItemMerma(mer));
  }

  ////// No mover!!!
  removeItemMerma(index) {
    this.mermasForm.removeAt(index);
  }
  ////// /Formularios dinámicos, de lo contrario, borrar

  ////// Formularios dinámicos, de lo contrario, borrar

  //Adaptar al modelo correspondiente
  createItemPresentacion(pres: any): FormGroup {
    let val= '';
    if(this.theForm.controls.tipo.value=='unitario'){val='1'}
    return this.formBuilder.group({
      nombre: [pres.nombre],
      descripcion: [pres.descripcion],
      unidades:[pres.unidades],
      equivalencia: [pres.equivalencia],
      upc:[pres.upc]
    });
  }
  ////// No mover!!!
  addItemPresentacion(pres: any): void {
    this.presentacionesForm = this.theForm.get('presentaciones') as FormArray;
    this.presentacionesForm.push(this.createItemPresentacion(pres));
  }

  ////// No mover!!!
  removeItemPresentacion(index) {
    this.presentacionesForm.removeAt(index);
  }
  ////// /Formularios dinámicos, de lo contrario, borrar


}
