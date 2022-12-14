export class MenuItem {
    ID: string;
    Descripcion: string;
    Tag: string;
    Precio: string;
    ID_Centro1: string;
    ID_Centro2: string;
    ID_Centro3: string;
    ID_Centro4: string;
    ID_Centro5: string;
    Categoria: string;
    ListaOpciones: string;
    MostrarOpciones: string;
    Status: string;
    Secuencia: string;
    SaltarLineaDespues: string; 
    ID_Articulo: string;
    Costo: string;
    Cantidad_Articulo: string;
    UM: string;
    EsPorcion: string; 
    ExistenciasPorciones: string;
    NumeroPorcionesXItem: string;
    ExistenciasItem: string;
    ElaborarAutomaticamente: string; 
    MostradoEnCarta: string;
    ID_PuntoVenta: string;
    ID_PorcionDe: string;
    ID_UMRendimientoLote: string; 
    RendimientoLote: string;
    ConsumoPorcion: string;
    RendimientoXPieza: string;
    PUtilidad: string;
    PrecioCalculado: string;
    EsModNegativo: string;
    Keywords: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-menu-item.php";
}