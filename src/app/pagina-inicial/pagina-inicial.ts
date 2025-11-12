
import { Component, OnInit } from '@angular/core';
import { Produto } from '../service/types/types';
import { ProdutoService } from '../service/produtoService';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagina-inicial.html',
  styleUrls: ['./pagina-inicial.css'],
})
export class PaginaInicial implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe((dados) => {
      this.produtos = dados;
    });
  }
}
