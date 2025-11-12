import { Component, OnInit } from '@angular/core';
import { Produto } from '../service/types/types';
import { ProdutoService } from '../service/produtoService';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagina-manutencao',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagina-manutencao.html',
  styleUrls: ['./pagina-manutencao.css'],
})
export class PaginaManutencao implements OnInit {
  listaProdutos: Produto[] = [];

  constructor(private service: ProdutoService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.service.listar().subscribe((produtos) => {
      this.listaProdutos = produtos;
    })
  }

  excluir(id: number){
    if (id){
      this.service.excluir(id).subscribe(() => {
        window.location.reload();
      })
    }
  }

}
