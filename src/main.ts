import './style.css';
import type { Categoria, Despesa } from "./types";

const CATEGORIAS: Categoria[] = [
  "Alimentos",
  "Transporte",
  "Lazer",
  "Saude",
  "Cartao",
  "Outros",
];

let despesas: Despesa[] = [];

const formularioNovaDespesa = document.querySelector<HTMLFormElement>("#formNovaDespesa")!;
const campoTituloDespesa = document.querySelector<HTMLInputElement>("#tituloDespesa")!;
const campoValorDespesa = document.querySelector<HTMLInputElement>("#valorDespesa")!;
const campoCategoriaDespesa = document.querySelector<HTMLSelectElement>("#categoriaDespesa")!;
const mensagemErroValidacao = document.querySelector<HTMLElement>("#mensagemErroValidacao")!;
const listaDespesas = document.querySelector<HTMLUListElement>("#listaDespesas")!;
const mensagemListaVazia = document.querySelector<HTMLElement>("#mensagemListaVazia")!;
const elementoSomaTotal = document.querySelector<HTMLElement>("#somaTotalDespesas")!;
const listaTotaisPorCategoria = document.querySelector<HTMLUListElement>("#totaisPorCategoria",)!;

function gerarIdDespesa(): string {
  return crypto.randomUUID();
}

function formatarValorMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function somarValoresDaLista(lista: Despesa[]): number {
  return lista.reduce((soma, despesa) => soma + despesa.valor, 0);
}

function calcularTotaisPorCategoria(lista: Despesa[]): Record<Categoria, number> {
  const totais: Record<Categoria, number> = {
    Alimentos: 0,
    Transporte: 0,
    Lazer: 0,
    Saude: 0,
    Cartao: 0,
    Outros: 0,
  };

  for (const despesa of lista) {
    totais[despesa.categoria] = totais[despesa.categoria] + despesa.valor;
  }

  return totais;
}

function adicionarDespesa(titulo: string, valor: number, categoria: Categoria): Despesa | null {
  const tituloLimpo: string = titulo.trim();

  if (tituloLimpo.length === 0) {
    return null;
  }

  if (valor <= 0) {
    return null;
  }

  const despesa: Despesa = {
    id: gerarIdDespesa(),
    titulo: tituloLimpo,
    valor: valor,
    categoria: categoria,
  };

  despesas = [...despesas, despesa];

  return despesa;
}

function validarFormulario(titulo: string, valor: string, categoria: string): string | null {
  if (titulo.trim().length === 0) {
    return "Informe o título da despesa.";
  }

  const valorNumerico: number = Number(valor);

  if (valor.trim().length === 0 || Number.isNaN(valorNumerico) || valorNumerico <= 0) {
    return "Informe um valor válido para a despesa.";
  }

  if (categoria.trim().length === 0) {
    return "Selecione uma categoria para a despesa.";
  }

  return null;
}

function exibirMensagemErro(mensagem: string | null): void {
  if (mensagem === null) {
    mensagemErroValidacao.hidden = true;
    return;
  }

  mensagemErroValidacao.textContent = mensagem;
  mensagemErroValidacao.hidden = false;
}

function limparFormulario(): void {
  campoTituloDespesa.value = "";
  campoValorDespesa.value = "";
  campoCategoriaDespesa.value = "";
}

function criarItemDespesa(despesa: Despesa): HTMLLIElement {
  const item: HTMLLIElement = document.createElement("li");
  item.className = "despesa";
  item.dataset.idDespesa = despesa.id;

  const info: HTMLDivElement = document.createElement("div");
  info.className = "despesa__info";

  const titulo: HTMLParagraphElement = document.createElement("p");
  titulo.className = "despesa__titulo";
  titulo.textContent = despesa.titulo;

  const categoria: HTMLSpanElement = document.createElement("span");
  categoria.className = "despesa__categoria";
  categoria.textContent = despesa.categoria;

  if(despesa.categoria === "Cartao")
  {
      categoria.textContent = "Cartão de Crédito";
  }

  info.append(titulo, categoria);

  const acoes: HTMLDivElement = document.createElement("div");
  acoes.className = "despesa__acoes";

  const valor: HTMLParagraphElement = document.createElement("p");
  valor.className = "despesa__valor";
  valor.textContent = formatarValorMoeda(despesa.valor);

  const botaoExcluir: HTMLButtonElement = document.createElement("button");
  botaoExcluir.className = "despesa__botao-excluir";
  botaoExcluir.type = "button";
  botaoExcluir.setAttribute("aria-label", `Excluir despesa: ${despesa.titulo}`);
  botaoExcluir.textContent = "Excluir";

  acoes.append(valor, botaoExcluir);
  item.append(info, acoes);

  return item;
}

