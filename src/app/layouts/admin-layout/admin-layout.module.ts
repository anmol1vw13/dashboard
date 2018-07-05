import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AdminLayoutRoutes } from './admin-layout.routing';

import {MatExpansionModule} from '@angular/material/expansion';
import { HotTableModule } from '@handsontable/angular';
import {OrganizationChartModule} from 'primeng/organizationchart';




import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatFormField,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatCardModule,
  MatListModule,
  MatSnackBarModule,
  MatDividerModule,
  MatProgressBarModule,
  MatCheckboxModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { PresentationsComponent, AddItemToPresentation, CreatePresentationComponent } from '../../presentations/presentations.component';
import { BulkuploadComponent, ErrorDialog } from '../../bulkupload/bulkupload.component';
import { ComboitemComponent, ItemComponent, OptionComponent, ComboItemModalComponent } from '../../comboitem/comboitem.component';
import { TreeModule } from 'angular-tree-component';
import { SortablejsModule } from 'angular-sortablejs/dist';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    HotTableModule.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressBarModule,
    TreeModule,
    OrganizationChartModule,
    MatCheckboxModule,
    SortablejsModule
    ],
  entryComponents: [
    AddItemToPresentation,
    ErrorDialog,
    ItemComponent,
    OptionComponent,
    CreatePresentationComponent,
    ComboItemModalComponent,
  ],
  declarations: [
    PresentationsComponent,
    BulkuploadComponent,
    AddItemToPresentation,
    ErrorDialog,
    ComboitemComponent,
    ItemComponent,
    OptionComponent,
    CreatePresentationComponent,
    ComboItemModalComponent
  ],
})

export class AdminLayoutModule {}
