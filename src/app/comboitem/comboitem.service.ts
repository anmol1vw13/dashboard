import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComboItem } from './comboitem.model';
import { addNestedItemAPI } from 'config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
@Injectable()
export class ComboitemService {

  headers = new HttpHeaders();
  constructor(public http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }
  addNestedItem(item: ComboItem, shopId) {
    let nestedItem = {
      item:item,
      shopId:shopId
    }
    return this.http.post(addNestedItemAPI, nestedItem, { headers: this.headers }).map((res: any) => {
        return res;
      }).catch((err: any) => {
        return Observable.throw(err);
      })
  }
}
