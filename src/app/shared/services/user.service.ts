import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_API_USER } from '../configs/endpoint.common';
import { IUser } from '../models/IUser';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUsers: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  defaultUser(){
    this.listUsers.next([]);
  }

  /**
   * Usuarios
   */

  getListUsers() {
    const baseUri = environment.serviceUrl + URL_API_USER.users;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execGetJson().pipe();
  }

  sendNewUser(documentNumber: string, fullName: string,
              role: string, companyId: string, sector: string) {
    const request = {
      documentNumber,
      fullName,
      role,
      companyId,
      sector
    };
    const body: string = JSON.stringify(request);
    const baseUri = environment.serviceUrl + URL_API_USER.users;
    this.apiService.setBaseUriApi(baseUri);
    // return this.http.get("./assets/json/newuser.mock.json").pipe();
    return this.apiService.execPostJson(body).pipe();
  }

  setListUsers(listUsers: IUser[]) {
    this.listUsers.next(listUsers);
    // this.storageService.setData('listUsers', JSON.stringify(listUsers));
  }

}
