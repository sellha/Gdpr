import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { DataProtabilityComponent } from './data-protability/data-protability.component';
import { OrdersComponent } from './orders/orders.component';
import {AppRoutingModule} from './app-routing-module';
import {CustomerService} from './service/customer-service';
import {ConfigService} from './service/config-service';
import {ApiService} from './service/api-service';
import {HttpClientModule} from '@angular/common/http';
import {AlertModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { AdressComponent } from './adress/adress.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { FooterComponent } from './footer/footer.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {DatePipe} from '@angular/common';
import { CreditComponent } from './credit/credit.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonalDataComponent,
    DataProtabilityComponent,
    OrdersComponent,
    AdressComponent,
    SocialMediaComponent,
    FooterComponent,
    ConnexionComponent,
    InscriptionComponent,
    CreditComponent,
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CustomerService, ConfigService, ApiService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
