import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { JwtHelper } from "angular2-jwt";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@NgModule()
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public config: any;
    jwtHelper: JwtHelper = new JwtHelper();

    private usuarioLogado = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,  public storage: StorageService, public router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.router = router;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    get usuarioEstaLogado() {
        return this.usuarioLogado.asObservable(); 
    }

    login(nome: string, senha: string) {
        return this.http.post(API_CONFIG.baseUrl + `/login`, 
                                    { nome, senha },
                                    {
                                        observe: 'response',
                                        responseType: 'text'
                                    })
        .subscribe(response => {
            this.sucessfulLogin(response.headers.get('Authorization'));
            this.usuarioLogado.next(true);
            this.router.navigate(['/home']);
          },
          error => {})
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.usuarioLogado.next(false);
    }

    sucessfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : User = {
            token: tok,
            nome: this.jwtHelper.decodeToken(tok).sub
        };
        this.currentUserSubject.next(user);
        this.storage.setLocalUser(user);
    }

}