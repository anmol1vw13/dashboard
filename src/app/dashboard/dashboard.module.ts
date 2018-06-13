import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CatalogueComponent } from "../catalogue/catalogue.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatRippleModule, MatInputModule, MatTooltipModule, MatFormFieldModule, MatOptionModule, MatSelectModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { DashboardRoutes } from "./dashboard.routing";

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
        HttpClientModule],
    declarations: [
        CatalogueComponent
    ]
})

export class DashboardModule { }