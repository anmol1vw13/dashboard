import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.scss']
})
export class BulkuploadComponent implements OnInit {


  colHeaders = ['SKU', 'Name', 'MRP', 'Selling Price', 'GST Tax']

  colWidths = [200,200,200,200,200]

  data = [ 
    {'sku' : '123456', 'name': 'Item 1', 'mrp' : '50', 'sellingPrice' : '48', 'tax' : '5%'},
    {'sku' : '123456', 'name': 'Item 1', 'mrp' : '50', 'sellingPrice' : '48', 'tax' : '5%'},
    {'sku' : '123456', 'name': 'Item 1', 'mrp' : '50', 'sellingPrice' : '48', 'tax' : '5%'},
    {'sku' : '123456', 'name': 'Item 1', 'mrp' : '50', 'sellingPrice' : '48', 'tax' : '5%'},
    {'sku' : '123456', 'name': 'Item 1', 'mrp' : '50', 'sellingPrice' : '48', 'tax' : '5%'},

  ]

  columns : [
    {
      data : 'sku'
    },
    {
      data : 'name'
    },
    {
      data : 'mrp'
    },
    {
      data : 'sellingPrice'
    },
    {
      data : 'tax'
    }
  ]

  options : {
    stretchH : 'all'
  }

  constructor() { }

  ngOnInit() {
  }

}
