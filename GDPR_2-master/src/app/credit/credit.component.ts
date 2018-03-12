import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {ConfigService} from '../service/config-service';
import {Router} from '@angular/router';
import {CustomerService} from '../service/customer-service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  personalInfo: any;
  idUser: any ;
  mode: number = 1;
  modeContact: number = 3;
  customers: User = new User();
  customersxml: any;
  today = Date.now();
  fixedTimezone = '2015-06-15T09:03:01+0900';
  constructor( public customerService: CustomerService, public confService: ConfigService,  public router: Router) {
  }
  ngOnInit() {
    this.idUser = localStorage.getItem('idCustmer')
    this.customerService.getPersonalDat(this.idUser)
      .subscribe(data => {
        if (data.length > 0) {
          this.customersxml = data[0].customer;
          this.personalInfo = data[0].customer;
          console.log(data[0].customer.primary_info);

          this.customers = data[0].customer.primary_info;
          // this.customers.mdmcustid = data[0].customer.mdmcustid;
          // this.personalInfo = data[0].customer;
          // console.log(this.customersxml);
          this.customersxml.processdata.createdate = '';
          this.customersxml.processdata.createdby = '';
          this.customersxml.processdata.lastupdated = '';
          this.customersxml.processdata.lastupdatedby = '';
          this.customersxml.processdata.eff_start_date = '';
          this.customersxml.processdata.eff_end_date = '';
          this.customersxml.processdata.dsc_task_id = '';
          this.customersxml.processdata.matchkey1 = '';
          this.customersxml.processdata.matchkey2 = '';
          this.customersxml.processdata.matchkey3 = '';

        } else {
          alert('Pas d information sur le customer merci de se connecter avec un autre customer' );
          this.router.navigate(['connexion']);
          this.confService.delateDataLoclaStorige();
        }
      });
  }
  // Méthode pour faire la deconnexion
  deconnect() {
    localStorage.clear();
    this.router.navigate(['connexion']);

  }


}
