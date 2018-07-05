import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { storeCloneAPI } from 'config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

@Injectable()
export class StoreCloneService {

  headers = new HttpHeaders();
    
  
  newHeaders = new HttpHeaders({})
  constructor(public http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  storeClone(soruceStore: any, targetStore : any){

    let data = {
        sourceShopId : soruceStore,
        destinationShopId : targetStore
    }

    return this.http.post(storeCloneAPI, data, {headers: this.headers})
    .map((res:Response) => {
      return res;
    }).catch((err:any) =>{
      return Observable.throw(err)
    })
  }


}
