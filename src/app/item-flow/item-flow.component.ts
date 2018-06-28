import { Component, OnInit, Inject } from '@angular/core';
import { TREE_ACTIONS, IActionMapping } from 'angular-tree-component';
import {MAT_DIALOG_DATA} from '@angular/material';




@Component({
  selector: 'app-item-flow',
  templateUrl: './item-flow.component.html',
  styleUrls: ['./item-flow.component.scss']
})
export class ItemFlowComponent implements OnInit {

  selectedNode: any;
  allNodes : any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  nodes : any[] =[]

  actionMapping: IActionMapping = {
    mouse: {
      dblClick: (tree, node, $event) => // Open a modal with node content,
        this.selectedNode = node.data
    }
  }
  options = {
    actionMapping: this.actionMapping
  };

  ngOnInit() {
    console.log(this.data)
    this.data.item.children = this.getNestedChildren(this.data.item.options)
    let array = [];
    array.push(this.data.item);
    console.log(this.nodes);
    console.log(array);
    this.nodes = array;
  }


  getNestedChildren(items) {
      for(let eachItem of items){
        eachItem.children = [];
        if(eachItem.type == 'ITEM'){
          if(eachItem.options!=null){
            eachItem.children.push(this.getNestedChildren(eachItem.options))
          } else {
            return eachItem;
          }
        } else {
          if(eachItem.items!=null){
            eachItem.children.push(this.getNestedChildren(eachItem.items))
          } else {
            return eachItem
          }
        }
    }
    return items;

    //console.log(this.data.item);
}

  onFocus(event) {
    console.log(event);
  }


}
