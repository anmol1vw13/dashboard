import { Component, OnInit, Inject, Pipe, PipeTransform, Injectable, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { ComboItem, ComboOption, Parameter } from './comboitem.model';
import { Input } from '@angular/core'
import { IActionMapping } from 'angular-tree-component';
import { ComboitemService } from './comboitem.service';
import { AdminLayoutService } from '../layouts/admin-layout/admin-layout.service';



@Component({
  selector: 'app-comboitem',
  templateUrl: './comboitem.component.html',
  styleUrls: ['./comboitem.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ComboitemService]
})
export class ComboitemComponent implements OnInit {

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private _comboitemservice: ComboitemService, public _adminLayoutService : AdminLayoutService) {

  }
  addItemShow = true;
  addOptionShow = false;
  selectedParentProp = null;
  props = [];
  @Input('properties') properties: any;
  @Input('shopId') shopId: any;
  loading: boolean = false;
  stores : any[] = [];
  selectedShopId : any = '';
  editComboFromPresentation : boolean = false;

  ngOnInit() {
    this.addItemShow = true;
    this.addOptionShow = false;
    this.props = [];
    this.stores = this._adminLayoutService.getListOfStores();
    if(this.stores != null){
      this.selectedShopId = this.stores[0].shopId;
    }
    console.log(this.properties);
    if (this.properties != undefined && this.properties.length > 0) {
      this.props = this.properties;
      this.selectedProp(this.props[0]);
      this.selectedShopId = this.shopId;
      this.editComboFromPresentation = true;
    }
  }


  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => // Open a modal with node content,
        this.selectedProp(node.data)
    }
  }
  openItemDialog(edit) {
    console.log(this.selectedParentProp);

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
          console.log(data);
          console.log(this.selectedParentProp);

          if (edit) {
            this.selectedParentProp.name = data.name,
              this.selectedParentProp.description = data.description,
              this.selectedParentProp.barcodeId = data.barcodeId,
              this.selectedParentProp.sku = data.sku,
              this.selectedParentProp.mrp = data.mrp,
              this.selectedParentProp.basePrice = data.basePrice
            this.selectedParentProp.active = data.active;
            this.selectedParentProp.parameters = data.parameters;
            this.addStyle(this.selectedParentProp);
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

    if (this.selectedParentProp != null && this.selectedParentProp.children.length == 0 && propToAdd.type == 'ITEM') {
      propToAdd.defaultItem = true;
    }
    this.addStyle(propToAdd);
    if (this.selectedParentProp == null) {
      this.props.push(propToAdd);
      this.selectedProp(propToAdd);
    } else {
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
            this.selectedParentProp.active = data.active;
            this.addStyle(this.selectedParentProp);
          } else {
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

  addStyle(props) {
    if (props.defaultItem) {
      props.styleClass = 'department-cto';
    } else if (!props.active) {
      props.expanded = false;
      props.styleClass = 'inactive-item';
    } else {
      props.styleClass = '';
    }

  }



  selectedProp(prop) {

    console.log(prop);
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
      this.loading = true;
      this.convertPropsChildren(this.props);
      console.log(this.props);
      this._comboitemservice.addNestedItem(this.props[0], this.selectedShopId).subscribe(data => {
        this.loading = false;
        this.snackBar.open('Saved Successfully', 'OK');
      }, (err) => {
        this.loading = false;
        this.snackBar.open('Error in saving', 'OK');
      })
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
        parent.children.splice(index, 1);
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

        prop.options = prop.children;
        this.convertPropsChildren(prop.options)
      } else if (prop.type == 'OPTION') {
        prop.items = prop.children;
        this.convertPropsChildren(prop.items);
      }
    }
  }

}


