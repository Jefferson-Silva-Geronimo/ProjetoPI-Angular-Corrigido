import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-compra',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmacao-compra.html',
  styleUrl: './confirmacao-compra.css'
})
export class ConfirmacaoCompra implements OnInit {

  numeroPedido!: string;
  data!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.numeroPedido = 'HD-' + Math.floor(100000 + Math.random() * 900000);
    this.data = new Date().toLocaleDateString('pt-BR');
  }

  voltarHome(): void {
    this.router.navigate(['/']);
  }

  verPedidos(): void {
    this.router.navigate(['/']);
  }
}
