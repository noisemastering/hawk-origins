//Por definición, un carrito vive en la memoria del browser hasta que es borrado o convertido
//Solamente se pueden tener 2 carritos a la vez uno para receta principal y otro para subreceta
import { RecipeItem } from 'src/app/shared/classes/recipe-item';
import { Observable, of } from 'rxjs';


export class Recipes{
    ID: number;
    name: string;
    menuID: string;
    type: "sub" | "main" | "";
    items: RecipeItem[];
    status:"making"|"clear";
    costo: number;
    porcion: number;
    keywords: string;
    pctCosto: number;
    precioCalculado: number;
    IDMenuItem: string;
    DescMenuItem: string;

    createCart(type: string){
        //Función para crear un carrito desde cero, sin objetos
        
        //Inicialización general
        this.ID=1;
        this.items=[];
        this.status="making";
        this.costo= 0;
        this.porcion= 0;
        this.pctCosto= 0;    
        this.precioCalculado= 0;
        this.keywords="";
        let cartName: string;

        //Determinación de tipo
        if(type=='main'){ 
            this.name="Receta sin nombre";
            this.type="main";
            cartName="Cart1";
        }else{
            this.name="Receta sin nombre";
            this.type="sub";
            cartName="Cart2";
        }

        //Guardado de variables en local storage
        let cart= JSON.stringify(this); //serializando el carrito
        localStorage.setItem(cartName, cart);
        
        let myItem = localStorage.getItem(cartName);
        console.log('Carrito creado: ', myItem);
    }

    getCart(cartName: string){
        
        let myItem = JSON.parse(localStorage.getItem(cartName));
        this.ID= myItem.ID;
        this.name= myItem.name;
        this.type= myItem.type;
        this.items= myItem.items;
        this.status= myItem.status;
        this.costo= myItem.costo;
        this.porcion= myItem.porcion;
        this.pctCosto= myItem.pctCosto;
        this.precioCalculado= myItem.precioCalculado;
        this.keywords= myItem.keywords;
        
    }

    checkCart(cartName: string){
        if(localStorage.getItem(cartName)==null){
            return false;
        }else{
            return true;
        }
    }

    addToCart(obj: RecipeItem){
        //Agrega un item válido y la cantidad
        //Primero checamos si ya existe algún carrito, si no existe se crea
        this.items.push(obj);
    }

    deleteCart(name: string){
        //Esta función destruye el carrito
        //Una vez destruido no es posible recuperarlo
        this.ID= 0;
        this.name="";
        this.menuID="";
        this.type= "";
        this.items= [];
        this.status= "clear";
        this.costo= 0;
        this.porcion= 0;
        this.keywords="";
        this.pctCosto= 0;
        this.precioCalculado= 0;
        this.IDMenuItem="";
        this.DescMenuItem="";
        localStorage.removeItem(name);
    }
    
    detailCart(){
        //Muestra el detalle de un carrito determinado
    }

    removeFromCart(id: string){
        //Elimina uno o varios items
        let its= this.items as RecipeItem[];
        let ind: number;
        ind= its.findIndex(i => i.ID === id);
        its.splice(ind, 1);
        this.items= its;
        console.log("Ingredientes actualizados: ",this.items);
        return;
    }

    updateCart(obj: any){
        //Actualiza la cantidad de un item
        console.log("Ingredientes antes de actualizar: ",this.items);
        let its= this.items as RecipeItem[];
        let ind: number;
        ind= its.findIndex(i => i.ID === obj.ID);
        its.splice(ind, 1, obj);
        this.items= its;
        console.log("Ingredientes actualizados: ",this.items);
        return;
    }

    validateCart(){
        //Verifica que un carrito sea elegible 
        //para convertirse en elemento de menu
    }

    convertCart(option: string){
        //Convierte un carrito en receta, subreceta o elemento de menú
    }

    findItem(id: string){
        let its= this.items as RecipeItem[];
        return its.some( ({ID}) => ID == id);
    }

    saveCart(cartName){
        let cart= JSON.stringify(this); //serializando el carrito
        localStorage.setItem(cartName, cart);
    }

    calculateCost(){
        this.costo=0;
        for(const ing of this.items){
            this.costo+= ing.costo;
        }
    }
    
}
/*
Callback function example

function search(things) {
    return things.item === 'chips';
}

things.find(search) // { item: 'chips', price: '3.45' }
*/