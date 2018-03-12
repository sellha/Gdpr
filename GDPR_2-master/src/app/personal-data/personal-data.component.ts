import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer-service';
import {ConfigService} from '../service/config-service';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {parse} from 'js2xmlparser';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
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
  // Méthode permet de switcher en deux modes : mode read et mode update
  updateContact(idMode: number) {
    if (idMode < 3) {
      this.mode = idMode;
    }
    if (idMode > 2) {
      this.modeContact = idMode;
    }
  }
  // Methode permet de faire la mise à jour des information 'Mes informations
  updateMyInfo() {
    console.log(parse('Customer', this.customersxml));
    console.log( this.customers);
    this.customersxml.fullname = this.customers.last_name + ' ' + this.customers.first_name;
    this.customerService.updateData(parse('Customer', this.customersxml))
      .subscribe(data => {
        // alert('mise a jour effectuer');
        // console.log(data);
        if (this.mode = 2) {this.mode = 1; }
        if (this.modeContact = 4) {this.modeContact = 3; }
      }, error2 => {
        console.log((error2));
      });

  }
  // Méthode permet de recupérer la valeur selectionner dans la listbox
  onChange(value: any) {
    this.customersxml.primary_info.gender = value;
  }
  onChangePrefix(value: any) {
    this.customersxml.primary_info.prefix = value;

  }
  onChangeSuffix(value: any) {
    this.customersxml.primary_info.suffix = value;

  }
  // Méthode pour faire la deconnexion
  deconnect() {
    localStorage.clear();
    this.router.navigate(['connexion']);

  }
}
