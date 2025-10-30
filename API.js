const API_USUARIOS = "https://api-storage-cantina-main-eight.vercel.app/";

async function tratarErroResponse(res, msgPadrao) {
    const textErro = await res.text();
    let msgErro;
    try {
        const errorData = JSON.parse(textErro);
        msgErro = errorData.msg || errorData.error || errorData.message || textErro;
    } catch {
        msgErro = textErro;
    }
    return {
        sucesso: false, msg: msgErro || msgPadrao || "Erro desconhecido na API",
    };
}

async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        if (!res.ok) return await tratarErroResponse(res, "Erro ao fazer login");
        const data = await res.json();

        if (data.usuario) {

            localStorage.setItem("usuarioId:", data.usuario.id);
            localStorage.setItem("usuarioNome:", data.usuario.nome);
            localStorage.setItem("token:", data.token);

            return { sucesso: true, user: data.usuario };
        } else {
            return { sucesso: false, msg: "Usuário ou senha incorretos" };
        }

    } catch (error) {
        console.error("Erro ao fazer login", error);
        return { sucesso: false, mensagem: "Erro de conexão API" };
    }
}

async function cadastrarCozinheira(nome, email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (!res.ok) if (!res.ok) return await tratarErroResponse(res, "Erro ao cadastrar usuário");
        const data = await res.json();

        return { sucesso: true, user: data.usuario || null };

    } catch (error) {
        console.error("Erro ao fazer cadastro", error);
        return { sucesso: false, mensagem: "Erro de conexão API" };
    }
}

async function recuperarSenha(email) {
    try {
        const res = await fetch(API_USUARIOS + "/recupera", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) if (!res.ok) return await tratarErroResponse(res, "Erro ao recuperar senha");
        const data = await res.json();

        return { sucesso: true, msg: data.msg || "Instruções enivadas ao seu email" };

    } catch (error) {
        console.error("Erro ao recuperar senha", error);
        return { sucesso: false, mensagem: "Erro de conexão API" };
    }
}