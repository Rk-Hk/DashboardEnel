import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmsInspectionComponent } from './content/dms-inspection/dms-inspection.component';
import { DashboardContentComponent } from './content/dashboard-content/dashboard-content.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { DmsDatastudioComponent } from './content/dms-inspection/screens/dms-datastudio/dms-datastudio.component';
import { ClimbBaseKpiComponent } from './content/config-screens/climb-base-kpi/climb-base-kpi.component';
import { ManageUsersComponent } from './content/config-screens/manage-users/manage-users.component';
import { ManageCompanyComponent } from './content/config-screens/manage-company/manage-company.component';
import { DmsStructureInfoComponent } from './content/dms-inspection/screens/dms-structure-info/dms-structure-info.component';
// import { ModalManageCompaniesComponent } from 'src/app/shared/components/modals/modal-manage-companies/modal-manage-companies.component';
// import { ModalUsersComponent } from 'src/app/shared/components/modals/modal-users/modal-users.component';

@NgModule({
  declarations: [DmsInspectionComponent,
    DashboardContentComponent, 
    DmsDatastudioComponent, 
    ClimbBaseKpiComponent, 
    ManageUsersComponent, 
    ManageCompanyComponent, DmsStructureInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class DashboardModule { }
