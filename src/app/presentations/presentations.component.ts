import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PresentationsService } from './presentations.service';
import { ItemFlowComponent } from '../item-flow/item-flow.component';
import { MatTable, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CatalogueSearchRequest } from '../catalogue/catalogue.model';
import { CatalogueService } from '../catalogue/catalogue.service';
import { ComboitemComponent, ComboItemModalComponent } from '../comboitem/comboitem.component';


let shopId: number = 407;


@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss'],
  providers: [PresentationsService]
})
export class PresentationsComponent implements OnInit {

  loading: boolean = false;
  presentations = []
  selectedRowIndexes = []
  // @ViewChild(MatTable) table: MatTable<any>;
  constructor(private _presentationService: PresentationsService, private _changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getPresentations();
  }


  openDialog(presentation, itemPresentationIndex) {
    let addDialogPresentation = this.dialog.open(AddItemToPresentation, {
      height: '75%',
      width: '50%',
      data: { presentation: presentation, itemPresentationIndex: itemPresentationIndex }
    });
    addDialogPresentation.afterClosed().subscribe((data) => {
      console.log('data', data);
      if (data !== undefined && data !== null) {
        console.log('Presentation Index',this.presentations.indexOf(presentation))
        this.presentations[this.presentations.indexOf(presentation)] = data;
        console.log('Old', this.presentations);
        let newPresentation = JSON.parse(JSON.stringify(this.presentations));
        console.log('New', newPresentation);
        this.presentations = newPresentation;
      }
    })
  }

  checkParameter(parameterName: String, checkWith: String) {
    return parameterName.toUpperCase() == checkWith.toUpperCase();
  }

  getPresentations() {
    this.loading = true;
    this._presentationService.getPresentations(shopId).subscribe((data: any) => {
      this.loading = false;
      this.presentations = data;
    })
  }

  expand(item) {
    console.log(item);
    this.openItemFlow(item);
  }

  edit(item) {
    console.log(item);
    this.openEditItem(item);

  }

  openEditItem(item) {
    let dialogRef = this.dialog.open(ComboItemModalComponent, {
      data: {
        width: '150%',
        item: item
      }
    });
  }


  deleteItemFromPresentation(presentationId: number, itemId: number, itemPresentation: any) {

    console.log(this.presentations);
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
      data: {
        item: item
      }
    });
  }

  createPresentation() {
    const dialogRef = this.dialog.open(CreatePresentationComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined || result != null) {
        console.log(result);
        let newItemPresentation = { 'name': result };
        this.presentations.push(newItemPresentation);
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
  loading: boolean = false;
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

    this.loading = true;
    let searchObservable = this._catalogueService.searchItem(request).subscribe(response => {
      this.loading = false;
      this.items = response
    })
  }


  selectItem(event) {
    let itemFound = false;
    let selectedItem = event.option.value
    this.items = [];

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
      this.openSnackBar(selectedItem.id + ": " + selectedItem.name + " has been added", "Close");
    } else {
      this.openSnackBar("Alert!!" + selectedItem.id + ": " + selectedItem.name + " already exists", "Close");
    }
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

    let selectedItemsAddedToList = false;
    let presentationRequest = JSON.parse(JSON.stringify(this.data.presentation));
    presentationRequest.itemPresentations.forEach((itemPresentation, index) => {
      if (index == this.data.itemPresentationIndex) {
        this.selectedItems.forEach((item, index) => {
          itemPresentation.itemIds.push(item.id);
        });
        selectedItemsAddedToList = true;
        return;
      }
    });
    if (selectedItemsAddedToList) {
      for (let itemPresentation of presentationRequest.itemPresentations) {
        itemPresentation.items.splice(0, itemPresentation.items.length);
      }
      this.loading = true;
      this._presentationsService.updatePresentation(this.data.presentation).subscribe(
        response => {
          if (response.success) {
            this.data.presentation = response.presentation
            this.dialogRef.close(response.presentation);
          } else {
            this.openSnackBar(response.message, "Close");
          }

        }, (err) => {
          this.loading = false;
          alert(err);
        }, () => {
          this.loading = false;
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

@Component({
  selector: 'createPresentation',
  templateUrl: './createPresentation.component.html',
})
export class CreatePresentationComponent {

  name: string = '';
  constructor(
    public dialogRef: MatDialogRef<CreatePresentationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPresentation() {
    this.dialogRef.close(this.name);
  }

}
