export interface IResponseDataDashboard {
  responseCode: Number;
  responseData: {
    responseFaultType: {
      listFaultTyppe: [
        { faultType: string; conteo: Number },
        { faultType: string; conteo: Number },
        { faultType: string; conteo: Number }
      ];
      sumTotal: Number,
    },
    responseReason: {
      listReasons: [
        { reason: string; conteo: Number },
        { reason: string; conteo: Number },
        { reason: string; conteo: Number }
      ];
      sumTotal: Number,
    },
    responseSumValues: [
        {
            sumTime: Number,
            sumClientsAfect: Number,
            sumClientsHours: Number,
            averageTime: Number
        }
    ],
    responseFaultsByFeeder: [
        {
            feeder: string,
            conteo: Number
        }
    ],
    responseReasonFounderCount: [
        IDataResponsable
    ],
    responseLinealChartInterruptionsdata: [
      any
    ]
  };
  responseMessage: String
}

export interface IDataResponsable {
  reasonFounder: string,
  conteo: number
}
