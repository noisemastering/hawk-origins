import { Almacen } from "./almacen";
import { Articulo } from "./articulo";
import { Usuario } from "./usuario";
import { CentroConsumo } from "./centro-consumo";
import { NAArticuloExistencia } from "./NAArticuloExistencia";

export class Locacion {

    LocacionID: number;
    Nombre: string;
    Notas: string;
    Creado: string;
    Creo: number;
    Modifico: number;
    Modificado: string;
    Almacen: Almacen;
    Keywords: string;
    Articulos: Articulo[];
    NAAlmacen: Almacen;
    Centros: CentroConsumo[];
    Existencias: NAArticuloExistencia[];
}