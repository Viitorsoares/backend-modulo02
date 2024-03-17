export default class EventoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json')

        if(requisicao.method === "POST" & requisicao.is('application/json')) {
            const dados = requisicao.body;
            const titulo = dados.titulo;
            const data_evento = dados.data_evento;
            const valor_ingreco = dados.valor_ingreco;
            const endereco = dados.endereco;
            const descricao = dados.descricao;

            if (titulo && data_evento && valor_ingreco && endereco && descricao) {
                const evento = new Evento(0, titulo, data_evento, valor_ingreco, endereco, descricao);
                evento.gravar().then(() => {
                    resposta.status(201)
                    resposta.json({
                        "status": true,
                        "mensagem": "Cliente gravado com sucesso!",
                        "codigo_evento": evento.codigo
                    });
                }).catch((erro) => {
                    resposta.status(500)
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel armazenar o evento!" + erro.message
                    })
                })
            }else {
                resposta.status(400),
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do cliente, conforme a documentação da API!"
                })
            }

        } else {
            resposta.status(400);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um evento! "
            })
        }
    }

    atualizar(requisicao, resposta) {

    }

    excluir(requisicao, resposta) {

    }

    consultar(requisicao, resposta) {

    }
}