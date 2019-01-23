import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogado$: Observable<boolean>;

  itens: MenuItem[];
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {

    this.usuarioLogado$ = this.auth.usuarioEstaLogado; 

    this.itens = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: 'home'
        
      },
      {
        label: 'Produtos',
        icon: 'pi pi-fw pi-home',
        routerLink: 'produto'   
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: 'login',
        command: (event) => {
          this.auth.logout();
        }   
      }
    ];
  }

}
