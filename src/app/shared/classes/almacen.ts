import { Locacion } from "./locacion";

export class Almacen{        
    AlmacenID: number;
    Clave: string;
    Nombre: string;
    Notas: string;
    Creado: string;
    Creo: number;
    Modificado: string;
    Modifico: number;
	Keywords: string;
    Locaciones: Locacion[];
}