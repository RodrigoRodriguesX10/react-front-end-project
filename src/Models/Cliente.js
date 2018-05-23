import Crud from "./../Base/Crud";


export default class Cliente extends Crud {
    constructor() {
        super("cliente");
        this.id = 0;
        this.nome = "";
        this.dataNascimento = new Date();
        this.email = "";
    }
}