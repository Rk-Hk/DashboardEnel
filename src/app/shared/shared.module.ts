import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputPatternDirective } from './directives/input-pattern.directive';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CardDashboardKpiComponent } from './components/card-dashboard-kpi/card-dashboard-kpi.component'
import { RouterModule } from '@angular/router';
import { FiltersDashboardKpiComponent } from './components/filters/filters-dashboard-kpi/filters-dashboard-kpi.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressBarModule, MatRippleModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LoaderComponent } from './components/loader/loader.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { PieGraphicComponent } from './components/graphics/pie-graphic/pie-graphic.component';
import { LinearGraphicComponent } from './components/graphics/linear-graphic/linear-graphic.component';
import { FiltersDmsComponent } from './components/filters/filters-dms/filters-dms.component';
import { ModalUsersComponent } from './components/modals/modal-users/modal-users.component';
import { ModalManageCompaniesComponent } from './components/modals/modal-manage-companies/modal-manage-companies.component';
import { ModalAddStructureComponent } from './components/modals/modal-add-structure/modal-add-structure.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    InputPatternDirective, 
    SidebarComponent, 
    CardDashboardKpiComponent, 
    FiltersDashboardKpiComponent, 
    LoaderComponent, 
    PieGraphicComponent, 
    LinearGraphicComponent, 
    FiltersDmsComponent,
    ModalUsersComponent,
    ModalManageCompaniesComponent, 
    ModalAddStructureComponent
  ],
  exports: [
    InputPatternDirective, 
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    CardDashboardKpiComponent ,
    FiltersDashboardKpiComponent,
    LoaderComponent,
    PieGraphicComponent,
    LinearGraphicComponent,
    FiltersDmsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatProgressBarModule,
    NgxDaterangepickerMd.forRoot(),
    ChartsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    // MatButtonToggleModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  entryComponents: [ModalUsersComponent, ModalManageCompaniesComponent, ModalAddStructureComponent],
  providers: [
    ThemeService
  ]
})
export class SharedModule { }
