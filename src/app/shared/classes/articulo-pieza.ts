import { Merma } from './merma';
import { Presentacion } from './presentacion';

export class ArticuloPieza{
    
    nombre: string;
    merma: number;
    caducidad: string;
    rendimiento: string;
    categoria: string;
    subcategoria: string;
    tipo: string= 'pieza';
    ubase: 'pieza';
    keywords: string[];
    mermas: Merma[];
    presentaciones: Presentacion[];
    pieza=0;

}