import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

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
  MatProgressBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from '../../dashboard/dashboard.module';

import { PresentationsComponent, AddItemToPresentation } from '../../presentations/presentations.component';
import { BulkuploadComponent, ErrorDialog } from '../../bulkupload/bulkupload.component';
import { ComboitemComponent, ItemComponent, OptionComponent, PropItem, SharedService } from '../../comboitem/comboitem.component';
import { TreeModule } from 'angular-tree-component';

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
    DashboardModule,
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
    OrganizationChartModule
    ],
  entryComponents: [
    AddItemToPresentation,
    ErrorDialog,
    ItemComponent,
    OptionComponent
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    PresentationsComponent,
    BulkuploadComponent,
    AddItemToPresentation,
    ErrorDialog,
    ComboitemComponent,
    ItemComponent,
    OptionComponent,
    PropItem
  ],
  providers:[SharedService]
})

export class AdminLayoutModule {}
