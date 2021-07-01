import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";
import * as moment from "moment";
import { QuerysService } from "src/app/shared/services/querys.service";

@Component({
  selector: 'app-linear-graphic',
  templateUrl: './linear-graphic.component.html',
  styleUrls: ['./linear-graphic.component.scss']
})
export class LinearGraphicComponent implements OnInit, OnChanges {
  @Input() dataLinearChart: Array<any> = [];
  @Input() rangeSelected: any ;
  @Input() typeIntervalSelect: Array<any>;

  totalDays = moment("2020-02", "YYYY-MM").daysInMonth();

  constructor(private queryService : QuerysService) {}

  ngOnInit(): void {
    console.log("TOTAL DIAS : ", this.totalDays);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      "DATA LINEAR : ",
      this.dataLinearChart,
    );

    if (changes.dataLinearChart || changes.listLabels) {
      this.setDataToChart();
      console.log("ANGE SELECT : ", this.rangeSelected);
      
    }
  }

  setDataToChart = () => {
    let newArray = [];
    this.lineChartLabels = [];
    let lsClientsAf = [];
    let cantMonths = this.queryService.getCantMothsBetweenDates(this.rangeSelected.startDate, this.rangeSelected.endDate);

    
    if (this.dataLinearChart && this.dataLinearChart.length > 0) {
      // this.listLabels.forEach( (day) => {
        // let valueTemp = this.dataLinearChart.find(item => item.dayFault == day);
        this.dataLinearChart.forEach(element => {
          // if(valueTemp){
            // console.log("VALUE TEMP : ", valueTemp);
            
            newArray.push(element.totalFaults);
            this.lineChartLabels.push(cantMonths<=2 ? `${element.dayX}/${element.monthX}` : moment(`${element.yearX}-${element.monthX}`).format('MMM-YY'))
            lsClientsAf.push(element.totalClientsAfect);
          // }else{
          //   newArray.push(0);
          //   lsClientsAf.push(0);
          // }
        });
        
      // })
      
      console.log("DATA GENERATE : ", newArray);

      this.lineChartData = [
        { data: newArray, label: "Interrupciones" },
        { data: lsClientsAf, label: "clientes afectados", yAxisID: "y-axis-1" },
      ];

      // this.lineChartLabels = this.listLabels;

      this.chart.update();
    }
  };

  setLabelsTochard = (startDate, endDate) => {
    let listDays = [];
    for (var m = startDate; m.isBefore(endDate); m.add(1, 'days')) {
      listDays.push(m.format('YYYY-MM-DD'));
    }
    return listDays
  }

  public lineChartData: ChartDataSets[] = [
    { data: [650, 590, 800, 810, 560, 550, 400], label: "Series A" },
    { data: [280, 480, 400, 190, 860, 270, 200], label: "Series B" },
    { data: [10, 200, 30, 400, 50, 60, 70], label: "Series C" },
  ];
  public lineChartLabels: Label[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            fontColor: '#FF7895',
          }
        }
      ],
    },
    annotation: {
      annotations: [
        // {
        //   type: 'line',
        //   mode: 'vertical',
        //   scaleID: 'x-axis-0',
        //   value: 'March',
        //   borderColor: 'orange',
        //   borderWidth: 2,
        //   label: {
        //     enabled: true,
        //     fontColor: 'orange',
        //     content: 'LineAnno'
        //   }
        // },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(86,121,254,0.05)',
      borderColor: 'rgba(86,121,254,1)',
      pointBackgroundColor: 'rgba(86,121,254,1)',
      pointBorderColor:  '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius:4,
    },
    { // dark grey
      backgroundColor: 'rgba(112,184,226,0.05)',
      borderColor: 'rgba(112,184,226,1)',
      pointBackgroundColor: 'rgba(112,184,226,1)',
      pointBorderColor:  '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      pointRadius:4,
    }
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor(): void {
    // this.lineChartColors[2].borderColor = 'green';
    // this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel(): void {
    this.lineChartLabels[4] = ["1st Line", "2nd Line"];
  }
}
