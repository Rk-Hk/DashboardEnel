import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_GENERAL } from '../../configs/constant.common';

declare interface RouteInfo {
  path?: string;
  title: string;
  subItems?: RouteInfo[];
  idGroup?: string;
  icon: string;
  class: string;
}

export const ROUTES : RouteInfo[] = [
  { title: 'Dashboard', path: `${ROUTE_DASHBOARD.path_dashboardKPI}`, icon: 'las la-tachometer-alt', class: '' },
  { title: 'DMS Inspecciones', path: `${ROUTE_DASHBOARD.path_dms_inspections}`, icon: 'las la-house-damage', class: '' },
  { title: 'Configuración',  icon: 'las la-cog', class: 'background-main-color', idGroup: 'idconfig', subItems : [
      { title: 'Base Interrupciones', path: `${ROUTE_DASHBOARD.path_config_upload_file}`, icon : 'las la-file-upload', class: 'li-subitem' },
      { title: 'Gestion de usuarios', path: `${ROUTE_DASHBOARD.path_config_manage_users}`, icon : 'las la-user-cog', class: 'li-subitem' },
      { title: 'Gestion de empresas', path: `${ROUTE_DASHBOARD.path_config_manage_companies}`, icon : 'las la-industry', class: 'li-subitem' },
      // { title: 'Gestion de estructuras', path: '', icon : 'las la-bolt', class: 'li-subitem' }
    ] 
  },

]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  
  menuItems: any[];
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }


  eventCloseSession = () => {
    localStorage.clear();
    this.router.navigate(['/' + ROUTE_GENERAL.login]);
    console.log("Cerrar sesion");
  }

}
