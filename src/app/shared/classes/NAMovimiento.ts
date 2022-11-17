import { Locacion } from "./locacion";
import { Concepto } from "./concepto";
import { Usuario } from "./usuario";
import { NAElementoMovimiento } from "./NAElementoMovimiento";

export class NAMovimiento
    {
        MovimeintoID: number;
        ConceptoID: number;
        Origen: number;
        Destino: number;
        Estatus: number;
        Notas: string;
        Creado: string;
        Creo: number;
        Modificado: string;
        Modifico: number;
        Autorizado: string;
        Autorizo: number;
        LocacionOrigen: Locacion;
        LocacionDestino: Locacion;
        Concepto: Concepto;
        UserCreo: Usuario;
        UserModifico: Usuario;
        UserAutorizo: Usuario;
        Elementos: NAElementoMovimiento[];
    }