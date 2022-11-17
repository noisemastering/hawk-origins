import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Recipes } from 'src/app/shared/classes/recipes';

@Component({
  selector: 'app-lista-subrecetas',
  templateUrl: './lista-subrecetas.component.html',
  styleUrls: ['./lista-subrecetas.component.scss']
})
export class ListaSubrecetasComponent implements OnInit {

  ///////////////////// No mover !!! ///////////////////
searchKey: string;                                //
spinner: SpinnerComponent= new SpinnerComponent;  //
working: boolean=true;                            //
listData: MatTableDataSource<any>;                //
                                                  //
@ViewChild(MatSort) sort: MatSort;                //
@ViewChild(MatPaginator) paginator: MatPaginator; //
/////////////////// /No mover !!! ////////////////////

recetas: Recipes[]; // Adaptar al nombre de objeto
displayColumns: string[]=['ID','Descripcion','acciones']; // Adaptar las columnas (actualizar tabla)
  constructor() { }

  ngOnInit() {
  }

  applyFilter(){}

  onCreate(){}

}
