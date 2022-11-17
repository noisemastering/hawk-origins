export class Subcategoria{
    ID: string;
    ID_Categoria: string;
    Descripcion: string;
    Notas: string;
    uaFecha: string;
    uaUsuario: string;
    crFecha: string;
    crUsuario: string;
    Keywords: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-subcategoria.php";
    nombreCategoria: string;
}