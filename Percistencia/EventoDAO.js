import conectar from "./Conexao.js";
import Evento from "../Modelo/Evento.js";


export default class EventoDAO {
    async gravar(evento) {
        if (evento instanceof Evento) {
            const conexao = await conectar();
            const sql = `INSERT INTO evento (titulo, data_evento, valor_ingreco, endereco, descricao) values (?, ?, ?, ?, ?)`;
            const parametros = [
                evento.titulo,
                evento.data_evento,
                evento.valor_ingreco,
                evento.endereco,
                evento.descricao
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            evento.codigo = resultados.insertId;
        }
    }

    async atualizar(evento) {
        if (evento instanceof Evento) {
            const conexao = await conectar();
            const sql = `UPDATE evento SET titulo = ?, data_evento = ?, valor_ingreco = ?, endereco = ?, descricao = ? WHERE id = ?`;
            const parametros = [
                evento.titulo,
                evento.data_evento,
                evento.valor_ingreco,
                evento.endereco,
                evento.descricao,
                evento.codigo
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(evento) {
        if (evento instanceof Evento) {
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [
                evento.codigo
            ];
            
            await conexao.execute(sql,parametros)
        }
    }

    async consultar(termoDePesquisa) {
        if (termoDePesquisa === undefined) {
            termoDePesquisa = "";
        }
        let sql = "";
        if (isNaN(termoDePesquisa)) {
            sql = `SELECT * FROM evento WHERE titulo LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else {
            sql = `SELECT * FROM evento WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);

        let listaEventos = [];
        for (const registro of registros) {
            const evento = new Evento(
                registro.id,
                registro.titulo,
                registro.data_evento,
                registro.valor_ingreco,
                registro.endereco,
                registro.descricao
            );
            listaEventos.push(evento);
        }
        return listaEventos;
    }
}