import { Component, OnInit } from '@angular/core';
import { IFilterModify } from 'src/app/shared/components/filters/filters-dashboard-kpi/filters-dashboard-kpi.component';
import { IResponseDataDashboard } from 'src/app/shared/models/IResponsesDashboard';
import { QuerysService } from 'src/app/shared/services/querys.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {

  TITLE_VIEW: string = "Dashboard"

  /** Info para cards pequeños  */
  totalFaultType: Number = 0;
  totalReasons:Number = 0;
  /** Fin cards pequeños */

  /** Lista para ranking */
  listRankFaultType: Array<any> = []
  listRankReason: Array<any> = []
  /** Fin para ranking */

  /** Info sumas  */
  sumClientesAfectados: Number;
  sumTime: string;
  sumClientsHours: Number;
  sumAverageTime: string;
  /** Fin Sumas */
  /** Data de graficos */
  dataFaultsByFeeder: Array<any> = null
  dataFaultsByResponsable: Array<any> = null
  dataFaultsByDates: Array<any> = null
  
  rangeSelected: any = null;

  filterSelected: any ;
  filterModify: IFilterModify


  constructor( private queryService: QuerysService,
    private _sidebarService: SidebarService) { }

  ngOnInit() {
    this._sidebarService.setTitleHeader(this.TITLE_VIEW);
  }

  handleGetFiltersSelected = ($event) => {
    console.log("OUTPUT EVENT : ", $event);
    this.filterSelected = $event.filterSelected
    this.eventGetDataDashboardApi(this.filterSelected)
  }

  eventConsumeDataByClick = (filterForm:string ,valueClicked:string) => {
    this.sendFilterModify(filterForm, valueClicked);
    this.filterSelected[`${filterForm}`] = valueClicked;
    this.eventGetDataDashboardApi(this.filterSelected);
  }

  sendFilterModify = (filterForm:string ,valueClicked:string) => {
    this.filterModify={key: filterForm, value: valueClicked}
  }



  eventGetDataDashboardApi = (fitersForm) => {
    // this.loaderService.show()
    let cantMonths = this.queryService.getCantMothsBetweenDates(fitersForm.filterRangeDate.startDate, fitersForm.filterRangeDate.endDate);
    let typeChart = 1;
    if (cantMonths <= 2 ) {
      typeChart=1;
      // this.timerForm.get('typeSelected').setValue(1);
    }else {
      typeChart=2;
      // this.timerForm.get('typeSelected').setValue(2)
    }
    console.log("DATA FORM : ", fitersForm);
    this.queryService.apiGetDataInspectionsDashboard(fitersForm, typeChart).subscribe(
      (response: IResponseDataDashboard) => {
        // this.loaderService.hide()
        console.log("RESPONSE GET DATA : ", response);
        this.totalReasons = response.responseData.responseReason.sumTotal;
        this.totalFaultType = response.responseData.responseFaultType.sumTotal;
        this.listRankFaultType = response.responseData.responseFaultType.listFaultTyppe;
        this.listRankReason = response.responseData.responseReason.listReasons;

        this.dataFaultsByFeeder = response.responseData.responseFaultsByFeeder;
        this.dataFaultsByResponsable = response.responseData.responseReasonFounderCount;
        this.dataFaultsByDates = response.responseData.responseLinealChartInterruptionsdata;

        this.sumClientesAfectados= response.responseData.responseSumValues[0].sumClientsAfect 
        this.sumClientsHours= response.responseData.responseSumValues[0].sumClientsHours 
        let saTime= response.responseData.responseSumValues[0].averageTime;
        console.log("SATIME : ", saTime);
        
        this.sumTime = response.responseData.responseSumValues[0].sumTime ?response.responseData.responseSumValues[0].sumTime.toString() : null;
        this.sumTime = this.sumTime ? `${this.sumTime}` : '-'
        this.sumAverageTime = saTime ? `${Number(saTime).toFixed(2)}` :'-'; //this.sumAverageTime ? `${this.sumAverageTime} h` : 
        
        this.rangeSelected=fitersForm.filterRangeDate;

      },
      // error => this.loaderService.hide()
    );
  }


}
