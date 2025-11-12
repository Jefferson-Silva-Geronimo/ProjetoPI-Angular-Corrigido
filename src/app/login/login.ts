import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  senha = '';
  lembrar = false;

  constructor(private router: Router) {}

  fazerLogin(): void {
    if (this.email && this.senha) {
      this.router.navigate(['']);
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  }
}
