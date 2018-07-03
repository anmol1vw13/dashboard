import { Component, OnInit, Inject, Pipe, PipeTransform, Injectable, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Item } from '../catalogue/catalogue.model';
import { ComboItem, ComboOption } from './comboitem.model';
import { forEach } from '@angular/router/src/utils/collection';
import { forwardRef, Input } from '@angular/core'
import { IActionMapping } from 'angular-tree-component';

@Injectable()
export class SharedService {

  component: ComboitemComponent;
  constructor() { }
}

@Component({
  selector: 'prop-item',
  template: `
  
  <div style = "display:table-cell;overflow:hidden;" >
    <div style="height:100%;margin-bottom: 15%;" *ngFor="let childProp of prop.children">
    <span *ngIf="childProp.type == 'ITEM'">
    <button mat-flat-button (click)="selectedProp(childProp)" color="warn">{{childProp.name}}</button>
    </span>
    <span *ngIf="childProp.type == 'OPTION'">
        <button mat-flat-button (click)="selectedProp(childProp)" color="primary">{{childProp.name}}</button>
    </span>
      <prop-item  [prop]="childProp"></prop-item>
    </div>
  </div> 
`
})
export class PropItem {
  @Input() prop;

  constructor(private sharedService: SharedService) {

  }

  selectedProp(prop) {
    if (this.sharedService.component) {
      this.sharedService.component.selectedProp(prop);
    }
  }
}
@Component({
  selector: 'app-comboitem',
  templateUrl: './comboitem.component.html',
  styleUrls: ['./comboitem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComboitemComponent implements OnInit {

  constructor(public dialog: MatDialog, private sharedService: SharedService, public snackBar: MatSnackBar) {
    this.sharedService.component = this;
  }
  addItemShow = true;
  addOptionShow = false;
  selectedParentProp = null;
  props = [];


  ngOnInit() {
    this.addItemShow = true;
    this.addOptionShow = false;
    this.props = [];
  }

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => // Open a modal with node content,
        this.selectedProp(node.data)
    }
  }
  openItemDialog(edit) {

    const dialogRef = this.dialog.open(ItemComponent, {
      data: {
        selectedParentProp: this.selectedParentProp,
        props: this.props,
        edit: edit
      }
    })

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != undefined) {

          if (edit) {
            this.selectedParentProp.name = data.name,
              this.selectedParentProp.description = data.description,
              this.selectedParentProp.barcodeId = data.barcodeId,
              this.selectedParentProp.sku = data.sku,
              this.selectedParentProp.mrp = data.mrp,
              this.selectedParentProp.basePrice = data.basePrice
          } else {
            console.log("Dialog output:", data)
            this.addToProps(data);
          }
        }
      }
    );
  }


  addToProps(propToAdd) {

    if (propToAdd.children === undefined || propToAdd.children === null) {
      propToAdd.children = [];
    }

    if (this.selectedParentProp == null) {
      this.props.push(propToAdd);
      this.selectedProp(propToAdd);
    } else {
      if (this.selectedParentProp.children == null) {
        this.selectedParentProp.children = []
      }
      this.selectedParentProp.children.push(propToAdd);
    }
  }

  showItem() {
    this.addOptionShow = false;
    this.addItemShow = true;
  }

  showOption() {
    this.addItemShow = false;
    this.addOptionShow = true;
  }

  openOptionDialog(edit) {
    const dialogRef = this.dialog.open(OptionComponent, {
      data: {
        selectedParentProp: this.selectedParentProp,
        props: this.props,
        edit: edit
      }
    })
    dialogRef.afterClosed().subscribe(
      data => {
        if (data != undefined) {
          if (edit) {
            this.selectedParentProp.name = data.name;
            console.log(this.props);
          } else {
            console.log("Dialog output:", data)
            this.addToProps(data);
          }
        }
      }
    );
  }

  selectedPropViaEvent(event: any) {
    console.log(event);
    let prop = event.node;
    this.selectedProp(prop);
  }

  selectedProp(prop) {

    if (prop == undefined || prop == null) {
      this.showItem();
    }
    else if (prop.type == "ITEM") {
      this.showOption();
    } else if (prop.type == "OPTION") {
      this.showItem();
    }
    this.selectedParentProp = prop;
  }


  getPropValues() {
    return this.props.values();
  }

  saveProps() {

    if (this.validateProps()) {
      console.log('Saving');
      this.convertPropsChildren(this.props);
      console.log(JSON.stringify(this.props));
    }
  }

  validateProps() {
    let checkStatus = false;
    checkStatus = this.checkIfOptionHasItem(this.props[0], true);
    return checkStatus
  }

  checkIfOptionHasItem(parent, status) {
    parent.children.filter((eachItem: any) => {
      if (eachItem.type == 'OPTION') {
        if (eachItem.children === undefined || eachItem.children === null || eachItem.children.length == 0) {
          let snackBarRef = this.snackBar.open('You cannot save an option without an item. Option name is ' + eachItem.name, 'OK');
          status = false;
          return;
        }
      }
      this.checkIfOptionHasItem(eachItem, status);
    })
    if (status) {
      return true;
    } else {
      return false;
    }
  }

  removeItemOrOption() {
    if (this.props[0].selfId === this.selectedParentProp.selfId) {
      this.props = [];
    } else {
      this.removeFromTree(this.props[0], this.selectedParentProp)
      this.selectedParentProp = this.props[0];
    }

    if (this.props.length > 0) {
      this.selectedProp(this.props[0]);
    }
    else {
      this.selectedProp(null);
    }


  }

  removeFromTree(parent, childNameToRemove) {
    parent.children.filter((eachItem: any, index) => {
      if (eachItem.selfId === childNameToRemove.selfId) {
        parent.children.splice(index);
      } else {
        this.removeFromTree(parent.children[index], childNameToRemove);
      }
    })
  }


  convertPropsChildren(props) {

    for (let prop of props) {
      if (prop.children == undefined || prop.children.length == 0) {
        continue;
      } else if (prop.type == 'ITEM') {
        prop.options.push(prop.children);
        this.convertPropsChildren(prop.options)
      } else if (prop.type == 'OPTION') {
        prop.items.push(prop.children);
        this.convertPropsChildren(prop.items);
      }
    }
  }

}

