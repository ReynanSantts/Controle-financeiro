import "./style.css";
import type { Categoria, Despesa } from "./types";

const categorias: Categoria[] = [
  "Alimentos",
  "Transporte",
  "Lazer",
  "Saude",
  "Cartão",
  "Outros",
];

let despesas: Despesa[] = [];

const formularioNovaDespesa =
  document.querySelector<HTMLInputElement>("#formNovaDespesa")!;
const campoTituloDespesa =
  document.querySelector<HTMLInputElement>("#tituloDespesa")!;
const campoValorDespesa =
  document.querySelector<HTMLInputElement>("#valorDespesa")!;
const campoCategoriaDespesa =
  document.querySelector<HTMLInputElement>("#categoriaDespesa")!;
const mensagemErroValidacao = document.querySelector<HTMLInputElement>(
  "#mensagemErroValidacao",
)!;
const listaDespesas =
  document.querySelector<HTMLInputElement>("#listaDespesas")!;
const mensagemListaVazia = document.querySelector<HTMLInputElement>(
  "#mensagemListaVazia",
)!;
const elementoSomaTotal =
  document.querySelector<HTMLInputElement>("#somaTotalDespesas")!;
const listaTotaisPorCategoria = document.querySelector<HTMLInputElement>(
  "#totaisPorCategoria",
);

function gerarIdDespesa(): string {
  return crypto.randomUUID();
}

function formatarValorMoeda(valor: number): string {
  return valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function somarValoresDaLista(lista: Despesa[]): number {
  return lista.reduce((soma, despesa) => +despesa.valor, 0);
}

function calcularTotaisPorCategoria(
  lista: Despesa[],
): Record<Categoria, number> {
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

function adicionarDespesa(
  titulo: string,
  valor: number,
  categoria: Categoria,
): Despesa | null {
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

function validarFormulario(
  titulo: string,
  valor: string,
  categoria: string,
): string | null {
  if (titulo.trim().length === 0) {
    return "Informe o título da despesa";
  }

  const valorNumerico: number = Number(valor);

  if (
    valor.trim().length === 0 ||
    Number.isNaN(valorNumerico) ||
    valorNumerico <= 0
  ) {
    return "Informe um valor válido para a despesa";
  }

  if ((categoria.trim(), length === 0)) {
    return "Selecione uma categoria para a despesa";
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
  ((campoTituloDespesa.value = ""),
    (campoValorDespesa.value = ""),
    (campoCategoriaDespesa.value = ""));
}

function criarItemDespesa(despesa: Despesa): HTMLLIElement {
  const item: HTMLLIElement = document.createElement("li");
  item.className = "despesa";
  item.dataset.idDespesa = despesa.id;

  const info: HTMLDivElement = document.createElement("div");
  info.className = "despesa__info";

  const titulo: HTMLParagraphElement = document.createElement("p");
  titulo.className = "despesa__info";
  titulo.textContent = despesa.titulo;

  const categoria: HTMLSpanElement = document.createElement("span");
  categoria.className = "despesa__categoria";
  categoria.textContent = despesa.categoria;

  if (despesa.categoria === "Cartao") {
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
  botaoExcluir.setAttribute(
    "arial-label",
    `Excluir despesa: ${despesa.titulo}`,
  );
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

  mensagemListaVazia.hidden = true
  listaDespesas.textContent = ""

  for(const despesa of despesas){
    listaDespesas.append(criarItemDespesa(despesa))
  }
}

function atualizarResumo(): void{
    const somaTotal: number = somarValoresDaLista(despesas)
    elementoSomaTotal.textContent = formatarValorMoeda(somaTotal)

    const totais: Record<Categoria, number> = calcularTotaisPorCategoria(despesas)
    listaTotaisPorCategoria?.textContent = ""

    for(const categoria of CATEGORIAS){
        const item:
    }
}
