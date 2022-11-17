import { Merma } from './merma';
import { Presentacion } from './presentacion';

export class ArticuloGranel{
    
    id:string;
    nombre: string;
    pieza: number;
    rendimiento: number;
    categoria: string;
    subcategoria: string;
    tipo: string= 'granel';
    ubase: string;
    keywords: string[];
    mermas: Merma[];
    presentaciones: Presentacion[];

}