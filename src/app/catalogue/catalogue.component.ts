import { Component, OnInit } from '@angular/core';
import { Item, CatalogueSearchRequest } from './catalogue.model';
import { CatalogueService } from './catalogue.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  providers: [CatalogueService]
})
export class CatalogueComponent implements OnInit {

  shopId: string = "407"
  item: Item = { barcodeId: '', basePrice: 0, description: '', name: '', sellingType: '', sku: '', type: 'ITEM', optionIds: [] };
  optionName = ""
  options = []
  observableList: any[] = []
  selectedOptions = []
  itemForm = new FormGroup({

  })
  constructor(private _catalogueService: CatalogueService, private formBuilder: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      basePrice: ['0', Validators.required],
      sku: ['', Validators.required],
      barcodeId: ['', Validators.required],
      sellingType: ['', Validators.required],
      shopId: ['', Validators.required],
      optionSearch: ['']
    })
  }

  ngOnInit() {
  }



  saveItem() {

    if (this.itemForm.status != 'VALID') {
      return;
    }

    // if(this.itemForm.get('name').status != 'VALID'){

    // } else if (this.itemForm.get('barcodeId').status != 'VALID') {

    // } else if (this.itemForm.get('description').status != 'VALID') {

    // } else if (this.itemForm.get('sellingType').status != 'VALID') {

    // } else if (this.itemForm.get('sku').status != 'VALID') {

    // } else if(this.itemForm.get('basePrice').status != 'VALID') {

    // }

    this.item = {
      name: this.itemForm.get('name').value,
      barcodeId: this.itemForm.get('barcodeId').value,
      description: this.itemForm.get('description').value,
      sellingType: this.itemForm.get('sellingType').value,
      sku: this.itemForm.get('sku').value,
      basePrice: this.itemForm.get('basePrice').value,
      type: 'ITEM',
      optionIds: []
    }

    this.selectedOptions.forEach((option: any) => {
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

    let searchObservable = this._catalogueService.searchOption(request).subscribe(response => {
      this.options = response
    })
    this.observableList.push(searchObservable);
  }

  removeSubscriptions(){
    for(let i = 0; i < this.observableList.length; i++){
      this.observableList[i].unsubscribe();
    }
  }

  selectOption(event) {
    let optionFound = false;
    let selectedOption = event.option.value

    this.selectedOptions.filter((eachOption: any) => {
      if (eachOption.id == selectedOption.id) {
        optionFound = true;
      }
    });
    if (!optionFound) {
      this.selectedOptions.push(event.option.value);
    }
  }

  displayOption(option) {
    return "";
  }

  removeOption(optionId: number) {
    this.selectedOptions.filter((eachOption: any, index) => {
      if (eachOption.id == optionId) {
        this.selectedOptions.splice(index, 1);
        return;
      }
    });
  }
}