function atualizarListaDespesas(): void {
  if (despesas.length === 0) {
    listaDespesas.textContent = "";
    mensagemListaVazia.hidden = false;
    return;
  }

  mensagemListaVazia.hidden = true;
  listaDespesas.textContent = "";

  for (const despesa of despesas) {
    listaDespesas.append(criarItemDespesa(despesa));
  }
}

function atualizarResumo(): void {
  const somaTotal: number = somarValoresDaLista(despesas);
  elementoSomaTotal.textContent = formatarValorMoeda(somaTotal);

  const totais: Record<Categoria, number> = calcularTotaisPorCategoria(despesas);
  listaTotaisPorCategoria.textContent = "";

  for (const categoria of CATEGORIAS) {
    const item: HTMLLIElement = document.createElement("li");
    item.className = "resumo__item";

    const nomeCategoria: HTMLSpanElement = document.createElement("span");
    nomeCategoria.className = "resumo__categoria";
    nomeCategoria.textContent = categoria;

     if(categoria === "Saude")
    {
       nomeCategoria.textContent = "Saúde";
    }

    if(categoria === "Cartao")
    {
       nomeCategoria.textContent = "Cartão de Crédito";
    }



    const valorCategoria: HTMLSpanElement = document.createElement("span");
    valorCategoria.className = "resumo__valor";
    valorCategoria.textContent = formatarValorMoeda(totais[categoria]);

    item.append(nomeCategoria, valorCategoria);
    listaTotaisPorCategoria.appendChild(item);
  }
}

function aoEnviarFormulario(evento: Event): void {
  evento.preventDefault();

  const tituloInformado: string = campoTituloDespesa.value;
  const valorInformado: string = campoValorDespesa.value;
  const categoriaInformada: string = campoCategoriaDespesa.value;

  const mensagemErro: string | null = validarFormulario(tituloInformado, valorInformado, categoriaInformada);

  if (mensagemErro !== null) {
    exibirMensagemErro(mensagemErro);
    return;
  }

  const despesaCriada: Despesa | null = adicionarDespesa(
    tituloInformado,
    Number(valorInformado),
    categoriaInformada as Categoria,
  );

  if (despesaCriada === null) {
    exibirMensagemErro("Não foi possível adicionar a despesa. Verifique os dados informados.");
    return;
  }

  limparFormulario();
  exibirMensagemErro(null);
  atualizarResumo();
  atualizarListaDespesas();
}

function excluirDespesa(idDespesa: string): void {
  despesas = despesas.filter((despesa) => despesa.id !== idDespesa);
}

function aoClicarExcluirDespesa(evento: Event): void {
  const botaoExcluir = (evento.target as HTMLElement).closest<HTMLButtonElement>(".despesa__botao-excluir");

  if (!botaoExcluir) {
    return;
  }

  const itemDespesa = botaoExcluir.closest<HTMLLIElement>(".despesa");
  const idDespesa: string | undefined = itemDespesa?.dataset.idDespesa;

  if (!idDespesa) {
    return;
  }

  excluirDespesa(idDespesa);
  atualizarResumo();
  atualizarListaDespesas();
}

function iniciarPainel(): void {
  formularioNovaDespesa.addEventListener("submit", aoEnviarFormulario);
  listaDespesas.addEventListener("click", aoClicarExcluirDespesa);
  atualizarResumo();
  atualizarListaDespesas();
}

iniciarPainel();