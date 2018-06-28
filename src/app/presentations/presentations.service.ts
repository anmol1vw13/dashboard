import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getPresentations, removeItemsFromPresentation } from 'config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

@Injectable()
export class PresentationsService {

  headers = new HttpHeaders();
  options = new HttpHeaders({    responseType: 'text'
})
    
  
  newHeaders = new HttpHeaders({})
  constructor(public http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  getPresentations(shopId: number) {
    this.headers = this.headers.append('Authorization', 'Bearer 5M6ZmrpbRB7OKR5q1UEXyWkXiMlNR8By8OLenKVw')
    return this.http.get(getPresentations + "/" + shopId, { headers: this.headers })
      .map((res: Response) => {
        return res;
      })
      .catch((err: any) => {
        return Observable.throw(err);
      })
  }


  removeItemsFromPresentations(presentationId: number, itemIds: Array<number>) {
    let request = {
      presentationId: presentationId,
      itemIds: itemIds
    }

    return this.http.post(removeItemsFromPresentation, request)
      .map((res: any) => {
        return res
      })
      .catch((err: any) => {
        return Observable.throw(err)
      })


  }
}
