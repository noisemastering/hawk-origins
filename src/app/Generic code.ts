/////////Check for duplicates
/*
duplicate(valor: string){

    this.theService.checkForDuplicate(this.theForm.controls.descripcion.value, 1, this.centro.CentroConsumoID)
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
*/
/////////Termina Check for duplicates



///// Generic Service
/*
/////// No mover!!!
  getLocations(id: number): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+'NACentrosConsumo/'+id);
  }  

  /////// No mover!!!
  getItems(): Observable<any> {
    return this.http.get<any>(this.strings.baseURL+this.serviceURL);
  }    

  getDetail(id: number){
    return this.http.get<any>(this.strings.baseURL+this.serviceURL+id);
  }

  /////// Adaptar al modelo correspondiente
  addRecord (obj: any): Observable<any> {
      return this.http.post<any>(this.strings.baseURL+this.serviceURL, obj as CentroConsumo);
  }

  /////// Adaptar al modelo correspondiente
  editRecord (obj: any): Observable<any> {
    return this.http.put<any>(this.strings.baseURL+this.serviceURL+obj.CentroConsumoID, obj as CentroConsumo);
  }

  deleteRecord (id: number): Observable<any> {
    return this.http.delete<any>(this.strings.baseURL+this.serviceURL+id);
  }

  checkForDuplicate(criteria: string, update: number, id: number){
  return this.http.get<any>(this.strings.baseURL+this.serviceURL+'Duplicate/'+criteria+'/'+update+'/'+id);
  }
*/
///// Termina Generic Service

//// Llamar una ruta con parámetro y formato component/:id
/*
let route='/hawk/catalogos/articulos/descargar-articulo';
    this.router.navigate([route, row.id], {queryParams:{obj: row}});
*/

//// Leer el parámetro enviado en la función anterior
/*
this.articuloImp.ID = this.activatedRoute.snapshot.paramMap.get('id');
 */


 ///// Formularios dinámicos

 ///// En la declaración del formulario
 /*
 mermas: this.formBuilder.array([]),
      presentaciones: this.formBuilder.array([]
  */

  //// Llamado para agregar o eliminar formulario
 /* this.addItemMerma();
    this.addItemPresentacion();*/

//// Creación de elementos
/*
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
*/

//// Leer el contenido del formulario dinámico

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
*/

///// Termina Formularios dinámicos

//// For para recorrer array de objetos
/*
for(const p of this.presentaciones.controls){}
*/
//// Termina For para recorrer array de objetos


//// Navegación básica con parámetro en URL
/*
En el constructor del sender
private router: Router,
*/

/*
En el constructor del recipient
private acitvatedRoute: ActivatedRoute,
*/

/* 
Para leer el parámetro
this.activatedRoute.snapshot.paramMap.get('id');
*/

/*
onImport(row: any){

  let route='/hawk/catalogos/articulos/importar';
  this.router.navigate([route, row.ID], {queryParams:{obj: row}});
}
*/
//// Termina Navegación básica con parámetro en URL


/////Fecha 
/*
      let date= Date.now();
      this.almacen.Modificado=  this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss.sss');
*/
///// Termina fecha