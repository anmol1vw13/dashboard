import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item, CatalogueSearchRequest } from './catalogue.model';
import { API_ENDPOINT, addItem, searchOption, searchItem } from 'config/config';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CatalogueService {

  headers = new HttpHeaders();

  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  addNewItem(data: Item) {

    return this.http.post(addItem, data, { headers: this.headers })
      .map((res: Response) => {
        return res
      })
      .catch((err: any) => {
        return Observable.throw(err)
      })

  }

  searchOption(data: CatalogueSearchRequest){
    return this.http.post(searchOption, data, {headers: this.headers})
    .map((res:Response) => {
      return res;
    }).catch((err:any) =>{
      return Observable.throw(err)
    })
  }


  searchItem(data: CatalogueSearchRequest){
    return this.http.post(searchItem, data, {headers: this.headers})
    .map((res:Response) => {
      return res;
    }).catch((err:any) =>{
      return Observable.throw(err)
    })
  }



}
