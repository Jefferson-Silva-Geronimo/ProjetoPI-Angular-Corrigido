import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../service/types/types';
import { ItemCarrinho } from '../model/item-carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly API = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  listar(): Observable<ItemCarrinho[]> {
    return this.http.get<ItemCarrinho[]>(this.API);
  }

  adicionarItem(produto: Produto, quantidade: number = 1, tamanho?: number): void {
    const tamanhoQuery = (tamanho !== undefined && tamanho !== null) ? `&tamanho=${tamanho}` : '';
    const url = `${this.API}?produto.id=${produto.id}${tamanhoQuery}`;

    this.http.get<ItemCarrinho[]>(url).subscribe({
      next: itens => {
        if (itens.length > 0) {
          const itemExistente = itens[0];
          const atualizado: ItemCarrinho = {
            ...itemExistente,
            quantidade: itemExistente.quantidade + quantidade
          };
          this.http.put(`${this.API}/${itemExistente.id}`, atualizado).subscribe({
            error: err => console.error('Erro ao atualizar quantidade no carrinho:', err)
          });
        } else {
          const novoItem: ItemCarrinho = { produto, quantidade, tamanho };
          this.http.post<ItemCarrinho>(this.API, novoItem).subscribe({
            error: err => console.error('Erro ao adicionar item no carrinho:', err)
          });
        }
      },
      error: err => console.error('Erro ao buscar item no carrinho:', err)
    });
  }

  atualizarQuantidade(id: number, quantidade: number): void {
    this.http.get<ItemCarrinho>(`${this.API}/${id}`).subscribe({
      next: item => {
        const atualizado = { ...item, quantidade };
        this.http.put(`${this.API}/${id}`, atualizado).subscribe({
          error: err => console.error('Erro ao atualizar quantidade:', err)
        });
      },
      error: err => console.error('Erro ao obter item para atualizar quantidade:', err)
    });
  }

  removerItem(id: number): void {
    this.http.delete(`${this.API}/${id}`).subscribe({
      error: err => console.error('Erro ao remover item do carrinho:', err)
    });
  }

  limparCarrinho(): void {
    this.http.get<ItemCarrinho[]>(this.API).subscribe({
      next: itens => {
        itens.forEach(item =>
          this.http.delete(`${this.API}/${item.id}`).subscribe({
            error: err => console.error('Erro ao deletar item ao limpar carrinho:', err)
          })
        );
      },
      error: err => console.error('Erro ao listar itens para limpar carrinho:', err)
    });
  }
}
