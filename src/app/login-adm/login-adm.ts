import { AuthService } from './../service/authService';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-adm.html',
  styleUrls: ['./login-adm.css'],
})
export class LoginAdmin {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  fazerLogin(): void {
    if (this.loginForm.invalid) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const { email, senha } = this.loginForm.value;
    const sucesso = this.authService.login(email, senha, true);

    if (sucesso) {
      this.router.navigate(['admin/manutencao']);
    } else {
      alert('Erro ao fazer login!');
    }
  }
}
