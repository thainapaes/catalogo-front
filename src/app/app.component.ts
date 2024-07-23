import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { CategoriaComponent } from "./categoria/categoria.component";
import { TelaPrincipalComponent } from "./tela-principal/tela-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProdutosComponent, CategoriaComponent, RouterLink, TelaPrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'catalogo-front';

  setActive(event: Event) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));

    const clickedLink = event.target as HTMLLinkElement;
    clickedLink.classList.add('active');
  }

}
