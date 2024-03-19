import { Router } from 'express';
import EventoCtrl from '../Controle/eventoCtrl.js';


const rotaEvento = new Router();
const evenCtrl = new EventoCtrl();

rotaEvento
.get('/', evenCtrl.consultar)
.get('/:termo', evenCtrl.consultar)
.post('/', evenCtrl.gravar)
.put('/:codigo', evenCtrl.atualizar)
.patch('/:codigo', evenCtrl.atualizar)
.delete('/:codigo', evenCtrl.excluir);


export default rotaEvento;

