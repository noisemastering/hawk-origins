///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import {                                                                                //  
  Component, OnInit,                                                                    //
  ViewChild, ElementRef, Inject                                                         //  
} from '@angular/core';                                                                 //
import {                                                                                //
  FormGroup,                                                                            //
  FormControl,                                                                          //
  FormBuilder,                                                                          //
} from '@angular/forms';                                                                //
import {                                                                                //
  MatDialogRef,                                                                         //
  MAT_DIALOG_DATA,                                                                      //
} from '@angular/material';                                                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

///////////////////// Cargar los objetos y servicios del catálogo en cuestión  (con rutas absolutas)
import { Locacion } from 'src/app/shared/classes/locacion';
import { CentroConsumo } from 'src/app/shared/classes/centro-consumo';
import { LocacionesService } from '../../locaciones/locaciones.service';
import { CentroConsumoService } from '../centro-consumo.service';
import { Usuario } from 'src/app/shared/classes/usuario';
import { DatePipe } from '@angular/common';
import { NALocacionesCentrosConsumo } from 'src/app/shared/classes/locaciones-centros-consumo';


@Component({
  selector: 'app-detalle-centro-consumo',
  templateUrl: './detalle-centro-consumo.component.html',
  styleUrls: ['./detalle-centro-consumo.component.scss']
})
export class DetalleCentroConsumoComponent implements OnInit {


  /////////////////////// No mover !!! /////////////////////////////////
  theForm: FormGroup;                                         //
  submitted= false;                                                   //
  spinner: SpinnerComponent= new SpinnerComponent;                    //
  working: boolean= false;                                            //
  public theID: number;                                               //
  permission: boolean;       
  public locacionesRelacionadas: NALocacionesCentrosConsumo[];
  public centro: CentroConsumo;
  public currentUser: Usuario;
  public locRel: NALocacionesCentrosConsumo;
  public hayLocaciones: boolean = false;
  public locacionesExistentes: Locacion[];
  /////////////////// /No mover !!! ////////////////////////////////////

  title: string="Detalle de Centro de Consumo";

  constructor(
    @Inject(MAT_DIALOG_DATA) data, //No mover!!!
    private formBuilder: FormBuilder,  //No mover!!!
    private locacionesService: LocacionesService, // Adaptar según modelo correspondienteya lo 
    private theService: CentroConsumoService,
    public dRef: MatDialogRef<DetalleCentroConsumoComponent>, // Adaptar según modelo correspondiente
    private datepipe: DatePipe
    ) { 
      this.theID= data.theID; console.log('ID: '+this.theID);
    }

  ngOnInit() {

    this.spinner.message="Cargando"; //No mover!!!

    ////////// Creación de formulario, adaptar según modelo correspondiente
    this.theForm = this.formBuilder.group({
        itemID: [''],
        descripcion: [''],
        notas: [''],
        tpv: [''],
        //keys: [''],
        almacenesSelect:[''],
        locacionesSelect:[''],
        fechaCreacion: [''],
        usuarioCreacion: [''],
        ultimaModificacion: [''],
        usuarioModificacion: [''],
        
    });
    let usr= JSON.parse(localStorage.getItem("user")) as Usuario;
    console.log("Usuario: ", usr);
    //this.currentUser.ID=  usr.ID;
    this.locacionesRelacionadas= [];

    /////////// Traemos datos
    this.getRecord();// No mover!!!

  }

  ////// Funciones

  ////// Formularios y validaciones

  get f() { return this.theForm.controls; } // Mo mover!!!

  resetForm(){ // No mover
    console.log('Form reset');
    this.theForm.reset();
  }

  /////////// /Formularios
  
  ////////// Traer datos
  getRecord(): void {

    this.centro= new CentroConsumo;
    this.centro.CentroConsumoID= this.theID
    this.theService.getDetail(this.centro.CentroConsumoID)
      .subscribe((response )=>{
        this.centro= response as CentroConsumo; 
        console.log('Detail: ', response);
        
        ///////////// Adaptar al modelo correspondiente ////////////
        this.theForm.controls['itemID'].setValue(response.CentroConsumoID);
        this.theForm.controls['descripcion'].setValue(response.Descripcion);
        this.theForm.controls['tpv'].setValue(response.ID_PuntoVenta);
        this.theForm.controls['notas'].setValue(response.Notas);
        this.theForm.controls['ultimaModificacion'].setValue(response.Modificado);
        this.theForm.controls['usuarioModificacion'].setValue(response.Modifico);
        this.theForm.controls['fechaCreacion'].setValue(response.Creado);
        this.theForm.controls['usuarioCreacion'].setValue(response.Creo);
        this.centro.Creo= response.Creo;
        this.centro.Creado= response.Creado;
        this.centro.NALocacionesCentros= response.NALocacionesCentros as NALocacionesCentrosConsumo[];
        if(this.centro.NALocacionesCentros.length > 0){
          this.hayLocaciones= true;
          this.locacionesExistentes= [];
          for(const l of this.centro.NALocacionesCentros){
            this.locacionesService.getDetail(l.LocacionID).subscribe(
              (res) => {
                this.locacionesExistentes.push(res as Locacion);
              }
            );
          console.log("Locaciones: ", this.locacionesExistentes);
          }
        }else{
          console.log("No hay locaciones");
        }

        this.working= false; //No mover
    });
  }


  ////// Formularios dinámicos, de lo contrario, borrar

  addLocation(){
    //this.locRel= new Locacion;
    this.locRel= new NALocacionesCentrosConsumo;
    this.locRel.CentroConsumoID= this.theID;
    this.locRel.LocacionID=this.theForm.controls.locacionesSelect.value;
    this.locRel.NALocacion= null;
    this.locacionesRelacionadas.push(this.locRel);
    //this.locRel= this.locaciones$.filter(x => x.LocacionID == this.theForm.controls.locacionesSelect.value)[0];
    console.log("Locación seleccionada: ", this.locacionesRelacionadas);
  }

  onClose(){ //No mover
    this.theForm.reset();
    this.dRef.close();
  }

}
