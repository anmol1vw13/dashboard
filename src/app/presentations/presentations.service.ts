import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getPresentations, removeItemsFromPresentation, updatePresentation, addPresentation,searchItem,orderPresentation } from 'config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { CatalogueSearchRequest } from './presentation.model';

@Injectable()
export class PresentationsService {

  headers = new HttpHeaders();
  options = new HttpHeaders({    responseType: 'text'
})
    
  
  newHeaders = new HttpHeaders({})
  constructor(public http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  searchItem(data: CatalogueSearchRequest){
    return this.http.post(searchItem, data, {headers: this.headers})
    .map((res:Response) => {
      return res;
    }).catch((err:any) =>{
      return Observable.throw(err)
    })
  }

  getPresentations(shopId: number) {
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
  updatePresentation(presentation:any){
    return this.http.post(updatePresentation, presentation)
      .map((res: any) => {
        return res
      })
      .catch((err: any) => {
        return Observable.throw(err)
      })
  }

  addPresentation(presentation:any){
    return this.http.post(addPresentation,presentation,{headers:this.headers}).map((res)=>{
      return res;
    }).catch((err)=>{
      return Observable.throw(err)
    })
  }

  orderPresentation(presentationIds : any){
    let presentationObj = {
      presentationIds : presentationIds
    }
    return this.http.post(orderPresentation,presentationObj,{headers:this.headers}).map((res)=>{
      return res;
    }).catch((err)=>{
      return Observable.throw(err)
    })
  }

}
