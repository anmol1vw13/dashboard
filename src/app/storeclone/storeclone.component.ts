import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { StoreCloneService } from './storeclone.service';
import { AdminLayoutService } from '../layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-storeclone',
  templateUrl: './storeclone.component.html',
  styleUrls: ['./storeclone.component.scss'],
  providers: [StoreCloneService]
})
export class StorecloneComponent implements OnInit {

  constructor(public snackbar : MatSnackBar, public storeCloneService : StoreCloneService, private _adminLayoutService : AdminLayoutService) { }

  stores : any[] = [];
  sourceStore : any = '';
  targetStore : any = '';
  loading : boolean = false;

  ngOnInit() {
    this.stores = this._adminLayoutService.getListOfStores();
  }

  startCopying(){

    if(this.sourceStore.toString().trim().length == 0){
      this.snackbar.open('Source Store cannot be empty', 'OK');
      return;
    }

    if(this.targetStore.toString().trim().length == 0){
      this.snackbar.open('Target Store cannot be empty', 'OK');
      return;
    }
    
    if(this.sourceStore === this.targetStore){
      this.snackbar.open('Source and Target Store cannot be the same', 'OK');
      return;
    }

    this.loading = true;
    this.storeCloneService.storeClone(this.sourceStore,this.targetStore).subscribe((data : any)=>{
      this.loading = false;
      this.snackbar.open('Data Copied Successfully', 'OK');
      
    },(err)=>{
      this.loading = false;
      this.snackbar.open('Error in copying data', 'OK');

    })


  }

}
