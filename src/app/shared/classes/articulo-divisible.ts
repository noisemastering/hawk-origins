import { Merma } from './merma';
import { Presentacion } from './presentacion';

export class ArticuloDivisible{
    
    nombre: string;
    merma: number;
    caducidad: string;
    rendimiento: number;
    categoria: string;
    subcategoria: string;
    tipo: string= 'divisible';
    ubase: string;
    keywords: string[];
    mermas: Merma[];
    presentaciones: Presentacion[];
    pieza=0;

}