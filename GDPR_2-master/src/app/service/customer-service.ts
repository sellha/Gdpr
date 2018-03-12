import {Injectable} from '@angular/core';
import {ApiService} from './api-service';
import {ConfigService} from './config-service';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class CustomerService {

  constructor(private apiService: ApiService,     private config: ConfigService) {
  }
  // get data user 5815 sans parametres
 getPersonalDat(userId: string) {
    return this.apiService.get('talendmdm/services/rest/data/Customer/Customer/' + userId + '?container=MASTER');
 }
 downloadData(userId: string) {
   return this.apiService.get('download/' + userId);
 }
 updateData(user: string) {
    return this.apiService.post('/talendmdm/services/rest/data/Customer?container=MASTER', user );
 }
 sendMail(iduser: any) {
    return this.apiService.get('/custid/' + iduser);
 }
}