@Component({
  selector: 'app-combomodalitem',
  template: `<button style="margin-left:95%; margin-bottom:1%;" mat-icon-button [mat-dialog-close]="true">
  <mat-icon>close</mat-icon>
  </button>
  <app-comboitem [properties]="props" [shopId]="shopId"></app-comboitem>`,
  styleUrls: ['./comboitem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComboItemModalComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<any>, public dialog: MatDialog, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    //this.sharedService.component = this;
  }

  props = [];
  shopId : any = '';

  getNestedChildren(items) {
    for (let eachItem of items) {
      eachItem.expanded = true;
      eachItem.children = [];
      eachItem.selfId = eachItem.id;
      if (eachItem.type == 'ITEM') {
        this.addStyle(eachItem);
        if (eachItem.options != null) {
          eachItem.children.push(this.getNestedChildren(eachItem.options))
        } else {
          return eachItem;
        }
      } else {
        eachItem.type = 'OPTION';
        this.addStyle(eachItem);
        if (eachItem.items != null) {
          eachItem.children.push(this.getNestedChildren(eachItem.items))
        } else {
          return eachItem
        }
      }
    }
    return items;
  }

  ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');
    this.dialogRef.disableClose = true;
    if (this.data !== undefined || this.data !== null) {
      this.shopId = this.data.shopId;
      this.data.item.selfId = this.data.item.id;
      this.data.item.expanded = true;
      if (this.data.item.options !== undefined && this.data.item.options !== null && this.data.item.options.length > 0) {
        this.data.item.children = this.getNestedChildren(this.data.item.options)
      } else {
        this.data.item.children = [];
      }
      this.addStyle(this.data.item);
      this.props.push(this.data.item);
    } else {
      this.props = [];
    }
  }

  addStyle(props) {
    if (props.type == 'ITEM' && props.defaultItem) {
      props.styleClass = 'department-cto';
    } else if (!props.active) {
      props.expanded = false;
      props.styleClass = 'inactive-item';
    } else {
      props.styleClass = '';
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

  itemTags: Array<Parameter> = [];
  constructor(
    public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    if (this.data.edit) {
      this.editForm();
    } else {
      this.createForm();
    }
    console.log(this.data);
  }


  addTags(event) {
    if (event.keyCode != 32)
      return;
    let tag = this.itemForm.get('tags').value;
    this.itemForm.patchValue({ 'tags': '' });
    if (tag == undefined || tag == null || tag.trim().length == 0) {
      return;
    }

    if (this.itemTags.indexOf(tag) == -1) {
      let parameter = new Parameter();
      parameter.name = tag;
      parameter.type = "TAG";
      this.itemTags.push(parameter);
    }
  }

  deleteTag(tag) {
    this.itemTags.splice(this.itemTags.indexOf(tag), 1);
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      basePrice: ['0'],
      mrp: ['0'],
      sku: [''],
      barcodeId: [''],
      tags: '',
      hsncode: ['rate2.5', Validators.required],
      cgst: [2.5, Validators.required],
      sgst: [2.5, Validators.required],
      active: [true]
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
      basePrice: this.data.selectedParentProp.basePrice,
      tags: '',
      hsncode: this.data.selectedParentProp.hsncode,
      cgst: this.data.selectedParentProp.cgst,
      sgst: this.data.selectedParentProp.sgst,
      active: this.data.selectedParentProp.active
    })

    if (this.data.selectedParentProp.parameters === undefined || this.data.selectedParentProp.parameters === null) {
      this.data.selectedParentProp.parameters = [];
    }
    this.itemTags = this.data.selectedParentProp.parameters;


  }


  saveItem() {
    let item = new ComboItem()
    item.name = this.itemForm.get('name').value;
    item.description = this.itemForm.get('description').value;
    item.barcodeId = this.itemForm.get('barcodeId').value;
    item.sku = this.itemForm.get('sku').value;
    item.mrp = this.itemForm.get('mrp').value;
    item.basePrice = this.itemForm.get('basePrice').value;
    item.hsncode = this.itemForm.get('hsncode').value;
    item.cgst = this.itemForm.get('cgst').value;
    item.sgst = this.itemForm.get('sgst').value;
    item.type = 'ITEM';
    item.selfId = UUID.UUID();
    item.parameters = this.itemTags;
    item.active = this.itemForm.get('active').value;


    if (this.data.selectedParentProp != null) {
      item.parentId = this.data.selectedParentProp.selfId;
    }
    if (this.data.selectedParentProp == undefined || this.data.selectedParentProp == null) {
      item.sellingType = "OPEN"
    } else {
      item.sellingType = "HIDDEN"
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
      name: ['', Validators.required],
      active: [true]
    })
  }

  editForm() {
    this.createForm();
    this.optionForm.setValue({
      name: this.data.selectedParentProp.name,
      active: this.data.selectedParentProp.active
    })
  }


  saveOption() {
    let option = new ComboOption()
    option.name = this.optionForm.get('name').value;
    option.type = 'OPTION';
    option.selfId = UUID.UUID();
    option.active = this.optionForm.get('active').value;
    if (this.data.selectedParentProp != null) {
      option.parentId = this.data.selectedParentProp.selfId;
    }
    this.dialogRef.close(option);
  }


}


