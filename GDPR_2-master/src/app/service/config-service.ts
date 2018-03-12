import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  private _api_url = 'http://18.197.4.164:8180';
  public idCustmer;
  saveDataLoclaStorige() {
    localStorage.setItem('idCustmer', '' + this.idCustmer);
  }
  delateDataLoclaStorige() {
    localStorage.clear();
  }
}
