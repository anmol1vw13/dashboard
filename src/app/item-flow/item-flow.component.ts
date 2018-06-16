import { Component, OnInit } from '@angular/core';
import { TREE_ACTIONS, IActionMapping } from 'angular-tree-component';



@Component({
  selector: 'app-item-flow',
  templateUrl: './item-flow.component.html',
  styleUrls: ['./item-flow.component.scss']
})
export class ItemFlowComponent implements OnInit {

  selectedNode: any;

  nodes = [
    {
      id: 1,
      name: 'Thali', "mrp": 100, "sellingPrice": 95,
      children: [
        {
          id: 2, name: 'North Indian Thali', "mrp": 95, "sellingPrice": 90, children: [
            {
              id: 5, name: "Roti", "mrp": 100, "sellingPrice": 95, children: [
                {
                  id: 8, name: "Butter Naan", "mrp": 80, "sellingPrice": 75,
                },
                {
                  id: 9, name: "Butter Roti", "mrp": 71, "sellingPrice": 69,
                }
              ]
            }, {
              id: 6, name: "Sweets", "mrp": 100, "sellingPrice": 95, children: [
                { id: 10, name: "Gulab Jamun", "mrp": 20, "sellingPrice": 18, },
                { id: 11, name: "Rasagulla", "mrp": 30, "sellingPrice": 17, }
              ]
            }, {
              id: 7, name: "Starters", "mrp": 50, "sellingPrice": 45,
            }
          ]
        },
        { id: 3, name: 'South Indian Thali', "mrp": 70, "sellingPrice": 65, }
      ]
    }
  ];

  actionMapping: IActionMapping = {
    mouse: {
      dblClick: (tree, node, $event) => // Open a modal with node content,
        this.selectedNode = node.data
    }
  }
  options = {
    actionMapping: this.actionMapping
  };

  constructor() { }

  ngOnInit() {
  }

  onFocus(event) {
    console.log(event);
  }


}
