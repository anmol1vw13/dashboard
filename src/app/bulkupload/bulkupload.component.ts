import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BulkUploadService } from './bulkupload.service';
import { MatSnackBar } from '@angular/material';
import { AdminLayoutService } from '../layouts/admin-layout/admin-layout.service';



@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BulkUploadService]
})
export class BulkuploadComponent implements OnInit {

  instance: string = 'hot';
  mandatoryColumns = ['Product Name*', 'Category*', 'Sku*', 'Product MRP*', 'Shop Price*', 'CGST Rate (%)*', 'SGST Rate (%)*']
  colHeaders = ['Product Name*', 'Product Description', 'Category*', 'Sku*', 'Product MRP*', 'Shop Price*', 'CGST Rate (%)*', 'SGST Rate (%)*', 'HSN Code', 'Tags', 'Presentation Header'];
  colWidths = ['200', '200', '150', '150', '150', '150', '150', '150', '150', '200', '200']
  dataset: any[] = []
  saving: boolean = false;
  stores : any[] = []
  selectedShopId : any = '';

  errMsgs: any[] = [];

  options: any = {
    stretchH: 'all',
    minSpareRows: 1,
    currentRowClassName: 'currentRow',
    currentColClassName: 'currentCol',

    columns: [
      {
        data: 'productName',
        type: 'text'
      },
      {
        data: 'productDescription',
        type: 'text'

      },
      {
        data: 'category',
        type: 'text'

      },
      {
        data: 'sku',
        type: 'text'

      },
      {
        data: 'productMrp',
        type: 'numeric',
        numericFormat: {
          pattern: '0,0.00',
        },
        allowInvalid: false

      },
      {
        data: 'shopPrice',
        type: 'numeric',
        numericFormat: {
          pattern: '0,0.00',
        },
        allowInvalid: false


      },
      {
        data: 'cgst',
        type: 'numeric',
        numericFormat: {
          pattern: '0,0.00',
        },
        allowInvalid: false


      },
      {
        data: 'sgst',
        type: 'numeric',
        numericFormat: {
          pattern: '0,0.00',
        },
        allowInvalid: false


      },
      {
        data: 'hsn',
        type: 'text',

      },
      {
        data: 'tags',
        type: 'text'

      },
      {
        data: 'presentationHeader',
        type: 'text'

      }
    ]

  }

  constructor(private hotRegisterer: HotTableRegisterer, public dialog: MatDialog, public bulkUploadService: BulkUploadService, public snackBar: MatSnackBar, public _adminLayoutService: AdminLayoutService) { }

  ngOnInit() {
    this.instatiateEmptyData();
    this.stores = this._adminLayoutService.getListOfStores();
    if (this.stores != null) {
      this.selectedShopId = this.stores[0].shopId;
    }
  }

  instatiateEmptyData() {
    this.dataset = [];
    for (let i = 0; i < 25; i++) {
      this.dataset.push({ 'productName': '', 'productDescription': '', 'category': '', 'sku': '', 'productMrp': '', 'shopPrice': '', 'cgst': '', 'sgst': '', 'hsn': '', 'tags': '', 'presentationHeader': '' })

    }

  }

  saveData() {
    this.validateData();
  }

  validateData() {

    this.errMsgs = [];
    this.saving = false;
    let itemPostArr = [];

    let hotConst = this.hotRegisterer.getInstance(this.instance);

    for (let rowNum = 0; rowNum < hotConst.getSourceData().length; rowNum++) {

      if (!hotConst.isEmptyRow(rowNum)) {
        let eachItemObj: any = JSON.parse(JSON.stringify(hotConst.getSourceDataAtRow(rowNum)));
        eachItemObj.tags = eachItemObj.tags == '' ? [] : eachItemObj.tags.split(',')
        itemPostArr.push(eachItemObj);
        for (let columnNum = 0; columnNum < this.colHeaders.length; columnNum++) {
          if ((hotConst.getDataAtCell(rowNum, columnNum) === undefined || hotConst.getDataAtCell(rowNum, columnNum) === null ||
            hotConst.getDataAtCell(rowNum, columnNum).toString().trim().length == 0) && this.mandatoryColumns.indexOf(this.colHeaders[columnNum]) != -1) {
            let errObj = { errMsg: this.colHeaders[columnNum].replace('*', '') + ' is missing at Row Number: ' + (rowNum + 1), rowNum: rowNum, columnNum: columnNum }
            this.errMsgs.push(errObj);
          }

        }

      }

    }

    console.log(this.errMsgs);

    if (this.errMsgs.length > 0) {
      this.openErrorDialog();
    } else {
      if (itemPostArr.length > 0) {
        this.saving = true;
        this.uploadItems(itemPostArr);
      } else {
        let snackBarRef = this.snackBar.open('No Items are entered', 'OK');

      }
    }


  }

  openErrorDialog() {
    const dialogRef = this.dialog.open(ErrorDialog, {
      data: { errData: this.errMsgs }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if (result != null) {
        this.goToCell(result);
      }
    });

  }

  goToCell(errObj) {
    let hotConst = this.hotRegisterer.getInstance(this.instance);
    hotConst.selectCell(errObj.rowNum, errObj.columnNum);
  }


  uploadItems(itemPostArr) {

    let shopId: number = 407;

    this.bulkUploadService.uploadItemsInBulk(shopId, itemPostArr).subscribe((data: any) => {
      this.saving = false;
      if (data.success) {
        let snackBarRef = this.snackBar.open(data.message, 'OK');
        this.instatiateEmptyData();
      } else {
        let snackBarRef = this.snackBar.open(data.message, 'OK');
      }
    }, (err: any) => {
      let snackBarRef = this.snackBar.open('Error in saving items', 'OK');
    })
  }

}

@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.html',
})
export class ErrorDialog {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  clickError(message) {
    this.dialogRef.close(message);
  }

}
