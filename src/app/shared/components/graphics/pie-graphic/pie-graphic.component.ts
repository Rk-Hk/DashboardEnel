import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType, ChartOptions, PositionType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { IDataResponsable } from 'src/app/shared/models/IResponsesDashboard';
@Component({
  selector: 'app-pie-graphic',
  templateUrl: './pie-graphic.component.html',
  styleUrls: ['./pie-graphic.component.scss']
})

export class PieGraphicComponent implements OnInit , OnChanges{

  @Input() dataGraphic: Array<IDataResponsable>
  @Input() showGraphic: boolean = false;

  public pieChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    legend: {
      position: 'bottom'
    },
    // tooltips: {
    //   backgroundColor: 'red',
    //   callbacks: {
    //     labelTextColor: function (tooltipItem, chart) {
    //       return 'white'
    //     }
    //   }
    // }
    plugins: {
      datalabels: {
        display: true,
        color: 'white'
        // formatter: (value, ctx) => {
        //   const label = ctx.chart.data.labels[ctx.dataIndex];
        //   return label;
        // },
      },
      outlabels: {
        display: false
      }
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = []
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(86,121,254,0.6)', 'rgba(255, 156, 44,0.6)', 'rgba(75,84,197,0.8)','rgba(82,162,236,0.8)', 'rgba(0,0,255,0.3)','#f44336', '#E96082'],
      borderColor : ['rgba(86,121,254,1)', 'rgba(255, 156, 44,1)']
    },
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dataGraphic) {
      console.log("CAMBIO VALOR DE GRAFICO PIE: ", this.dataGraphic);
      this.buildGraphicFromDataInput();
    }
  }

  ngOnInit(): void {
    console.log("DATA FOR GRAPHIC : ", this.dataGraphic);
    
    this.buildGraphicFromDataInput();
  }


  buildGraphicFromDataInput = () => {
    if(this.dataGraphic && this.dataGraphic.length>0) {
      let lsLabels = [], lsData = [];
      let totalI = 0;
      this.dataGraphic.forEach((element:IDataResponsable) => {
        lsLabels.push(element.reasonFounder);
        lsData.push(element.conteo);
        totalI = totalI+ element.conteo;
      })
      console.log("DATA : ", lsData, " - LABELS : ", lsLabels , " - CONTEO : ", totalI);
      lsLabels.forEach((element:string, index) => {
        lsLabels[index]=`${lsLabels[index]} ${((lsData[index]/totalI)*100).toFixed(2)}%`
      })
      this.pieChartLabels = lsLabels;
      this.pieChartData = lsData;
    } 
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
