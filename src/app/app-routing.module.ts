import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: 'home',  
    loadChildren: './pages/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'produto', loadChildren: './pages/produto/produto.module#ProdutoModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', loadChildren: './pages/login/login.module#LoginModule'
  }, 
  { 
    path: '', loadChildren: './pages/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
