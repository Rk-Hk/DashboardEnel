export interface iTableStructures {
    code: string,
    structureType: string,
    feeder: string,
    circuitId: string,
    chain: string,
    location: string,
    itWasDeleted: any,
    id: number
}

export interface iTableInspections {
    deficiencyType: string,
    itWasCorrected: boolean,
    code: string,
    chain: string,
    feeder: string,
    obs_fecha: string,
    obs_qualification: string,
    obs_dv: string,
    obs_dhlcdhra: string,
    obs_dhlpdhba: string,
    lev_fecha: string,
    lev_qualification: string,
    lev_dv: string,
    lev_dhlcdhra: string,
    lev_dhlpdhba: string,
}