import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer-service';
import {ConfigService} from '../service/config-service';
import {Router} from '@angular/router';
import {parse} from 'js2xmlparser';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-data-protability',
  templateUrl: './data-protability.component.html',
  styleUrls: ['./data-protability.component.css']
})
export class DataProtabilityComponent implements OnInit {
  personalInfo: any;
  idUser: any = localStorage.getItem('idCustmer');
  checkboxFlag: boolean ;
  customersxml: any;
  consent_sms: boolean;
  consent_mail: boolean;
  consent_partner_offers: boolean;
  blockMode: boolean;
  today: any ;
  latest_date: any;
  fixedTimezone = '2015-06-15T09:03:01+0900';
  constructor(public customerService: CustomerService, public confService: ConfigService, public router: Router,
              public datepipe: DatePipe) { }

  ngOnInit() {
    console.log(this.idUser);
    this.customerService.getPersonalDat(this.idUser)
      .subscribe(data => {
        if (data.length > 0) {
          this.customersxml = data[0].customer;
          this.personalInfo = data[0].customer;
          console.log(data[0].customer.primary_info);

          // this.customers = data[0].customer.primary_info;
          // this.customers.mdmcustid = data[0].customer.mdmcustid;
          // this.personalInfo = data[0].customer;
          console.log(this.customersxml);
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
          // Les trois valeurs de consentement
          // this.consent_sms = this.customersxml.processconsentement.consent_sms;
          if (this.customersxml.processconsentement.consent_sms === 'false') {
            this.consent_sms = false ;
          } else if (this.customersxml.processconsentement.consent_sms === 'true') {
            this.consent_sms = true ;
          }
          if (this.customersxml.processconsentement.consent_mail === 'false') {
            this.consent_mail = false ;
          } else if (this.customersxml.processconsentement.consent_mail === 'true') {
            this.consent_mail = true ;
          }
          if (this.customersxml.processconsentement.consent_partner_offers === 'false') {
            this.consent_partner_offers = false ;
          } else if (this.customersxml.processconsentement.consent_partner_offers === 'true') {
            this.consent_partner_offers = true ;
          }
            // this.customersxml.processconsentement.consent_sms;
          // console.log(this.customersxml.processconsentement.consent_sms);
          // this.consent_mail = this.customersxml.processconsentement.consent_mail;
          // this.consent_partner_offers = this.customersxml.processconsentement.consent_partner_offers;

        } else {
          alert('Pas d information sur le customer merci de se connecter avec un autre customer' );
          this.router.navigate(['connexion']);
          this.confService.delateDataLoclaStorige();
        }
      });
  }
  downloadPersonalData() {
    this.customerService.downloadData(this.idUser)
      .subscribe( data => {
        console.log(data);
      });
  }
  downloadAppFile(projectName: any): any {
     console.log(projectName)
    return 'http://ec2-18-197-4-164.eu-central-1.compute.amazonaws.com:9090/download/' + projectName.trim() + '.xlsx';
  }
  chekBoxValue(value: string) {
    console.log(value);
    this.customersxml.processconsentement.consent_comm_frequency = value;
    this.updateDataPortability();
  }
  forgetmevalue() {
    this.customersxml.processconsentement.consent_total_forget = true;
    this.updateDataPortability();
	localStorage.clear();
    this.router.navigate(['connexion']);
  }
  mesConstValue(value: any , type: any) {
     this.today = new Date(Date.parse(Date()));
     this.latest_date = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    if (type === 'sms') {
      this.customersxml.processconsentement.consent_sms = value;
       this.customersxml.processconsentement.consent_date_sms = this.latest_date;
    } else if (type === 'mail') {
       this.customersxml.processconsentement.consent_mail = value;
       this.customersxml.processconsentement.consent_date_mail = this.latest_date;

    } else if (type === 'partner') {
      this.customersxml.processconsentement.consent_partner_offers = value;
       this.customersxml.processconsentement.consent_date_partner_offers = this.latest_date;

    }
    this.updateDataPortability();
  }
  updateDataPortability() {
     // console.log(parse('Customer', this.customersxml));
    this.customerService.updateData(parse('Customer', this.customersxml))
      .subscribe(data => {
        // alert('mise a jour effectuer');
        // console.log(data);
      }, error2 => {
        console.log((error2));
      });
  }

  showForgetMe() {
   this.blockMode = ! this.blockMode;
  }
  // Méthode pour faire la deconnexion
  deconnect() {
    localStorage.clear();
    this.router.navigate(['connexion']);
  }
  sendMail(idUsers: any) {
    this.customerService.sendMail(idUsers)
      .subscribe( data => {
		  alert('Email envoyé !');
        console.log(data);
      });
     //return 'http://ec2-18-197-4-164.eu-central-1.compute.amazonaws.com:9095/custid/' + idUsers.trim();
  }
}
