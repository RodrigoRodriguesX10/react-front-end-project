import Crud from "./../Base/Crud";

export default class Produto extends Crud{
    constructor(){
        super("produto");
        this.id = 0;
        this.categoria = "";
        this.preco = 0;
        this.nome = "";
    }
}