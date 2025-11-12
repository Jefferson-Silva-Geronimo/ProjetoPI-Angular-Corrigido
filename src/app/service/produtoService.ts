import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto } from "./types/types";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private readonly API = "http://localhost:3000/produtos";

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  incluir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  excluir(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.API + `/${id}`);
  }

  editar(produto: Produto): Observable<Produto> {
    const url = `${this.API}/${produto.id}`
    return this.http.put<Produto>(url, produto);
  }
}
