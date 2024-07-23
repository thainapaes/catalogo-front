import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { Observable } from 'rxjs';
import { CategoriaRequestDto } from '../model/dto/CategoriaRequestDto';
import { DesvincularProdutoDto } from '../model/dto/DesvincularProdutoDto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = 'http://localhost:8090/catalogo/categoria'

  constructor(private http:HttpClient) { }

  selecionar(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
  }

  exibir(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
  }


  selecionarCategoria(nome:string): Observable<Categoria>{
    return this.http.get<Categoria>(this.url + "/" + nome);
  }

  salvarCategoria(obj:CategoriaRequestDto):Observable<Categoria>{
    return this.http.post<Categoria>(this.url, obj);
  }

  alterarCategoria(celular:string, obj:CategoriaRequestDto):Observable<Categoria>{
    return this.http.patch<Categoria>(this.url + "/" + celular, obj);
  }

  alterarCategoriaId(id:number, obj:CategoriaRequestDto):Observable<Categoria>{
    return this.http.patch<Categoria>(this.url + "/" + id, obj);
  }

  remover(id:number):Observable<HttpStatusCode>{
    return this.http.delete<HttpStatusCode>(this.url + id);
  }

  desvincular(obj:DesvincularProdutoDto):Observable<Categoria>{
    return this.http.delete<Categoria>(this.url + "/desvincular" + obj);
  }

  /*disponibilizar(obj: ProdDisponivelResquest):Observable<Categoria>{
    return this.http.patch<Produto>(this.url + "/disponibilizarNome", obj);
  }

  disponibilizarPorId(obj: ProdDisponivelResquest):Observable<Produto>{
    return this.http.patch<Produto>(this.url + "/disponibilizar", obj);
  }*/
}
