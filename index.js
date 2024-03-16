import Evento from "./Modelo/Evento.js";


const evento = new Evento(3, "Evento de volei",
"10 08 1989", "13,00", "Estadio de Presidente Epitacio",
"Partecipe do jogo de volei beneficente em prol a comunidade");
  
/*evento.gravar().then(() =>{
    console.log("Evento gravado com sucesso!")
}).catch((erro) => {
    console.log(erro);
});*/

/*evento.atualizar().then(() =>{
    console.log("Evento gravado com sucesso!")
}).catch((erro) => {
    console.log(erro);
});*/

/*evento.excluir().then(() =>{
    console.log("Evento gravado com sucesso!")
}).catch((erro) => {
    console.log(erro);
});*/

const eventoQQ = new Evento()

eventoQQ.consultar("Adamantina").then((listaEventos) => {
    console.log("Eventos encontrados:")
    for (const evento of listaEventos) {
        console.log(evento.toJSON())
    }
}).catch((erro) => {
    console.log("Não foi possivel consultar o evento", erro)
})

