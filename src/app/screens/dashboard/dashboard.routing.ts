import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_DASHBOARD } from 'src/app/shared/configs/constant.common';
import { ClimbBaseKpiComponent } from './content/config-screens/climb-base-kpi/climb-base-kpi.component';
import { ManageCompanyComponent } from './content/config-screens/manage-company/manage-company.component';
import { ManageUsersComponent } from './content/config-screens/manage-users/manage-users.component';
import { DashboardContentComponent } from './content/dashboard-content/dashboard-content.component';
import { DmsInspectionComponent } from './content/dms-inspection/dms-inspection.component';
import { DmsDatastudioComponent } from './content/dms-inspection/screens/dms-datastudio/dms-datastudio.component';
import { DmsStructureInfoComponent } from './content/dms-inspection/screens/dms-structure-info/dms-structure-info.component';


const routes: Routes = [
  { path: ROUTE_DASHBOARD.path_dms_inspections , component: DmsInspectionComponent },
  { path: ROUTE_DASHBOARD.path_dms_datastudio, component: DmsDatastudioComponent},
  { path: ROUTE_DASHBOARD.path_dashboardKPI , component: DashboardContentComponent},

  { path: ROUTE_DASHBOARD.path_config_upload_file , component: ClimbBaseKpiComponent},
  { path: ROUTE_DASHBOARD.path_config_manage_users , component: ManageUsersComponent},
  { path: ROUTE_DASHBOARD.path_config_manage_companies , component: ManageCompanyComponent},
  { path: ROUTE_DASHBOARD.path_dms_structuresInfo + '/:idstruc', component: DmsStructureInfoComponent},
  // { path: '**', component:  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
