import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { EventsModule } from './events/events.module';
import { PasswordsIdenticalValidatorDirective } from './services/passwordsIdentical.directive';
import { EventService } from './services/event.service';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    PasswordsIdenticalValidatorDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    EventsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    EventService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
