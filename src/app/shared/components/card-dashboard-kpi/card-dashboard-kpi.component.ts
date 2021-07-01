import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-dashboard-kpi',
  templateUrl: './card-dashboard-kpi.component.html',
  styleUrls: ['./card-dashboard-kpi.component.scss']
})
export class CardDashboardKpiComponent implements OnInit {
  @Input() titleKPI : string;
  @Input() iconKPI : string;
  @Input() valueKPI : string;
  @Input() medidKPI : string;


  constructor() { }

  ngOnInit() {
    console.log("LLEGARON VALORES : ", this.titleKPI, this.iconKPI, this.valueKPI);
    
  }

}
