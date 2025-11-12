import { Component } from '@angular/core';
import { Produto } from '../service/types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../service/produtoService';
import { CarrinhoService } from '../service/carrinhoService';

@Component({
  selector: 'app-pagina-detalhe-produto',
  imports: [],
  templateUrl: './pagina-detalhe-produto.html',
  styleUrl: './pagina-detalhe-produto.css',
})
export class PaginaDetalheProduto {
  produto: Produto | null = null;
  tamanhoSelecionado: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.produtoService.buscarPorId(id).subscribe({
        next: (produto) => (this.produto = produto),
        error: () => {
          alert('Produto não encontrado.');
          this.router.navigate(['/']);
        },
      });
    }
  }

  adicionarAoCarrinho(): void {
    if (!this.produto) return;

    if (!this.tamanhoSelecionado && this.produto.tamanhosDisponiveis?.length) {
      alert('Por favor, selecione um tamanho.');
      return;
    }

    this.carrinhoService.adicionarItem(
      this.produto,
      1,
      this.tamanhoSelecionado ?? this.produto.tamanhosDisponiveis[0]
    );

    alert(`${this.produto.nome} adicionado ao carrinho!`);
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
