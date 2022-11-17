export class NANotidicacion {
    
    notificacionID: string;
    businesID: string;
    caducidad: string;
    creacion: string;
    destino: [
        { 
            entidad: string;
            id: string;
        }
    ]
    origen: [
        { 
            entidad: string;
            id: string;
        }
    ]
    emitio: number;
    respondio: number;
    estatus: string;
    proceso: string;

}