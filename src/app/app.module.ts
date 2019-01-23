import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MenubarModule} from 'primeng/menubar';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import {HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './pages/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    HttpClientModule,
    AuthenticationService,
    StorageService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
