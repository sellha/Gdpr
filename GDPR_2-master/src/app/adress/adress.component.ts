import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer-service';
import {ConfigService} from '../service/config-service';
import {Router} from '@angular/router';
import {parse} from 'js2xmlparser';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit {
  personalInfo: any;
  idUser: any ;
  customersxml: any;
  mode: number = 1;
  constructor(public customerService: CustomerService, public confService: ConfigService, public router: Router) { }

  ngOnInit() {
    this.idUser = localStorage.getItem('idCustmer')
    console.log(this.idUser)
    this.customerService.getPersonalDat(this.idUser)
      .subscribe(data => {
        if (data.length > 0) {
          this.customersxml = data[0].customer;
          this.personalInfo = data[0].customer;
          console.log(this.personalInfo);


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
  updateContact(idMode: number) {
      this.mode = idMode;
  }
  updateMyInfo() {
    console.log(parse('Customer', this.customersxml));
    this.customerService.updateData(parse('Customer', this.customersxml))
      .subscribe(data => {
        // alert('mise a jour effectuer');
        // console.log(data);
        if (this.mode = 2) {this.mode = 1; }
      }, error2 => {
        console.log((error2));
      });

  }
  // Méthode pour faire la deconnexion
  deconnect() {
    localStorage.clear();
    this.router.navigate(['connexion']);

  }
}
