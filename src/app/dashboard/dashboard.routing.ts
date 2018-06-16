import { Route } from "@angular/compiler/src/core";
import { Routes } from "@angular/router";
import { CatalogueComponent } from "../catalogue/catalogue.component";
import { CatalogueItemsComponent } from '../catalogue-items/catalogue-items.component';
import { ItemFlowComponent } from "../item-flow/item-flow.component";


export const DashboardRoutes : Routes = [
    {path: '',component: CatalogueComponent},
    {path: 'addItem', component: CatalogueComponent},
    {path: 'viewItem', component: CatalogueItemsComponent},
    {path: 'itemFlow', component: ItemFlowComponent}
]
