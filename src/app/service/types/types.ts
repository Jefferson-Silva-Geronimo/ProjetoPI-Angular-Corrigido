export interface Produto{
  id?: number;
  nome: string,
  preco: number,
  imagemUrl: string,
  descricao?: string,
  tamanhosDisponiveis: number[]
}
