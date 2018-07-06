import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
@Injectable()
export class AdminLayoutService {

    headers = new HttpHeaders();
    constructor(public http: HttpClient) {
        this.headers = this.headers.set('Content-Type', 'application/json');
    }
    getListOfStores() {
        return JSON.parse(localStorage.getItem('admin')).shopList;
    }
}
