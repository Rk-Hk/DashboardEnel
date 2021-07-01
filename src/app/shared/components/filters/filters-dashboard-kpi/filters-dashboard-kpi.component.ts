import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { IResponseDataDashboard } from '../../../models/IResponsesDashboard';
import { QuerysService } from '../../../services/querys.service';

@Component({
  selector: 'app-filters-dashboard-kpi',
  templateUrl: './filters-dashboard-kpi.component.html',
  styleUrls: ['./filters-dashboard-kpi.component.scss']
})
export class FiltersDashboardKpiComponent implements OnInit , OnChanges {
  @Input() filterModify: IFilterModify ;
  @Output() eventFiltersSelected: EventEmitter<any> = new EventEmitter<any>();

  filtersForm: FormGroup;
  selected: { startDate: moment.Moment; endDate: moment.Moment };

  listTiposFalla: Array<any> = [];
  listFeeders: Array<any> = [];
  
  

  listLabelsLinearChart: Array<any> = null;

  listResponsables: Array<any> = [
    { id: 1, desc: 'EDELNOR' },
    { id: 1, desc: 'TERCEROS' }
  ];

  constructor(private _formBuilder: FormBuilder,
    private queryService: QuerysService) {
    this.selected = {
      startDate: moment('02-10-2019'),
      endDate: moment('02-25-2019'),
    };
    // this.rangeSelected= this.selected;
   }
   
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterModify) {
      this.clearDataForm();
      this.filtersForm.get(this.filterModify.key).setValue(this.filterModify.value);
    }
  }

  ngOnInit() {
    this.buildFiltersForm();
    this.getListFaultsType();
    this.getListFeeders();
    this.sendDataFormFilters()
    // this.eventGetDataDashboardApi();
  }

  buildFiltersForm = () => {
    this.filtersForm = this._formBuilder.group({
      filterCausa: null,
      filterRangeDate : this.selected,
      filterTypeFault : null,
      filterResponsable : null,
      filterFeederFault : null,
    });

    // this.timerForm = this._formBuilder.group ({
    //   typeSelected : 1
    // })
  };

  // eventConsumeDataByClick = (filterForm:string ,valueClicked:string) => {
  //   this.clearDataForm();
  //   this.filtersForm.get(filterForm).setValue(valueClicked);
  //   this.eventGetDataDashboardApi();
  // }

  sendDataFormFilters = () => {
    this.eventFiltersSelected.emit({filterSelected: this.filtersForm.value})
  }

  eventConsumeDataBySelect = () => {
    
    this.filtersForm.get('filterCausa').setValue(null);
    this.sendDataFormFilters();
    // this.eventGetDataDashboardApi();
  }
  // $event.target.value

  saveCode = ($event) => console.log("VALOR ENVIADO : ", $event.target.value);
  
  
  // eventGetDataDashboardApi = () => {
  //   // this.loaderService.show()
  //   let cantMonths = this.queryService.getCantMothsBetweenDates(this.filtersForm.get('filterRangeDate').value.startDate, this.filtersForm.get('filterRangeDate').value.endDate);
  //   let typeChart = 1;
  //   if (cantMonths <= 2 ) {
  //     typeChart=1;
  //     // this.timerForm.get('typeSelected').setValue(1);
  //   }else {
  //     typeChart=2;
  //     // this.timerForm.get('typeSelected').setValue(2)
  //   }
  //   console.log("DATA FORM : ", this.filtersForm.value);
  //   this.queryService.apiGetDataInspectionsDashboard(this.filtersForm.value, typeChart).subscribe(
  //     (response: IResponseDataDashboard) => {
  //       // this.loaderService.hide()
  //       console.log("RESPONSE GET DATA : ", response);
  //       this.totalReasons = response.responseData.responseReason.sumTotal;
  //       this.totalFaultType = response.responseData.responseFaultType.sumTotal;
  //       this.listRankFaultType = response.responseData.responseFaultType.listFaultTyppe;
  //       this.listRankReason = response.responseData.responseReason.listReasons;

  //       this.dataFaultsByFeeder = response.responseData.responseFaultsByFeeder;
  //       this.dataFaultsByResponsable = response.responseData.responseReasonFounderCount;
  //       this.dataFaultsByDates = response.responseData.responseLinealChartInterruptionsdata;

  //       this.sumClientesAfectados= response.responseData.responseSumValues[0].sumClientsAfect 
  //       this.sumClientsHours= response.responseData.responseSumValues[0].sumClientsHours 
  //       let saTime= response.responseData.responseSumValues[0].averageTime;
  //       console.log("SATIME : ", saTime);
        
  //       this.sumTime = response.responseData.responseSumValues[0].sumTime ?response.responseData.responseSumValues[0].sumTime.toString() : null;
  //       this.sumTime = this.sumTime ? `${this.sumTime} h` : '-'
  //       this.sumAverageTime = saTime ? `${Number(saTime).toFixed(2)} h` :'-'; //this.sumAverageTime ? `${this.sumAverageTime} h` : 
        
  //       this.rangeSelected=this.filtersForm.get("filterRangeDate").value;

  //     },
  //     // error => this.loaderService.hide()
  //   );
  // }

  datesUpdated(range) {
    this.eventConsumeDataBySelect();
  }

  getListFaultsType = () => {
    this.queryService.getListFaultsType().subscribe(
      (response: any) => {
        this.listTiposFalla = response.RECORDS;
      }
    )
  }
  getListFeeders = () => {
    this.queryService.getListFeeders().subscribe(
      (response: any) => {
        console.log("RESPONSE : ", response);
        
        this.listFeeders = response.RECORDS.sort();
      }
    )
  }

  clearDataForm = () => {
    this.filtersForm.get('filterCausa').setValue(null);
    this.filtersForm.get('filterResponsable').setValue(null);
    this.filtersForm.get('filterTypeFault').setValue(null);
    this.filtersForm.get('filterFeederFault').setValue(null)
  }

}

export interface IFilterModify {
  key: string,
  value: string
}