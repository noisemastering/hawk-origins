import { Merma } from './merma';
import { Presentacion } from './presentacion';

export class ArticuloUnitario{
    
    nombre: string;
    descripcion: string;
    caducidad: string;
    rendimiento: number;
    categoria: string;
    subcategoria: string;
    tipo: string= 'unitario';
    ubase: string;
    keywords: string[];
    upc: string;
    mermas: Merma[];
    presentaciones: Presentacion[];
    pieza=0;

}