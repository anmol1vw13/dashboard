import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { PresentationsService } from './presentations.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CatalogueSearchRequest } from './presentation.model';
import { ComboItemModalComponent } from '../comboitem/comboitem.component';
import { AdminLayoutService } from '../layouts/admin-layout/admin-layout.service';


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
  sorting: boolean = false;
  stores : any[] = [];
  selectedShopId : any = '';
  reorder_list_button_name = "Reorder presentations"
  // @ViewChild(MatTable) table: MatTable<any>;
  constructor(private _presentationService: PresentationsService, private _changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, public snackBar: MatSnackBar, public adminLayoutService : AdminLayoutService) {

  }

  ngOnInit() {
    this.getStores();
  }

  getStores(){
    this.stores = this.adminLayoutService.getListOfStores();
    console.log(this.stores);
    if(this.stores != null){
      this.selectedShopId = this.stores[0].shopId;
    }
    this.getPresentations();
  }

  updateSorting(){
    this.sorting=!this.sorting;
    if(this.sorting == true){
      this.reorder_list_button_name = "Back to original view"
    }else{
      this.reorder_list_button_name = "Reorder List"
    }
  }
  openDialog(presentation, itemPresentationIndex) {
    let addDialogPresentation = this.dialog.open(AddItemToPresentation, {
      height: '75%',
      width: '50%',
      data: { presentation: presentation, itemPresentationIndex: itemPresentationIndex, shopId : this.selectedShopId }
    });
    addDialogPresentation.afterClosed().subscribe((data) => {
      if (data !== undefined && data !== null) {
        console.log('Presentation Index', this.presentations.indexOf(presentation))
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
    this._presentationService.getPresentations(this.selectedShopId).subscribe((data: any) => {
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
    let items = item;
    let dialogRef = this.dialog.open(ComboItemModalComponent, {
      data: {
        item: items,
        shopId : this.selectedShopId
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

  displayedColumns = ['activate', 'id', 'name', 'sku', 'basePrice', 'defaultPrice', 'tags', 'expand'];

  openItemFlow(item) {

  }

  createPresentation() {
    const dialogRef = this.dialog.open(CreatePresentationComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        console.log(result);
        let presentation = { name: result.name, description: result.description, shopId: this.selectedShopId, type: result.presentationType, itemPresentations: [] };
        presentation.itemPresentations.push({ type: result.itemPresentationType });
        this.loading = true;
        this._presentationService.addPresentation(presentation).subscribe((data) => {
          console.log(data);
          this.presentations.push(data.presentation);
          console.log(this.presentations);
          this.loading = false;
        }, (err) => {
          console.log(err);
          this.loading = false;
        });


      }
    });
  }

  saveOrder() {
    let presentationIds = this.presentations.map((eachPresentation: any) => {
      return eachPresentation.id;
    })
    console.log(presentationIds);
    this.loading = true;
    this._presentationService.orderPresentation(presentationIds).subscribe((data: any) => {
      this.loading = false;
      this.snackBar.open('Presentations ordered successfully', 'OK')
      this.presentations = data;
      console.log(data);
    }, (err) => {
      this.loading = false;
      this.snackBar.open('Error in Ordering Presentations', 'OK')

    })
  }


  updatePresentation(presentation: any) {
    this.loading = true;
    this._presentationService.updatePresentation(presentation).subscribe(
      response => {
        this.loading = false;
        if (response.success) {
        } else {
          this.snackBar.open(response.message, "Close");
        }

      }, (err) => {
        this.loading = false;
        this.snackBar.open("Error in updating status", "Close");
      })
  }

}


@Component({
  selector: 'addItemToPresentation',
  templateUrl: './addItemToPresentation.html',
  providers: [PresentationsService]
})
export class AddItemToPresentation implements OnInit {

  items = []
  loading: boolean = false;
  selectedItems = []
  selectedItemsDataSource = new MatTableDataSource(this.selectedItems)
  selectedItemsDisplayedColumns = ['id', 'name', 'sku', 'basePrice', 'delete'];
  constructor(
    public dialogRef: MatDialogRef<AddItemToPresentation>,
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
    let request: CatalogueSearchRequest = { 'shopId': this.data.shopId.toString(), "name": searchParam }

    this.loading = true;
    let searchObservable = this._presentationsService.searchItem(request).subscribe(response => {
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
    let chosenItemPresentation;
    presentationRequest.itemPresentations.forEach((itemPresentation, index) => {
      if (index == this.data.itemPresentationIndex) {
        if (itemPresentation.itemIds == undefined || itemPresentation.itemIds == null) {
          itemPresentation.itemIds = []
        }
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
      this._presentationsService.updatePresentation(presentationRequest).subscribe(
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
  providers: [PresentationsService]
})
export class CreatePresentationComponent {

  name: string = '';
  presentationType: string = 'STATIC';
  itemPresentationType: string = 'STATIC';
  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreatePresentationComponent>, private _presentationsService: PresentationsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPresentation() {
    if (this.name.trim() == '') {
      console.log(this.name + " " + this.presentationType)
      return;
    }

    let data = {
      name: this.name,
      description: this.description,
      presentationType: this.presentationType,
      itemPresentationType: this.itemPresentationType
    }
    this.dialogRef.close(data);
  }

}
