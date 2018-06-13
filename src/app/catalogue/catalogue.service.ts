import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './catalogue.model';
import { API_ENDPOINT, addItem } from 'config/config';
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

}
