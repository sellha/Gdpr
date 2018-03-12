import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {OrdersComponent} from './orders/orders.component';
import {DataProtabilityComponent} from './data-protability/data-protability.component';
import {AdressComponent} from './adress/adress.component';
import {SocialMediaComponent} from './social-media/social-media.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {CreditComponent} from './credit/credit.component';

export const routes: Routes = [
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'personalData',
    component: PersonalDataComponent,
  },
  {
    path: 'adresse',
    component: AdressComponent
  },
  {
    path: 'mesCommandes',
    component: OrdersComponent
  },
  {
    path: 'socialMedia',
    component: SocialMediaComponent
  },
  {
    path: 'dataProtability',
    component: DataProtabilityComponent
  },
  {
    path: 'credit',
    component: CreditComponent
  },
  {path: '' ,
    redirectTo: '/connexion',
    pathMatch: 'full'
  }


];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
}
