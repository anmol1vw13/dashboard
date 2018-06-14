import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CatalogueComponent } from "../catalogue/catalogue.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatRippleModule, MatInputModule, MatTooltipModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatListModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { DashboardRoutes } from "./dashboard.routing";
import { CatalogueItemsComponent } from "../catalogue-items/catalogue-items.component";
import {MatTableModule} from '@angular/material/table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';




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
        MatListModule
    ],
    declarations: [
        CatalogueComponent,
        CatalogueItemsComponent
    ]
})

export class DashboardModule { }