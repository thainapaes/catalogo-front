import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';
import { Observable } from 'rxjs/internal/Observable';
import { ProdutoRequestDto } from '../model/dto/ProdutoRequestDto';
import { ProdDisponivelResquest } from '../model/dto/ProdDisponivelResquest';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url: string = 'http://localhost:8090/catalogo/produto'

  constructor(private http:HttpClient) { }

  selecionar(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url);
  }

  exibir(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url);
  }


  selecionarProduto(nome:string): Observable<Produto>{
    return this.http.get<Produto>(this.url + "/" + nome);
  }

  salvarProduto(obj:ProdutoRequestDto):Observable<Produto>{
    return this.http.post<Produto>(this.url, obj);
  }

  alterarProduto(celular:string, obj:ProdutoRequestDto):Observable<Produto>{
    return this.http.patch<Produto>(this.url + "/" + celular, obj);
  }

  alterarProdutoId(id:number, obj:ProdutoRequestDto):Observable<Produto>{
    return this.http.patch<Produto>(this.url + "/" + id, obj);
  }

  disponibilizar(obj: ProdDisponivelResquest):Observable<Produto>{
    return this.http.patch<Produto>(this.url + "/disponibilizarNome", obj);
  }

  disponibilizarPorId(obj: ProdDisponivelResquest):Observable<Produto>{
    return this.http.patch<Produto>(this.url + "/disponibilizar", obj);
  }
}
