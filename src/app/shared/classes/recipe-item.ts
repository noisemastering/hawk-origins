export class RecipeItem{
    ID: string;
    name: string;
    type: string;
    qty: number;
    costo: number;
    um: string;
    rate: number;
    costoInicial: number;
    warehouse: [{
        ID: string,
        location: string,
    }]

    calculateCost(){
       this.costo=(this.rate/100)*this.qty*this.costoInicial;
    }
}