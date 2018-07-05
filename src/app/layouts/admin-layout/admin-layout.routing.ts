import { Routes } from '@angular/router';
import { PresentationsComponent } from '../../presentations/presentations.component';
import { BulkuploadComponent } from '../../bulkupload/bulkupload.component';
import { ComboitemComponent } from '../../comboitem/comboitem.component';


export const AdminLayoutRoutes: Routes = [
    {
        path: 'presentations',
        component: PresentationsComponent,
      },
      {path : 'bulkupload', component: BulkuploadComponent},
      {path : 'comboitem', component: ComboitemComponent},
];
