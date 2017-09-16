import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {


domain="";


  constructor(public http:Http) { }

  registerEmployee(employee) {
    return this.http.post(this.domain +'/register/registerEmployee',employee).map(res => res.json());
  }

  checkEmployeeId(employeeId) {
    return this.http.get(this.domain + '/register/checkEmployeeId/'+employeeId).map(res => res.json());
  }
  getReports(){
      return this.http.get(this.domain + '/register/Employee').map(res => res.json());
  }

}
