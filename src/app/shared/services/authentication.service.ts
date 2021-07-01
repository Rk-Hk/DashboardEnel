import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { IUser } from '../models/IUser';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './user.service';
import { CompaniesService } from './companies.service';
import { environment } from 'src/environments/environment';
import { URL_API_LOGIN } from '../configs/endpoint.common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userModel: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  constructor(
    private router: Router,
    private apiService: ApiService,
    private storageService: StorageService,
    private userService: UserService,
    private companiesService: CompaniesService,
    public dialog: MatDialog
    ) { }

  validatedSignIn(documentNumber: string, password: string) {
    const request = {
      documentNumber,
      password
    };

    const body: string = JSON.stringify(request);
    const baseUri = environment.serviceUrl + URL_API_LOGIN.signIn;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execPostJson(body).pipe();
  }

  changePwd(newPassword: string, userId: number){
    const request = {
      newPassword,
      userId
    };

    const body: string = JSON.stringify(request);
    const baseUri = environment.serviceUrl + URL_API_LOGIN.changePassword;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execPostJson(body).pipe();
  }

  createTokenSession(token: string) {
    this.storageService.setData('token', JSON.stringify(token));
  }

  sessionEnd() {
    this.userService.defaultUser();
    this.companiesService.defaultCompanies();
    this.storageService.clearStorage();
  }

  /* {
    "responseCode": 1,
    "responseMessage": "Acceso denegado, contacte con el provedor del servicio"
} */

  isActiveToken(error: any){
    const messageError = 'Acceso denegado, contacte con el provedor del servicio';
    if(error.responseCode === 1 && error.responseMessage === messageError){
      this.sessionEnd();
      // Swal.fire({
      //   title: 'Error, sesión expirada!',
      //   text: 'La sesión ha expirado, por favor ingrese nuevamente.',
      //   icon: 'error',
      //   confirmButtonText: 'Ok',
      //   allowOutsideClick: false,
      //   onClose: (close) => {
      //     this.dialog.closeAll();
      //     this.router.navigate(['/' + ROUTE_GENERAL.login]);
      //   }
      // });
    }
  }

  setUserModel(userModel: IUser){
    this.userModel.next(userModel);
    this.storageService.setData('userModel', JSON.stringify(userModel));
  }

}
