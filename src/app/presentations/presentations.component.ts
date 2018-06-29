import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PresentationsService } from './presentations.service';
import { ItemFlowComponent } from '../item-flow/item-flow.component';
import { MatTable, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CatalogueSearchRequest } from '../catalogue/catalogue.model';
import { CatalogueService } from '../catalogue/catalogue.service';



let shopId: number = 407;


@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss'],
  providers: [PresentationsService]
})
export class PresentationsComponent implements OnInit {


  presentations = []
  selectedRowIndexes = []
  // @ViewChild(MatTable) table: MatTable<any>;
  constructor(private _presentationService: PresentationsService, private _changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getPresentations();
  }


  openDialog(presentation, itemPresentationIndex) {
    console.log(presentation)
    console.log("Index " + itemPresentationIndex)
    this.dialog.open(AddItemToPresentation, {
      height: '75%',
      width: '50%',
      data: { presentation: presentation, itemPresentationIndex: itemPresentationIndex }
    });
  }

  checkParameter(parameterName:String, checkWith:String){
    return parameterName.toUpperCase() == checkWith.toUpperCase();
  }

  getPresentations() {

    this._presentationService.getPresentations(shopId).subscribe((data: any) => {
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


@Component({
  selector: 'addItemToPresentation',
  templateUrl: './addItemToPresentation.html',
  providers: [PresentationsService, CatalogueService]
})
export class AddItemToPresentation implements OnInit {

  items = []
  selectedItems = []
  selectedItemsDataSource = new MatTableDataSource(this.selectedItems)
  selectedItemsDisplayedColumns = ['id', 'name', 'sku', 'basePrice', 'delete'];
  constructor(
    public dialogRef: MatDialogRef<AddItemToPresentation>,
    private _catalogueService: CatalogueService,
    private _presentationsService: PresentationsService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }





  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  searchItem(event: any) {
    this.items = []
    let searchParam: string = event.target.value
    if (searchParam == null || searchParam == '') {
      this.items = []
      return;
    }
    let request: CatalogueSearchRequest = { 'shopId': shopId.toString(), "name": searchParam }

    let searchObservable = this._catalogueService.searchItem(request).subscribe(response => {
      this.items = response
    })
  }

  selectItem(event) {
    let itemFound = false;
    let selectedItem = event.option.value

    //Search in the selectedItems
    this.selectedItems.filter((item: any) => {
      if (item.id == selectedItem.id) {
        itemFound = true;
      }
    });

    //Search in the existing presentation
    this.data.presentation.itemPresentations.forEach((itemPresentation, index) => {
      if (index == this.data.itemPresentationIndex) {
        for (let item of itemPresentation.items) {
          if (item.id == selectedItem.id) {
            itemFound = true;
          }
        }
      }
    });

    if (!itemFound) {
      this.selectedItems.push(event.option.value);
      this.selectedItemsDataSource = new MatTableDataSource(this.selectedItems)
      this.openSnackBar(selectedItem.id+": "+selectedItem.name+" has been added","Close");
    }else{
      this.openSnackBar("Alert!!"+selectedItem.id+": "+selectedItem.name+" already exists","Close");
    }

    console.log(this.selectedItems)
  }

  removeItem(itemId: number) {
    this.selectedItems.filter((item: any, index) => {
      if (item.id == itemId) {
        this.selectedItems.splice(index, 1);
        this.selectedItemsDataSource = new MatTableDataSource(this.selectedItems)
        return;
      }
    });
  }

  addItemsToPresentation() {
    console.log(this.data)
    console.log(this.selectedItems)

    let selectedItemsAddedToList = false;
    this.data.presentation.itemPresentations.forEach((itemPresentation, index) => {
      if (index == this.data.itemPresentationIndex) {
        this.selectedItems.forEach((item, index) => {
          itemPresentation.itemIds.push(item.id);
        });
        selectedItemsAddedToList = true;
        return;
      }
    });
    if (selectedItemsAddedToList) {
      let presentationRequest = Object.assign({}, this.data.presentation)
      for (let itemPresentation of presentationRequest.itemPresentations) {
        itemPresentation.items.splice(0, itemPresentation.items.length);
      }
      this._presentationsService.updatePresentation(this.data.presentation).subscribe(
        data => {
          data.presentation
          console.log(data);
        }, (err) => {
          alert(err);
        }
      )
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  displayItem() {
    return "";
  }



}
