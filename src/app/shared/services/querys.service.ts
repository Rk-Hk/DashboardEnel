import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { URL_API_DASHBOARD } from '../configs/endpoint.common';
import { IFormFiltersDashboard } from '../models/IForms.interface';

@Injectable({
  providedIn: 'root'
})
export class QuerysService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient) { }


  getListFaultsType() {
    return this.http.get("./assets/Mocks/tipofallalist.json").pipe();
  }

  getListFeeders() {
    return this.http.get("./assets/Mocks/listFeedersResponse.json").pipe();
  }

  uploadInspectionsExcel(file :File) : Observable<any> {
    const urlUpload = `${environment.serviceDashboard}${URL_API_DASHBOARD.uploadExcel}`
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.apiService.execPostFormDataBlob(urlUpload, formdata);
    
  }


  apiGetDataInspectionsDashboard = (filtersData: IFormFiltersDashboard, typeChart:number) => {
    let payload:IPayloadGetData = {}
    filtersData.filterCausa ? payload.reason = filtersData.filterCausa: null
    filtersData.filterResponsable ? payload.reasonFounder = filtersData.filterResponsable: null
    filtersData.filterTypeFault ? payload.faultType = filtersData.filterTypeFault: null
    filtersData.filterFeederFault ? payload.feeder = filtersData.filterFeederFault: null
    
    typeChart ? payload.typeChart=typeChart : null;

    if(filtersData.filterRangeDate){
      payload.startFault = filtersData.filterRangeDate.startDate.format('DD/MM/YYYY');
      payload.endFault = filtersData.filterRangeDate.endDate.format('DD/MM/YYYY');
    } 
    console.log("FILTERS DATA : ", payload);

    const urlgetData = `${environment.serviceDashboard}${URL_API_DASHBOARD.getDataDashboard}`;
    this.apiService.setBaseUriApi(urlgetData);
    return this.apiService.execGetJsonWithParams(payload);
  }

  /** Trabajar con fechas  */

  getCantMothsBetweenDates = (startDate: moment.Moment, endDate: moment.Moment) => {
    return endDate.diff(startDate, 'months');
  }

  getMonthsBetweenDates = (startDate: moment.Moment, endDate: moment.Moment) => {
    var timeValues = [];
    while (endDate > startDate || startDate.format('M') === endDate.format('M')) {
      timeValues.push(startDate.format('YYYY-MM'));
      startDate.add(1,'month');
    }
    console.log("LIST ADE MESES : ", timeValues);
    return timeValues
    
  }
}

export interface IPayloadGetData {
  reason?: string,
  faultType?: string,
  reasonFounder?: string,
  startFault?: Date,
  endFault?: Date,
  feeder?: string,
  typeChart?: number
}

