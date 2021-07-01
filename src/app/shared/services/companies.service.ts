import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { ICompany } from '../models/IUser';
import { URL_API_USER } from '../configs/endpoint.common';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  listCompanies: BehaviorSubject<ICompany[]> = new BehaviorSubject<ICompany[]>([]);

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  defaultCompanies(){
    this.listCompanies.next([]);
  }

  /**
   * Companies
   */

  setListCompanies(listCompanies: ICompany[]){
    this.listCompanies.next(listCompanies);
    // this.storageService.setData('listCompanies', JSON.stringify(listCompanies));
  }

  getListCompanies() {
    const baseUri = environment.serviceUrl + URL_API_USER.company;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execGetJson().pipe();
  }

  sendNewCompany(companyName: string){
    const request = { companyName };
    const body: string = JSON.stringify(request);
    const baseUri = environment.serviceUrl + URL_API_USER.company;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execPostJson(body).pipe();
  }
}
