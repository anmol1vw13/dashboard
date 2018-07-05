import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { StoreCloneService } from './storeclone.service';

@Component({
  selector: 'app-storeclone',
  templateUrl: './storeclone.component.html',
  styleUrls: ['./storeclone.component.scss'],
  providers: [StoreCloneService]
})
export class StorecloneComponent implements OnInit {

  constructor(public snackbar : MatSnackBar, public storeCloneService : StoreCloneService) { }

  stores: any[] = [
    {value: '407', viewValue: 'KFC Indiranagar'},
    {value: '411', viewValue: 'KFC Koramangala'},
  ];

  sourceStore : any = '';
  targetStore : any = '';
  loading : boolean = false;

  ngOnInit() {
  }

  startCopying(){
    
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
