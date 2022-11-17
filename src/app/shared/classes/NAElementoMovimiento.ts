import { NAArticulo } from "./NAArticulo";
import { NAPresentacionCompra } from "./NAPresentacion";
import { NAElementoCompra } from "./NAElementoCompra";

export class NAElementoMovimiento {

    ElementoMovimientoID: number;
    MovimientoID: number;
    EntidadID: number;
    Tipo: string;
    PresentacionID: number;
    Cantidad: number;
    Costo: number;

    Articulo: NAArticulo;
    Presentacion: NAPresentacionCompra;

}