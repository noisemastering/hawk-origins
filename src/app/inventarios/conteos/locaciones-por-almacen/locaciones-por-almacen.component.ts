import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { GenericsService } from 'src/app/servicios/generics.service';
import { RelacionadosService } from 'src/app/servicios/relacionados.service';
import { Response } from 'src/app/shared/classes/response';
import { GenericList } from 'src/app/shared/classes/generic-list';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConteosService } from 'src/app/servicios/conteos.service';
import { Router } from '@angular/router';
import { Almacen } from 'src/app/shared/classes/almacen';
import { Locacion } from 'src/app/shared/classes/locacion';

@Component({
  selector: 'app-locaciones-por-almacen',
  templateUrl: './locaciones-por-almacen.component.html',
  styleUrls: ['./locaciones-por-almacen.component.scss']
})
export class LocacionesPorAlmacenComponent implements OnInit {

  panelOpenState = false;
  spinner: SpinnerComponent= new SpinnerComponent;
  working: boolean= false;     
  theForm: FormGroup;  
  almacenes: GenericList[];
  currentAlmacen: Almacen;
  currentLocacion: Locacion;
  locaciones$: Observable<any[]>;

  constructor(
    private notificationService: NotificationsService,
    private theService: ConteosService,
    private genService: GenericsService,
    private theRelService: RelacionadosService,
    private formBuilder: FormBuilder, //No mover!!!
    private router: Router
  ) { }

  ngOnInit() {

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.spinner.message="Cargando";
        this.theForm = this.formBuilder.group({
            almacen: [''],
            locacion: ['']
        });
    /////////// Traemos datos
    this.getAlmacenesList();// No mover!!!
  }

  /////////// Almacenes
  getAlmacenesList(){
    this.genService.serviceURL= "http://noiseapp.com.mx/hawk/process-generic.php";
    this.genService.getDropDown("Almacenes")
    .subscribe(
      (res: Response) => {
        console.log("Response: ",res);
        this.almacenes= res.object;
      }
    );
  }

  /////// Dropdowns async
  updateDrop(option: string, val: any){
    console.log("Entro update drop");
    //Traemos lista de almacenes
    this.genService.serviceURL= "http://noiseapp.com.mx/hawk/process-generic.php";
    this.locaciones$=this.genService.getDropDownLoc("Almacenes_Locaciones", val, "ID_Almacen");
    
  }

  selectLocacion(){
    let loc={
      almacen: this.theForm.controls['almacen'].value,
      locacion: this.theForm.controls['locacion'].value
    }
    //console.log("Selected loc: ", loc);
    this.theService.setLocalidad(loc);
    this.router.navigateByUrl('/hawk/inventarios/conteos-fisicos');
  }

  //////////// Formulario
  get f() { return this.theForm.controls; } // No mover
}
