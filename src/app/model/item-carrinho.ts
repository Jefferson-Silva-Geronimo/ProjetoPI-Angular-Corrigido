import { Produto } from '../service/types/types';

export interface ItemCarrinho {
  id?: number;
  produto: Produto;
  quantidade: number;
  tamanho?: number;
}
