import "./login.css"
//import type {DadosCadastro, RespostaLogin} from "./types.ts"
//import {CAMINHO_PAINEL, ErroApi, buscarUsuarioLogado, cadastrarUsuario,
 //   fazerLogin, obterToken, removerToken, salvarToken} from "./api.ts"
 /*import {
    formatarCpf,
    formatarTelefone,
    senhaTemCaractereEspecial,
    senhaTemTamnhoMinimo,
    validarCadastro,
    validarEmail
 } from "./validacoes.ts"*/


 //Login
 const farmLogin = document.querySelector<HTMLElement>("#cardLogin")!;
 const formLogin = document.querySelector<HTMLElement>("#formLogin")!
 const campoEmailLogin = document.querySelector<HTMLElement>("#emailLogin")!
 const campoSenhaLogin = document.querySelector<HTMLElement>("#senhaLogin")!
 const botaoLogin = document.querySelector<HTMLElement>("#botaoEntrar")!
 const mensagemErroLogin = document.querySelector<HTMLElement>("#mensagemErroLogin")!
 const botaoIrCadastro = document.querySelector<HTMLElement>("#botaoIrParaCadastro")!

 //Cadastro
