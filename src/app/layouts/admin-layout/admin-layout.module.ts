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
import { HotTableModule } from 'ng2-handsontable';



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
  MatSnackBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from '../../dashboard/dashboard.module';

import { PresentationsComponent, AddItemToPresentation } from '../../presentations/presentations.component';
import { BulkuploadComponent } from '../../bulkupload/bulkupload.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
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
    HotTableModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule
  ],
  entryComponents: [
    AddItemToPresentation
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
    AddItemToPresentation
  ]
})

export class AdminLayoutModule {}
