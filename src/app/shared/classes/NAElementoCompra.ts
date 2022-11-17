import { NACompra } from "./NACompra";
import { NAArticulo } from "./NAArticulo";
import { NAPresentacionCompra } from "./NAPresentacion";

export class NAElementoCompra{
 
    ElementoID: number;
    CompraID: number;
    PresentacionID: number;
    Cantidad: number;
    Costo: number;
    Disponible: number;

    Compra: NACompra;
    Articulo: NAArticulo;
    Presentacion: NAPresentacionCompra;
}