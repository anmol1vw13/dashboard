import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getPresentations } from 'config/config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PresentationsService {

  headers = new HttpHeaders();
  constructor(public http: HttpClient) { 
    this.headers = this.headers.set('Authorization','Bearer 5M6ZmrpbRB7OKR5q1UEXyWkXiMlNR8By8OLenKVw')
      this.headers = this.headers.append('Content-Type', 'application/json');
  }

  getPresentations(shopId: number){
      // this.headers = this.headers.set('Authorization','Bearer 5M6ZmrpbRB7OKR5q1UEXyWkXiMlNR8By8OLenKVw')
      // this.headers = this.headers.append('Content-Type', 'application/json');
      return this.http.get(getPresentations+"/"+shopId, { headers:this.headers })
      .map((res:Response)=>{
        return res;
      })
      .catch((err:any)=>{
        return Observable.throw(err);
      })
  }
}
