import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PresentationsService } from './presentations.service';
import { MatTable } from '@angular/material';



@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss'],
  providers: [PresentationsService]
})
export class PresentationsComponent implements OnInit {

  shopId: number = 407;
  presentations = []
  selectedRowIndexes = []
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private _presentationService: PresentationsService, private _changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.getPresentations();
  }

  getPresentations() {

    this._presentationService.getPresentations(this.shopId).subscribe((data: any) => {
      this.presentations = data;
    })
  }

  expand(item) {
    console.log(item)
  }


  deleteItemFromPresentation(presentationId: number, itemId: number, itemPresentation: any) {

    
    let foundindex = -1;
    itemPresentation.items.filter((eachItem : any, index) => {
      if (eachItem.id === itemId) {
        foundindex = index;
      }
    })
    if(foundindex != -1){
      let itemIds = [itemId]
    
      this._presentationService.removeItemsFromPresentations(presentationId,itemIds).subscribe(data => {
        
        itemPresentation.items.splice(foundindex, 1);
        this.selectedRowIndexes.push(itemId);
      },
      (err)=>{
        alert(err);
      }
    )
      
      
    } 
   
  }

  displayedColumns = ['id', 'name', 'sku', 'basePrice', 'defaultPrice', 'tags','expand'];

}
