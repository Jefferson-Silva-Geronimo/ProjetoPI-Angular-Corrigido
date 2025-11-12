import { Component } from '@angular/core';
import { Produto } from '../service/types/types';
import { ProdutoService } from '../service/produtoService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-manutencao-inclusao',
  imports: [FormsModule, CommonModule],
  templateUrl: './pagina-manutencao-inclusao.html',
  styleUrl: './pagina-manutencao-inclusao.css',
})
export class PaginaManutencaoInclusao {
  titulo:string = "Cadastro de Produto";

  produto: Produto = {} as Produto;
  produtoId?: number;

  tamanhoTemp: number | null = null;

  constructor(private service: ProdutoService,
              private router: Router,
              private route: ActivatedRoute
  ){
    this.produtoId = Number(route.snapshot.params['id']);

    if(this.produtoId){
      service.buscarPorId(this.produtoId).subscribe(produto => {
        this.produto.id = produto.id;
        this.produto.nome = produto.nome;
        this.produto.preco = produto.preco;
        this.produto.imagemUrl = produto.imagemUrl;
        this.produto.descricao = produto.descricao;
        this.produto.tamanhosDisponiveis = produto.tamanhosDisponiveis;
      })
    }
  }

  adicionarTamanho(): void {
    if (this.tamanhoTemp == null || this.tamanhoTemp <= 0) {
      alert('Informe um tamanho válido!');
      return;
    }

    if (!this.produto.tamanhosDisponiveis) {
      this.produto.tamanhosDisponiveis = [];
    }

    if (this.produto.tamanhosDisponiveis.includes(this.tamanhoTemp)) {
      alert('Este tamanho já foi adicionado!');
      return;
    }

    this.produto.tamanhosDisponiveis.push(this.tamanhoTemp);
    this.tamanhoTemp = null;
  }

  removerTamanho(tamanho: number): void {
    if (!this.produto.tamanhosDisponiveis) return;
    this.produto.tamanhosDisponiveis = this.produto.tamanhosDisponiveis.filter(t => t !== tamanho);
  }

  submeter(){
     if (this.produtoId){
      this.service.editar(this.produto).subscribe(() => {
        this.router.navigate(['admin/manutencao']);
      })
     }else{
        this.service.incluir(this.produto).subscribe(()=>{
        this.router.navigate(['admin/manutencao']);
      })
     }
  }
}
