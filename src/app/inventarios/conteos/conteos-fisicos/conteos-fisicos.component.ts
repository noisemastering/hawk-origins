import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConteosService } from 'src/app/servicios/conteos.service';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { GenericList } from 'src/app/shared/classes/generic-list';
import { Observable, BehaviorSubject } from 'rxjs';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { GenericsService } from 'src/app/servicios/generics.service';
import { RelacionadosService } from 'src/app/servicios/relacionados.service';
import { Response } from 'src/app/shared/classes/response';
import { MatDialogConfig, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { LocacionesPorAlmacenComponent } from '../locaciones-por-almacen/locaciones-por-almacen.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conteos-fisicos',
  templateUrl: './conteos-fisicos.component.html',
  styleUrls: ['./conteos-fisicos.component.scss']
})

export class ConteosFisicosComponent implements OnInit {

  theForm: FormGroup;
  spinner: SpinnerComponent= new SpinnerComponent;
  working: boolean= false;     
  currentLoc: string;
  currentAlmacen: string;
  searchKey: string;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  displayColumns: string[] = ['ID_Articulo','Descripcion','umexb', 'umex1', 'umex2', 'umex3'];
  dataSource: any;
  controls: FormArray;

  constructor(
    private core: ConteosService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService,
    private theService: ConteosService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }


  ngOnInit() {
    this.getArticulos();
    //console.log("List Obs: ", this.core.list$.value);
    this.spinner.message="Cargando";
  }

  updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index,field,control.value);
    }

   }

   getControl(index, fieldName) {
     console.log("Index: ", index);
     console.log("Field: ", fieldName);
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  getArticulos(){
    this.theService.getArticulosAlmacen()
    .subscribe(
      (res: Response)=>{
        this.theService.list=res.object;
        console.log("Lista:", res.object);
        this.theService.list$= new BehaviorSubject(this.theService.list);
        this.dataSource= this.theService.list$;
        this.dataSource.sort= this.sort;
        this.dataSource.paginator= this.paginator;
        const toGroups = this.core.list$.value.map(entity => {
          return new FormGroup({
            Descripcion:  new FormControl(entity.Descripcion, Validators.required),
            ID_Articulo: new FormControl(entity.ID_Articulo, Validators.required),
            ID_Almacen: new FormControl(entity.ID_Almacen, Validators.required),
            Desc_Almacen: new FormControl(entity.Desc_Almacen, Validators.required),
            Categoria: new FormControl(entity.Categoria, Validators.required),
            DescCategorio: new FormControl(entity.DescCategorio, Validators.required),
            Locacion: new FormControl(entity.Locacion, Validators.required),
            AutoIDb: new FormControl(entity.AutoIDb, Validators.required),
            umb: new FormControl(entity.umb, Validators.required),
            umexb: new FormControl(entity.umexb, Validators.required),
            AutoID1: new FormControl(entity.AutoID1, Validators.required),
            um1: new FormControl(entity.um1, Validators.required),
            umex1: new FormControl(entity.umex1, Validators.required),
            AutoID2: new FormControl(entity.AutoID2, Validators.required),
            um2: new FormControl(entity.um2, Validators.required),
            umex2: new FormControl(entity.umex2, Validators.required),
            AutoID3: new FormControl(entity.AutoID3, Validators.required),
            um3: new FormControl(entity.um3, Validators.required),
            umex3: new FormControl(entity.umex3, Validators.required),
          },{updateOn: "blur"});
        });
        this.controls = new FormArray(toGroups);
      }
    );
    this.changeDetectorRefs.detectChanges();
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFliter();
  }

  applyFliter(){
    this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }

  onAlmacen(){
    this.router.navigateByUrl('/hawk/inventarios/locaciones-por-almacen');
  }

  onUpdate(){
    this.theService.updateCount()
    .subscribe(
      (res: Response)=>{
        this.notificationService.success('Conteo actualizado');
        this.onAlmacen();
      },
      err => {
        this.notificationService.error('El conteo no pudo ser actualizado: '+err);
        this.onAlmacen();
      }
    );
  }

  onClose(){}
}