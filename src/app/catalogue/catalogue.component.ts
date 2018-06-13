import { Component, OnInit } from '@angular/core';
import { Item } from './catalogue.model';
import { CatalogueService } from './catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  providers:[CatalogueService]
})
export class CatalogueComponent implements OnInit {

  item: Item = { barcodeId: '', basePrice: 0, description: '', name: '', sellingType: '', sku: '',type:'ITEM' };

  constructor(private _catalogueService : CatalogueService) { }

  ngOnInit() {
  }

  saveItem(){
    this._catalogueService.addNewItem(this.item).subscribe(data=>{
      console.log(data);
    }, (err)=>{
      console.log(err);
      alert(err)
    })
  }

}
