import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../model/Categoria';
import { CategoriaRequestDto } from '../model/dto/CategoriaRequestDto';
import { CategoriaService } from '../service/categoria.service';
import { Router } from '@angular/router';
import { DesvincularProdutoDto } from '../model/dto/DesvincularProdutoDto';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  exibirBotoes:boolean = true;
  tabelaVisivel:boolean = true;
  btnCadastrar: boolean = true;
  btnAlterarEnable:boolean = false;

  formulario = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    secao: new FormControl(''),
    produtoId: new FormControl(null, [Validators.required]),
  })

  categorias:Categoria[] = [];
  categoria = new Categoria();
  request = new CategoriaRequestDto();
  desvincularRequest = new DesvincularProdutoDto();

  dto = new CategoriaRequestDto();
  statusDisponivel: string;

  constructor(private service:CategoriaService, private router:Router) {}

  exibir(): void{
    this.service.selecionar().subscribe(
      retorno => this.categorias = retorno
    );
  }

  ngOnInit(){
    this.exibir();
  }

  salvarCategoria():void{
    this.request.nome = this.formulario.value.nome;
    this.request.secao = this.formulario.value.secao;
    this.request.produtoId = this.formulario.value.produtoId;

    this.service.salvarCategoria(this.request)
    .subscribe(retorno => {
      this.categorias.push(retorno);

      this.categoria = new Categoria();
      this.request = new CategoriaRequestDto();
      alert('Categoria salvo com sucesso!')
    });
  }

  selecionarCategoria(posicao:number):void{
    this.categoria = this.categorias[posicao];

    this.exibirBotoes = false;
    this.tabelaVisivel = false;
  }

  alterar(id:number):void{
    this.request = this.categoriaToRequest(this.formulario.value as Categoria);
    this.service.alterarCategoriaId(id, this.request)
    .subscribe(retorno => {
      let posicao = this.categorias.findIndex(obj => {
        return obj.id == (retorno.id);
      });

      this.categorias[posicao] = retorno;
      this.categoria = new Categoria();
      this.request = this.categoriaToRequest(new Categoria);

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Categoria alterado com sucesso!')
    });
  }

  desvincular(id: number, idProduto:number):void{
    this.desvincularRequest.categoriaId = id
    this.desvincularRequest.produtoId = idProduto

    this.service.desvincular(this.desvincularRequest)
    .subscribe(retorno => {
      let posicao = this.categorias.findIndex(obj => {
        return obj.id == (retorno.id);
      });

      this.categorias[posicao] = retorno;
      this.categoria = new Categoria();
      this.desvincularRequest = new DesvincularProdutoDto;

      this.exibirBotoes = true;
      this.tabelaVisivel = true;

      alert('Status alterado com sucesso!')
    });
  }

  cancelar():void {
    this.categoria = new Categoria();
    this.exibirBotoes = true;
    this.tabelaVisivel = true;
  }

  removerCategoria(id:number):void{
    this.service.remover(id)
    .subscribe(retorno => {
      if (retorno.toString() === "OK") {
        let posicao = this.categorias.findIndex(() => {
          return id == this.categoria.id;
        });
        this.categorias.splice(posicao, 1);
        this.categoria = new Categoria();

        this.exibirBotoes = true;
        this.tabelaVisivel = true;

        alert('Categoria excluída com sucesso!');

      } else {
        alert('Não foi possível excluir a categoria');
      }
    });
  }

  categoriaToRequest(c: Categoria):any{
    this.dto.nome = c.nome;
    this.dto.secao = c.secao;
    if (c.produtoId === undefined) {
      this.dto.produtoId = null;
    } else {
      this.dto.produtoId = c.produtoId.id;
    }
    return this.dto;
  }

}
