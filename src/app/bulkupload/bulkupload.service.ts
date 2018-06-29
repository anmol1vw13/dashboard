import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { uploadItemBulk } from 'config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

@Injectable()
export class BulkUploadService {

  headers = new HttpHeaders();
  options = new HttpHeaders({    responseType: 'text'
})
    
  
  newHeaders = new HttpHeaders({})
  constructor(public http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  uploadItemsInBulk(shopId: number, itemArr) {
      let postObj = {
          shopId : shopId,
          batchItems : itemArr
      }
    this.headers = this.headers.append('Authorization', 'Bearer 5M6ZmrpbRB7OKR5q1UEXyWkXiMlNR8By8OLenKVw')
    return this.http.post(uploadItemBulk,postObj, { headers: this.headers })
      .map((res: Response) => {
        return res;
      })
      .catch((err: any) => {
        return Observable.throw(err);
      })
  }
}
