import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { POSITION_NOTIFICATION, TYPE_NOTIFICATION } from 'src/app/shared/configs/constant.common';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { QuerysService } from 'src/app/shared/services/querys.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-climb-base-kpi',
  templateUrl: './climb-base-kpi.component.html',
  styleUrls: ['./climb-base-kpi.component.scss']
})
export class ClimbBaseKpiComponent implements OnInit {
  TITLE_VIEW: string  = "Configuración"
  fileToUpload: File = null;
  constructor( private queryService:QuerysService ,
    private notificationService: NotificationsService,
    private _sidebarService: SidebarService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this._sidebarService.setTitleHeader(this.TITLE_VIEW);
  }

  handleSelectfile = (file: File) => {
    this.fileToUpload = null;
    this.fileToUpload = file[0];
    console.log("FILE SELECT : ", this.fileToUpload);
  }

  eventApiUploadFile = () => {
    console.log("Enviendo Archivo : ", this.fileToUpload);
    this.loaderService.show();
    this.queryService.uploadInspectionsExcel(this.fileToUpload).subscribe(
      response => {
        
        console.log("RESPONSE UPLOAD FILE : ", response);
        this.notificationService.showNotification(response.responseMessage, POSITION_NOTIFICATION.POS_TOP_RIGHT, TYPE_NOTIFICATION.NOT_SUCCESS);
      
        this.loaderService.hide();
      },
      (error: HttpErrorResponse) => {
        this.loaderService.hide();
        console.log("EEORR : ", error.error.responseMessage);
        
        this.notificationService.showNotification(error.error.responseMessage, POSITION_NOTIFICATION.POS_TOP_RIGHT, TYPE_NOTIFICATION.NOT_DANGER);
      }
    );
  }

}