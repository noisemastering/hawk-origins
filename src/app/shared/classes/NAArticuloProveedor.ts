import { NAProveedor } from "./NAProveedor";
import { NAArticulo } from "./NAArticulo";

export class NAArticuloProveedor{
    
    ArticuloID: number;
    ProveedorID: number;
    FirebaseID: string;
    Principal: number;

    Proveedor: NAProveedor;
    Articulo: NAArticulo;
}
