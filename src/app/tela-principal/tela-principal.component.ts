import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ProdutosComponent } from '../produtos/produtos.component';

@Component({
  selector: 'app-tela-principal',
  standalone: true,
  imports: [RouterOutlet, ProdutosComponent, CategoriaComponent, RouterLink],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css'
})
export class TelaPrincipalComponent {

  setActive(event: Event) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));

    const clickedLink = event.target as HTMLLinkElement;
    clickedLink.classList.add('active');
  }

}
