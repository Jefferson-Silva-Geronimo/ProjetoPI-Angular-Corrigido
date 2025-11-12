import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ItemCarrinho } from '../model/item-carrinho';
import { CarrinhoService } from '../service/carrinhoService';


@Component({
  selector: 'app-pagina-carrinho',
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-carrinho.html',
  styleUrl: './pagina-carrinho.css',
})
export class PaginaCarrinho {
  itens: ItemCarrinho[] = [];
  subtotal = 0;
  frete = 29.90;
  total = 0;

  constructor(private carrinhoService: CarrinhoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    this.carrinhoService.listar().subscribe({
      next: itens => {
        this.itens = itens;
        this.calcularTotais();
      },
      error: err => console.error('Erro ao carregar carrinho:', err)
    });
  }

  calcularTotais(): void {
    this.subtotal = this.itens.reduce(
      (acc, item) => acc + item.produto.preco * item.quantidade,
      0
    );
    this.total = this.subtotal + (this.itens.length > 0 ? this.frete : 0);
  }

  atualizarQuantidade(item: ItemCarrinho, novaQuantidade: number): void {
    if (novaQuantidade < 1) return;

    this.carrinhoService.atualizarQuantidade(item.id!, novaQuantidade);
    item.quantidade = novaQuantidade;
    this.calcularTotais();
  }

  removerItem(item: ItemCarrinho): void {
    if (confirm(`Deseja remover ${item.produto.nome} do carrinho?`)) {
      this.carrinhoService.removerItem(item.id!);
      this.itens = this.itens.filter(i => i.id !== item.id);
      this.calcularTotais();
    }
  }

  finalizarCompra(): void {
    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    this.carrinhoService.limparCarrinho();
    this.itens = [];
    this.calcularTotais();
    this.router.navigate(['/confirmacao-compra']);
  }
}
