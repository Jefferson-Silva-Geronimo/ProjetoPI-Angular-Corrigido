import { Routes } from '@angular/router';
import { PaginaInicial } from './pagina-inicial/pagina-inicial';
import { Login } from './login/login';
import { LoginAdmin } from './login-adm/login-adm';
import { PaginaManutencao } from './pagina-manutencao/pagina-manutencao';
import { PaginaManutencaoInclusao } from './pagina-manutencao-inclusao/pagina-manutencao-inclusao';
import { PaginaCarrinho } from './pagina-carrinho/pagina-carrinho';
import { PaginaDetalheProduto } from './pagina-detalhe-produto/pagina-detalhe-produto';
import { ConfirmacaoCompra } from './confirmacao-compra/confirmacao-compra';



export const routes: Routes = [
  {
    path: "",
    component: PaginaInicial,
    title: "Página Inicial"
  },
  {
    path: 'login',
    component: Login,
    title: "Login"
  },
  {
    path: "login-adm",
    component: LoginAdmin,
    title: "Login Administrativo"
  },
  {
    path: "admin/manutencao",
    component: PaginaManutencao,
    title: "Página de Manutenção"
  },
  {
    path: "admin/manutencao/incluir",
    component: PaginaManutencaoInclusao,
    title: "Incluir Produto"
  },
  {
    path: "admin/manutencao/alterar/:id",
    component: PaginaManutencaoInclusao,
    title: "Alterar Produto"
  },
  {
    path: "carrinho",
    component: PaginaCarrinho,
    title: "Página Carrinho"
  },
  {
    path: "detalhesPedido/:id",
    component: PaginaDetalheProduto,
    title: "Página Detalhes Pedido"
  },
  {
    path: "confirmacao-compra",
    component: ConfirmacaoCompra,
    title: "Confirmação de Compra"
  }
];
