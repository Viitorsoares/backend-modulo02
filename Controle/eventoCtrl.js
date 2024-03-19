import Evento from "../Modelo/Evento.js";

export default class EventoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const titulo = dados.titulo;
            const data_evento = dados.data_evento;
            const valor_ingreco = dados.valor_ingreco;
            const endereco = dados.endereco;
            const descricao = dados.descricao;

            if (titulo && data_evento && valor_ingreco && endereco && descricao) {
                const evento = new Evento(0, titulo, data_evento, valor_ingreco, endereco, descricao);
                evento.gravar().then(() => {
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento gravado com sucesso!",
                        "codigo_evento": evento.codigo
                    });
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possivel armazenar o evento! " + erro.message
                    })
                });
            } 
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do evento, conforme a documentação da API!"
                });
            }

        } 
        else {
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um evento!"
            })
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = requisicao.params.codigo;
            const titulo = dados.titulo;
            const data_evento = dados.data_evento;
            const valor_ingreco = dados.valor_ingreco;
            const endereco = dados.endereco;
            const descricao = dados.descricao;

            if (codigo && codigo > 0 && titulo && data_evento && valor_ingreco && endereco && descricao){
                const evento = new Evento(codigo, titulo, data_evento, valor_ingreco, endereco, descricao)
                evento.atualizar()
                .then(() => {
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento atualizado com sucesso!",
                    })
                })
                .catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel atualizar o evento! " + erro.message
                    })
                });
            } 
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do evento, conforme a documentação da API!"
                })
            }
        } 
        else {
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH ou PUT e dados no formato JSON para atualizar um evento! "
            })
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "DELETE") {
            const codigo = requisicao.params.codigo;

            if (codigo && codigo > 0) {
                const evento = new Evento(codigo);
                evento.excluir()
                .then(() => {
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Cliente excluido com sucesso!",
                    })
                })
                .catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possivel excluir o evento! " + erro.message
                    })
                })
            } 
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do evento que deseja excluir, conforme a documentação da API!"
                })
            }
        } 
        else {
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um evento!"
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "GET") {
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa)
            .then((eventos) => {
                resposta.status(200);
                resposta.json(eventos);      
            })
            .catch((erro) => {
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possivel consultar os eventos! " + erro.message
                })
            })
        } 
        else {
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os eventos!"
            })
        }
    }
}