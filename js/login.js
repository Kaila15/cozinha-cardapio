import {mostrarMsg} from "./util.js";
import{ loginCozinheira} from "./api.js";

document.getElementById('formLogin').addEventListener('submit', async(event) => {
    event.preventDefault;
    const email = document.getElementById(email).value.trim();
    const senha = document.getElementById(senha).value.trim();

    if (!email||!senha) {
        mostrarMsg('Por favor, verifique seu email e senha.', red);
        return;
    }

    const botao = document.getElementById('acessar');
    botao.disable = true;
    botao.textContent = 'Carregando...';

    const {sucesso, msg, user} = await loginCozinheira(email,senha);
        botao.disable = false;
        botao.textContent = 'Acessar';

        if(sucesso) {
            mostrarMsg(`Bem Vindo, ${user.nome}`, green);
            setTimeout(() => {
                window.location.href = "sistema.html";
            }, 1500);

        } else {
            mostrarMsg(msg||"Falha ao fazer login. Verifique email e senha.", red);
        }

});