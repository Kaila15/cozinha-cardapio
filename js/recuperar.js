import {mostrarMsg} from "./util.js";
import{recuperarSenha} from "./api.js";

document.getElementById('formRecuperar').addEventListener('submit', async(event) => {
    event.preventDefault;
    const email = document.getElementById(email).value.trim();

    if (!email) {
        mostrarMsg('Por favor, verifique seu email.', red);
        return;
    }

    const botao = document.getElementById('recuperar');
    botao.disable = true;
    botao.textContent = 'Enviando...';

    const {sucesso, msg} = await recuperarSenha(email);
        botao.disable = false;
        botao.textContent = 'Recuperar senha';

        if(sucesso) {
            mostrarMsg(msg||`Intrução de recuperação enviados para seu email, ${user.nome}`, green);
        } else {
            mostrarMsg(msg||"Não foi possível enviar email de recuperação.", red);
        }
});