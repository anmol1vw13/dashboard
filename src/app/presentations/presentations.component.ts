import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { PresentationsService } from './presentations.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss'],
  providers:[PresentationsService]
})
export class PresentationsComponent implements OnInit {

  shopId:number = 407;
  presentations = ""
  constructor(public _presentationService:PresentationsService) {

  }

  ngOnInit() {
    this.getPresentations();
  }

  getPresentations(){
    
    this._presentationService.getPresentations(this.shopId).subscribe((data:any)=>{
        this.presentations = data;
    })
  }

  expand(item){
    console.log(item)
  }


  deleteItemFromPresentation(presentationId:string, itemId:number){
    alert(presentationId+","+itemId);
  }

  displayedColumns = ['id', 'name','sku', 'basePrice', 'defaultPrice','expand'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

}
