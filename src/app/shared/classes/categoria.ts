export class Categoria {
    ID: string; 
    Descripcion: string;
    LineNum: string;
    Notas: string;
    uaFecha: string;
    uaUsuario: string;
    crFecha: string;
    crUsuario: string;
    Keywords: string;
    serviceURL?: string= "http://noiseapp.com.mx/hawk/process-categoria.php";
    Subcategorias: any[];
}