import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PresentationsService } from './presentations.service';
import { MatTable } from '@angular/material';
import { ItemFlowComponent } from '../item-flow/item-flow.component';



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
  constructor(private _presentationService: PresentationsService, private _changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog) {

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
    console.log(item);
    this.openItemFlow(item);
  }


  deleteItemFromPresentation(presentationId: number, itemId: number, itemPresentation: any) {


    let foundindex = -1;
    itemPresentation.items.filter((eachItem: any, index) => {
      if (eachItem.id === itemId) {
        foundindex = index;
      }
    })
    if (foundindex != -1) {
      let itemIds = [itemId]

      this._presentationService.removeItemsFromPresentations(presentationId, itemIds).subscribe(data => {

        itemPresentation.items.splice(foundindex, 1);
        this.selectedRowIndexes.push(itemId);
      },
        (err) => {
          alert(err);
        }
      )


    }

  }

  displayedColumns = ['id', 'name', 'sku', 'basePrice', 'defaultPrice', 'tags', 'expand'];

  openItemFlow(item) {

    let dialogRef = this.dialog.open(ItemFlowComponent, {
      height: '400px',
      width: '600px',
      data : {
        item : item
      }
    });
  }

}
