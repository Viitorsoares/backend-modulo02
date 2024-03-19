import EventoDAO from "../Percistencia/EventoDAO.js";


export default class Evento {
    #codigo;
    #titulo;
    #data_evento;
    #valor_ingreco;
    #endereco;
    #descricao;

    constructor(codigo = 0, titulo = "", data_evento = "", valor_ingreco = "", endereco = "", descricao = "") {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#data_evento = data_evento;
        this.#valor_ingreco = valor_ingreco;
        this.#endereco = endereco;
        this.#descricao = descricao
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(novoTitulo) {
        this.#titulo = novoTitulo;
    }

    get data_evento() {
        return this.#data_evento;
    }

    set data_evento(novaData_evento) {
        this.#data_evento = novaData_evento;
    }

    get valor_ingreco() {
        return this.#valor_ingreco;
    }

    set valor_ingreco(novoValor_ingreco) {
        this.#valor_ingreco = novoValor_ingreco;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    async gravar() {
        const dao = new EventoDAO();
        await dao.gravar(this);
    }
    
    async atualizar() {
        const dao = new EventoDAO();
        await dao.atualizar(this);
    }
    
    async excluir() {
        const dao = new EventoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa) {
        const dao = new EventoDAO();
        return await dao.consultar(termoDePesquisa);
    }

    toString() {
        return `Evento código: ${this.#codigo} - título: ${this.#titulo}`;
    }

    toJSON() {
        return{
            "codigo": this.#codigo,
            "titulo": this.#titulo,
            "data_evento": this.#data_evento,
            "valor_ingreco": this.#valor_ingreco,
            "endereco": this.#endereco,
            "descricao": this.#descricao
        }
    }
}