import { Component, OnInit, Inject, Pipe, PipeTransform, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
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
  styleUrls: ['./comboitem.component.scss']
})
export class ComboitemComponent implements OnInit {

  constructor(public dialog: MatDialog, private sharedService: SharedService) {
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
  openItemDialog() {

    const dialogRef = this.dialog.open(ItemComponent, {
      data: {
        selectedParentProp: this.selectedParentProp,
        props: this.props
      }
    })

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != undefined) {
          console.log("Dialog output:", data)
          this.addToProps(data);
        }
      }
    );
  }


  addToProps(propToAdd) {

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

  openOptionDialog() {
    const dialogRef = this.dialog.open(OptionComponent, {
      data: {
        selectedParentProp: this.selectedParentProp,
        props: this.props
      }
    })
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if (data != undefined)
          this.addToProps(data);
      }
    );
  }

  selectedPropViaEvent(event: any) {
    console.log(event);
    let prop = event.node;
    this.selectedProp(prop);
  }

  selectedProp(prop) {
    if (prop.type == "ITEM") {
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
    this.createForm();
  }

  ngOnInit() {
    console.log(this.data);
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      basePrice: ['0'],
      mrp:['0'],
      sku: [''],
      barcodeId: ['']
    })
  }


  saveItem() {
    let item = new ComboItem()
    item.name = this.itemForm.get('name').value;
    item.barcodeId=this.itemForm.get('barcodeId').value;
    item.sku=this.itemForm.get('sku').value;
    item.mrp=this.itemForm.get('mrp').value;
    item.basePrice=this.itemForm.get('basePrice').value;
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
    this.createForm();
  }

  ngOnInit() {
    console.log(this.data);
    //this.createForm();
  }

  createForm() {
    this.optionForm = this.formBuilder.group({
      name: ['', Validators.required]
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


