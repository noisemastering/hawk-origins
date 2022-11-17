import { Articulo } from "./articulo";
import { Locacion } from "./locacion";
import { NAPresentacionCompra } from "./NAPresentacion";

export class NAArticuloExistencia {        
   
    ArticuloExistenciaID: number;
    ArticuloID: number;
    FirebaseID: string;
    LocacionID: number;
    PresentacionID: number;
    Fecha: string;
    Existencia: number;

    Articulo: Articulo;
    Locacion: Locacion;
    PresentacionCompra: NAPresentacionCompra;
}