import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CatalogueComponent } from "../catalogue/catalogue.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatRippleModule, MatInputModule, MatTooltipModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatListModule, MatCardModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { DashboardRoutes } from "./dashboard.routing";
import { CatalogueItemsComponent } from "../catalogue-items/catalogue-items.component";
import { MatTableModule } from '@angular/material/table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ItemFlowComponent } from "../item-flow/item-flow.component";
import { TreeModule } from 'angular-tree-component';
import { BrowserTransferStateModule } from "@angular/platform-browser";


@NgModule({
    imports: [CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        HttpClientModule,
        MatTableModule,
        Ng2SmartTableModule,
        MatAutocompleteModule,
        MatListModule,
        ReactiveFormsModule,
        MatCardModule,
        TreeModule,
    ],
    entryComponents:[
        ItemFlowComponent
    ],
    declarations: [
        CatalogueComponent,
        CatalogueItemsComponent,
        ItemFlowComponent
    ]
})

export class DashboardModule { }