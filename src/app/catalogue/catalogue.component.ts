import { Component, OnInit } from '@angular/core';
import { Item, CatalogueSearchRequest } from './catalogue.model';
import { CatalogueService } from './catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  providers: [CatalogueService]
})
export class CatalogueComponent implements OnInit {

  shopId: string = "407"
  item: Item = { barcodeId: '', basePrice: 0, description: '', name: '', sellingType: '', sku: '', type: 'ITEM', optionIds : [] };
  optionName = ""
  options = []
  selectedOptions = []
  constructor(private _catalogueService: CatalogueService) { }

  ngOnInit() {
  }

  saveItem() {
    this.selectedOptions.forEach((option: any)=>{
      this.item.optionIds.push(option.id)
    })
    this._catalogueService.addNewItem(this.item).subscribe(data => {
      console.log(data);
    }, (err) => {
      console.log(err);
      alert(err)
    })
  }


  searchOption(event: any) {
    this.options = []
    let searchParam: string = event.target.value
    if (searchParam == null || searchParam == '') {
      this.options = []
      return;
    }
    let request: CatalogueSearchRequest = { 'shopId': this.shopId, "name": searchParam }

    this._catalogueService.searchOption(request).subscribe(response => {
      this.options = response
    })
  }

  selectOption(event) {
    console.log(event)
    let optionFound = false;
    let selectedOption = event.option.value

    this.selectedOptions.filter((eachOption: any) => {
      if (eachOption.id == selectedOption.id) {
        optionFound = true;
      }
    });
    if(!optionFound){
      this.selectedOptions.push(event.option.value);
    }
  }

  displayOption(option){
    return "";
  }

  removeOption(optionId:number){
    this.selectedOptions.filter((eachOption: any, index) =>{
        if(eachOption.id == optionId){
          this.selectedOptions.splice(index,1);
          return;
        }
    });
  }
}
