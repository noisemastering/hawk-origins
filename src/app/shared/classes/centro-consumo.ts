import { Usuario } from "./usuario";
import { Locacion } from "./locacion";
import { NALocacionesCentrosConsumo } from "./locaciones-centros-consumo";

export class CentroConsumo{
    
    CentroConsumoID: number;
    ID_PuntoVenta: string;
    Descripcion: string;
    Notas: string;
    Modificado: string;
    Modifico: number;
    Creado: string;
    Creo: number;
    UserCreo: Usuario;
    UserModifico: Usuario;
    NALocacion: Locacion[];
    NALocacionesCentros: NALocacionesCentrosConsumo[];
}