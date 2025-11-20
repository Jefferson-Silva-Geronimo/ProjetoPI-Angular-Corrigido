import { Component } from '@angular/core';
import { Produto } from '../service/types/types';
import { ProdutoService } from '../service/produtoService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagina-manutencao-inclusao',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pagina-manutencao-inclusao.html',
  styleUrl: './pagina-manutencao-inclusao.css',
})
export class PaginaManutencaoInclusao {

  titulo: string = "Cadastro de Produto";
  form: FormGroup;
  produtoId?: number;

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      preco: [0, Validators.required],
      imagemUrl: [''],
      descricao: [''],
      tamanhosDisponiveis: [[]],
      tamanhoTemp: [null]
    });

    this.produtoId = Number(route.snapshot.params['id']);

    if (this.produtoId) {
      service.buscarPorId(this.produtoId).subscribe(produto => {
        this.form.patchValue({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagemUrl: produto.imagemUrl,
          descricao: produto.descricao,
          tamanhosDisponiveis: produto.tamanhosDisponiveis
        });
      });
    }
  }

  adicionarTamanho(): void {
    const tamanho = this.form.get('tamanhoTemp')?.value;

    if (!tamanho || tamanho <= 0) {
      alert('Informe um tamanho válido!');
      return;
    }

    const lista = this.form.get('tamanhosDisponiveis')?.value as number[];

    if (lista.includes(tamanho)) {
      alert('Este tamanho já foi adicionado!');
      return;
    }

    const novaLista = [...lista, tamanho];
    this.form.patchValue({
      tamanhosDisponiveis: novaLista,
      tamanhoTemp: null
    });
  }

  removerTamanho(t: number): void {
    const lista = this.form.get('tamanhosDisponiveis')?.value as number[];
    const nova = lista.filter(x => x !== t);
    this.form.patchValue({ tamanhosDisponiveis: nova });
  }

  submeter() {
    if (!this.form.valid) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const produto: Produto = {
      ...this.form.value,
      tamanhoTemp: undefined
    };

    delete (produto as any).tamanhoTemp;

    if (this.produtoId) {
      this.service.editar(produto).subscribe(() => {
        this.router.navigate(['admin/manutencao']);
      });
    } else {
      this.service.incluir(produto).subscribe(() => {
        this.router.navigate(['admin/manutencao']);
      });
    }
  }
}
