export interface IUser {
    id: number;
    documentNumber: string;
    role: string;
    password: string;
    fullName: string;
    sector: string;
    isFirstLogin: boolean;
    companyId: number;
    company: ICompany;
    createdAt: Date;
    updatedAt: Date;
    roleDesc?: string;
}

export interface ICompany {
    id: number;
    createdAt: string;
    companyName: Date;
    updatedAt: Date;
}

export interface IStructure {
    id: number;
    code: string;
    feeder: string;
    zone: string;
    circuitId: string;
    structureType: string;
    location: string;
    itWasObserved: boolean;
    inspector: string;
    createdAt: string;
    updatedAt: string;
}

export interface IStructureDms {
    id: number;
    deficiencyType: string;
    v_suministro: string;
    v_cliente: string;
    direccion: string;
    distrito: string;
    v_notificado: boolean;
    v_DHLC: number;
    v_DHLP: number;
    DV: number;
    a_DH: null;
    qualification: number;
    tipoArbol: null;
    detail: string;
    deficiencyCode: null;
    itWasCorrected: boolean;
    createdAt: string;
    updatedAt: string;
    structureId: number;
    employeeId: number;
    userId: null;
    structure?: IStructure;
    structureimagesId: string;
}


export interface IPayloadStructureComplete {
    zone?: string,
    feeder?: string,
    circuitId?: string,
    structureType?: string,
    limit?: Number,
    offset?: Number
}
