import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTE_GENERAL } from '../configs/constant.common';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenguardGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private authService: AuthenticationService,
    private router: Router){}



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = JSON.parse(this.storageService.getData('token')) ? JSON.parse(this.storageService.getData('token')) : null;
      if (token && token !== undefined){
        return true;
      } else {
        this.authService.sessionEnd();
        this.router.navigate(['/' + ROUTE_GENERAL.login]);
        return false;
      }
  }
  
}
