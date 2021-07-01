import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  titleHeader: string = "Probando";

  constructor(
    private _sidebarService:SidebarService
  ) { }

  ngOnInit() {
    this._sidebarService.$titleHeader.subscribe(
      (response:string) => {
        console.log("TITULO REGISTRADO : ", response);
        
         this.titleHeader = response}
    )
  }

}
