import Crud from "./../Base/Crud";
import Produto from "./Produto";
import Cliente from "./Cliente";


export default class Pedido extends Crud {
    constructor() {
        super("pedido");
        this.Produto = Produto;
        this.Cliente = Cliente;
        this.id = 0;
        this.quantidade = "";
        this.total = 0;
        this.data = Date();
    }
}