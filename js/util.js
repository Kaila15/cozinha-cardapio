export function mostraMsg (msg, con = "block", duracao = 5000) {
    //limpar mensagen antiga
    const msgAntiga = document.querySelectorAll (".msg-sistema");
    msgAntiga.forEach (msg => m.remove ());
     
    const msgDiv = document.createElement ("div");
    msgDiv.classList.add ('msg-sistema');
    msgDiv.textContent = msg;
    msg.style.color = cor;
    msgDiv.style.padding = '10px';
    msgDiv.style.borderRadius = '5px';
    msgDiv.style.textAlign = "center";
    msgDiv.style.marginTop = '15px';
    msgDiv.style.fontWeight = "bold";
    msgDiv.style.backgroundColor = cor==="red"?"#fe0e0e" : "#e0ffe0";
    msgDiv.style.transition = "opacity 0.3s ease";
    msgDiv.style.opacity = '1';
    document.body.appendChild(msgDiv);
    setTimeout (() => {
        msgDiv.style.opacity = '0';
        setTimeout (() => msgDiv.remove(),300);
    }, duracao);
}