@Component({
  selector: "item.component",
  templateUrl: "./item.component.html"
})
export class ItemComponent implements OnInit {

  itemForm = new FormGroup({

  })


  constructor(
    public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    if (this.data.edit) {
      this.editForm()
    } else {
      this.createForm();
    }
    console.log(this.data);
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      basePrice: ['0'],
      mrp: ['0'],
      sku: [''],
      barcodeId: ['']
    })
  }

  editForm() {
    this.createForm();
    this.itemForm.setValue({
      name: this.data.selectedParentProp.name,
      description: this.data.selectedParentProp.description,
      barcodeId: this.data.selectedParentProp.barcodeId,
      sku: this.data.selectedParentProp.sku,
      mrp: this.data.selectedParentProp.mrp,
      basePrice: this.data.selectedParentProp.basePrice
    })
  }


  saveItem() {
    let item = new ComboItem()
    item.name = this.itemForm.get('name').value;
    item.description = this.itemForm.get('description').value;
    item.barcodeId = this.itemForm.get('barcodeId').value;
    item.sku = this.itemForm.get('sku').value;
    item.mrp = this.itemForm.get('mrp').value;
    item.basePrice = this.itemForm.get('basePrice').value;
    item.type = 'ITEM';
    item.selfId = UUID.UUID();
    if (this.data.selectedParentProp != null) {
      item.parentId = this.data.selectedParentProp.selfId;
    }
    this.dialogRef.close(item);
  }

}


@Component({
  selector: "ab.component",
  templateUrl: "./option.component.html"
})
export class OptionComponent implements OnInit {

  optionForm = new FormGroup({

  })
  constructor(
    public dialogRef: MatDialogRef<OptionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.edit) {
      this.editForm();
    } else {
      this.createForm();
    }
    //this.createForm();
  }

  createForm() {
    this.optionForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  editForm() {
    this.createForm();
    this.optionForm.setValue({
      name: this.data.selectedParentProp.name
    })
  }


  saveOption() {
    let option = new ComboOption()
    option.name = this.optionForm.get('name').value;
    option.type = 'OPTION';
    option.selfId = UUID.UUID();
    if (this.data.selectedParentProp != null) {
      option.parentId = this.data.selectedParentProp.selfId;
    }
    this.dialogRef.close(option);
  }


}


