import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_API_STRUCTURES } from '../configs/endpoint.common';
import { IPayloadStructureComplete, IStructure, IStructureDms } from '../models/IUser';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class StructuresService {

  listStructures: BehaviorSubject<IStructure[]> = new BehaviorSubject<IStructure[]>([]);
  structureSelected: BehaviorSubject<IStructure> = new BehaviorSubject<IStructure>(null);
  listDetailStructures: BehaviorSubject<IStructureDms[]> = new BehaviorSubject<IStructureDms[]>([]);

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) { }

  defaultStructures() {
    this.listStructures.next([]);
    this.structureSelected.next(null);
    this.listDetailStructures.next([]);
  }

  /**
   * Structures
   */

  setListStructures(listStructures: IStructure[]) {
    this.listStructures.next(listStructures);
    // this.storageService.setData('listStructures', JSON.stringify(listStructures));
  }

  getListStructures(payload?: IPayloadStructureComplete) {
    // let structTemp: Array<IStructure> = JSON.parse(localStorage.getItem('listStructures'));
    // if (structTemp && structTemp.length > 0 && !payload) {
    //   console.log("ENTRAMPS GIL ", structTemp);

    //   return of({ responseCode: 0, responseData: structTemp });
    // } else {
    //   console.log("CONSULTANDO AL SERVICIO : ", payload);

      const baseUri = environment.serviceUrl + URL_API_STRUCTURES.getListWEBStructures;
      this.apiService.setBaseUriApi(baseUri);
      return this.apiService.execGetJsonWithParams(payload).pipe();
    // }

  }

  /**
   * Structure selected, get Structure by Id
   */

  setSelectedStructure(structureSelected: IStructure) {
    this.structureSelected.next(structureSelected);
    this.storageService.setData('structureSelected', JSON.stringify(structureSelected));
  }

  getStructureById(structureId: string) {
    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.getStructuresByID;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execStructureIdJson(structureId).pipe();
  }
  getInspectionsByStructure(structureId: string) {
    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.getInspectionsByStructure;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execStructureIdJson(structureId).pipe();
  }

  /**
   * Detalle de estructuras
   */
  setListDetailStructure(listDetailStructure: IStructureDms[]) {
    this.listDetailStructures.next(listDetailStructure);
    this.storageService.setData('listDetailStructure', JSON.stringify(listDetailStructure));
  }

  getListFilters = (): Observable<any> => {
    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.getAllFilters;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execGetJson().pipe();
  }

  /**
   * GET Inspections LIST
   */

  getListInspections = (filters: any): Observable<any> => {
    console.log("FILTERS : ", filters);

    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.getStructuresByID;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execGetJsonWithParams(filters).pipe();
  }


  /**
   * CREATE STRUCTURE
   */

   createNewStructure = (structure: any): Observable<any> => {
    console.log("body new strucutre : ", structure);

    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.createNewStructure;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execPostJson(structure).pipe();
  }

  /**
   * Delete STRUCTURE
   */

  deleteStructureSelected = (structureId: any): Observable<any> => {
    console.log("body delete strucutre : ", structureId);

    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.deleteStructure + `/${structureId}`;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execPutJson(structureId).pipe();
  }

  /**
   * @param listaFiltros 
   */

  downloadFileExcelInspectionsDMS (payload) {
    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.exportInspections;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execPostJsonBLOB(payload).pipe();
  }
  downloadFileExcelStructures (payload) {
    const baseUri = environment.serviceUrl + URL_API_STRUCTURES.exportStructures;
    this.apiService.setBaseUriApi(baseUri);
    return this.apiService.execPostJsonBLOB(payload).pipe();
  }

  /**GET LIST QUALIFICATION  */

  getLSZones = (listaFiltros: Array<any>) => {
    return [...new Set(listaFiltros.map(item => item.zone))]
  }

  getLSOnlyFeeders = (listaFiltros) => {
    return [...new Set(listaFiltros.map(item => item.feeder))]
  }

  getLSOnlyChain = (listaFiltros) => {
    return [...new Set(listaFiltros.map(item => item.chain))]
  }

  getLSOnlyCircuits = (listaFiltros) => {
    return [...new Set(listaFiltros.map(item => item.circuitId))]
  }

  getLSFeeders = (listaFiltros, selectZone) => {
    let dataFeeder = [...new Set(listaFiltros.filter(item => item.zone == selectZone))]
    return [...new Set(dataFeeder.map((item: any) => item.feeder))]
  }

  getLSCircuit = (listaFiltros, selectFeeder) => {
    let dataCircuit = [...new Set(listaFiltros.filter(item => item.feeder == selectFeeder))]
    return [...new Set(dataCircuit.map((item: any) => item.circuitId))]
  }

  returnListChain = () => {

  }

  returnListQualification = () => {
    return [{
      value: 0,
    }, {
      value: 1,
    }, {
      value: 2,
    }, {
      value: 3,
    }, {
      value: 'OK',
    }
    ]
  }

  returnListTypeInspection = () => {
    return [{
      value: ''
    }, {
      value: 'VIVIENDA CERCANO'
    }, {
      value: 'ARBOL CERCANO'
    }]
  }

  returnListLevantados = () => {
    return [{
      value: ''
    }, {
      value: 'NO'
    }, {
      value: 'SI'
    }]
  }
}
