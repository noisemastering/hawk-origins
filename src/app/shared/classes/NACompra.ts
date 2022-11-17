import { Usuario } from "./usuario";
import { NARazonSocial } from "./NARazonSocial";
import { NAElementoCompra } from "./NAElementoCompra";
import { Locacion } from "./locacion";

export class NACompra
    {
        CompraID: number;
        RazonSocialID: number;
        Factura: string;
        FechaFactura: string;
        Notas: string;
        Estatus: number;
        Creado: string;
        Creo: number;
        Modificado: string;
        Modifico: number;
        Autorizado: string;
        Autorizo: number;
        LocacionID: number;

        RazonSocial: NARazonSocial;
        Elementos: NAElementoCompra[];
        Locacion: Locacion;

        UserCreo: Usuario;
        UserModifico: Usuario;
        UserAutorizo: Usuario;
        
    }