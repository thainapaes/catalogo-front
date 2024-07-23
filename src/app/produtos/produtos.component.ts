import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { ProdutoRequestDto } from '../model/dto/ProdutoRequestDto';
import { ProdutoService } from '../service/produto.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProdDisponivelResquest } from '../model/dto/ProdDisponivelResquest';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  exibirBotoes:boolean = true;
  tabelaVisivel:boolean = true;
  btnCadastrar: boolean = true;

  formulario = new FormGroup({
    id: new FormControl(null),
    prodNome: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    preco: new FormControl(''),
    dataLote: new FormControl(null),
    tipo: new FormControl('', [Validators.maxLength(100)]),
  })

  produtos:Produto[] = [];
  produto = new Produto();
  request = new ProdutoRequestDto();
  disponivelRequest = new ProdDisponivelResquest();

  dto = new ProdutoRequestDto();
  statusDisponivel: string;

  constructor(private service:ProdutoService, private router:Router) {}

  exibir(): void{
    this.service.selecionar().subscribe(
      retorno => this.produtos = retorno
    );
  }

  ngOnInit(){
    this.exibir();
  }

  salvarProduto():void{
    this.request.prodNome = this.formulario.value.prodNome;
    this.request.preco = this.formulario.value.preco;
    this.request.dataLote = this.formulario.value.dataLote;
    this.request.tipo = this.formulario.value.tipo;

    this.service.salvarProduto(this.request)
    .subscribe(retorno => {
      this.produtos.push(retorno);

      this.produto = new Produto();
      this.request = new ProdutoRequestDto();
      alert('Produto salvo com sucesso!')
    });
  }

  selecionarProduto(posicao:number):void{
    this.produto = this.produtos[posicao];

    this.statusDisponivel = this.produto.disponivel;
    this.exibirBotoes = false;
    this.tabelaVisivel = false;
  }

  alterar(id:number):void{
    this.request = this.produtoToRequest(this.formulario.value as Produto);
    debugger
    this.service.alterarProdutoId(id, this.request)
    .subscribe(retorno => {
      let posicao = this.produtos.findIndex(obj => {
        return obj.id == (retorno.id);
      });

      this.produtos[posicao] = retorno;
      this.produto = new Produto();
      this.request = new Produto();

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Produto alterado com sucesso!')
    });
  }

  disponibilizar(id: number):void{
    debugger
    this.disponivelRequest.id = id
    debugger
    this.service.disponibilizarPorId(this.disponivelRequest)
    .subscribe(retorno => {
      let posicao = this.produtos.findIndex(obj => {
        return obj.id == (retorno.id);
      });

      this.produtos[posicao] = retorno;
      this.produto = new Produto();
      this.disponivelRequest = new ProdDisponivelResquest;

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Status alterado com sucesso!')
    });
  }

  cancelar():void {
    this.produto = new Produto();
    this.exibirBotoes = true;
    this.tabelaVisivel = true;
  }

  produtoToRequest(p: Produto):any{
    this.dto.prodNome = p.prodNome;
    this.dto.preco = p.preco;
    this.dto.dataLote = p.dataLote;
    this.dto.tipo = p.tipo;
    return this.dto;
  }

 /*
    O básico aqui, precisa apagar depois

    alterar(celular:string):void{
    this.request = this.produtoToRequest(this.formulario.value as Produto);
    debugger
    this.service.alterarProduto(celular, this.request)
    .subscribe(retorno => {
      let posicao = this.produtos.findIndex(obj => {
        return obj.id == (retorno.id-1);
      });

      this.produtos[posicao] = retorno;
      this.produto = new Produto();
      this.request = new Produto();

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Produto alterado com sucesso!')
    });
  }

    disponibilizar(nome: string):void{
    this.disponivelRequest.prodNome = nome
    this.service.disponibilizarPorId(this.disponivelRequest)
    .subscribe(retorno => {
      let posicao = this.produtos.findIndex(obj => {
        return obj.id == (retorno.id);
      });

      this.produtos[posicao] = retorno;
      this.produto = new Produto();
      this.disponivelRequest = new ProdDisponivelResquest;

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Status alterado com sucesso!')
    });
  }

  selecionar(nome: string):void{
    this.service.selecionarProduto(nome)
    .subscribe(retorno => {
      let posicao = this.produtos.findIndex(obj => {
        debugger
        return obj.prodNome == (retorno.prodNome);
        debugger
      })
      let posicao = this.produtos.findIndex(obj => {
        return obj.id == (retorno.id-1);
      });

      debugger
      this.produtos[posicao] = retorno;
      this.statusDisponivel = this.produto.disponivel;
      this.exibirBotoes = false;
      this.tabelaVisivel = false;

      this.produtos[posicao] = retorno;
      this.produto = new Produto();

      this.exibirBotoes = true;
      this.tabelaVisivel = true;
    });
  }

  salvar():void{
    this.contatos.push(this.formulario.value as Contato);
    this.formulario.reset();
    console.table(this.contatos);
  }

  selecionar(posicao:number):void{
    this.indice = posicao;
    this.contato = this.contatos[posicao];

    this.btnCadastrar = false;
    this.tabelaVisivel = false;
  }

  alterarContato():void{
    this.contatos[this.indice] = this.formulario.value as Contato;

    this.formulario.reset();

    this.btnCadastrar = true;
    this.tabelaVisivel = true;
  }

  removerContato(){
    this.contatos.splice(this.indice, 1);

    this.formulario.reset();

    this.btnCadastrar = true;
    this.tabelaVisivel = true;
  }*/

}
