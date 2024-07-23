import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { TelaPrincipalComponent } from './tela-principal/tela-principal.component';

export const routes: Routes = [
  {path:'produto', component: ProdutosComponent},
  {path:'categoria', component: CategoriaComponent},
  {path: 'principal', component: TelaPrincipalComponent},
  {path:'', redirectTo: 'principal', pathMatch:'full'}
];
