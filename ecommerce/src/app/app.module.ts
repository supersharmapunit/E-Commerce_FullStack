import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadernavComponent } from './headernav/headernav.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ProductdescriptionComponent } from './productdescription/productdescription.component';
import { TablecontentComponent } from './tablecontent/tablecontent.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
  declarations: [
    AppComponent,
    HeadernavComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SearchresultComponent,
    ProductdescriptionComponent,
    TablecontentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
