import { Route } from "@angular/compiler/src/core";
import { Routes } from "@angular/router";
import { CatalogueComponent } from "../catalogue/catalogue.component";


export const DashboardRoutes : Routes = [
    {path: '',component: CatalogueComponent},
    {path: 'addItem', component: CatalogueComponent}
]