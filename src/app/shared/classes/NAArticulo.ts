import { NAPresentacionCompra } from "./NAPresentacion";
import { NAMerma } from "./NAMerma";
import { Locacion } from "./locacion";
import { NAProveedor } from "./NAProveedor";

export class NAArticulo{
    
    ArticuloID: number;
	FirebaseID: string;
	Nombre: string;
	Tipo: string;
	Ubase: string;
	Categoria: string;
	Subcategoria: string;
	Pieza: number;
	Rendimiento: number;
	UPC: string="";
	StockMinimo: number;
	StockMaximo: number;
	Keywords: string;
	float: number;
	IVA: number=0;
	Costo: number;
	PresentacionesCompra: NAPresentacionCompra[];
	Mermas: NAMerma[];
	Locaciones: Locacion[];
	Proveedores: NAProveedor[];
    //Costo: Costo;

}