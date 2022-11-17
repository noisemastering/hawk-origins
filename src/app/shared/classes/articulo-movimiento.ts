import { ArticuloUM } from "./articulo-um";

export class ArticuloMovimiento{        
    ID: string;
    NombreAgr: string;
    Cantidad: number= 0;
    UM: ArticuloUM;
    CostoUnitario: number= 0;
    Descuento: number= 0;
    IEPS: number= 0;
    IVA: number= 0;
    index: number;
	//serviceURL?: string= "http://noiseapp.com.mx/hawk/process-movimientos.php";
}