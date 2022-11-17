import { Usuario } from "./usuario";
import { Locacion } from "./locacion";

export class NASistema {
    
    SistemaID: number;
    LocacionCompras: number;
    StockRequisiciones: number;	//0: Máximos, 1: Mínimos
    Costeo: number;	//0: Último, 1: Promedio, 2: Estándar
    TipoInventario: number; //0:FIFO, 1:LIFO
    UtilidadRecetas: number; // Porcentaje máximo de utilidad en recetas
    CategoriaInexistentes: string; //Categoría para Platillos no existentes durante interfaz
    Importacion: number; // 0: Aloha, 1: SoftRestaurant, 2: HostelTactil
    Modificado: string;
    Modifico: number;

    Usuario: Usuario;
    
    Locacion: Locacion;
}