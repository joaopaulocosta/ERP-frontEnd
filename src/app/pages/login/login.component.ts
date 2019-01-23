import { Component, OnInit, NgModule } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators   } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { 
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.nome.value, this.f.senha.value)
                .subscribe(response => {
                  this.authenticationService.sucessfulLogin(response.headers.get('Authorization'));
                  this.authenticationService.usuarioLogado.next(true);
                  this.router.navigate(['/home']);
                },
                error => {
                  this.messageService.add({severity:'error', summary:'Erro', detail:'Usuário ou senha inválidos!'});
                  this.loading = false;
                });
    
}

}
