import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ROUTE_DASHBOARD } from 'src/app/shared/configs/constant.common';
import { MatPaginator } from '@angular/material/paginator';
import { iTableStructures } from 'src/app/shared/models/ITable.interface';
import { StructuresService } from 'src/app/shared/services/structures.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IPayloadStructureComplete, IStructure } from 'src/app/shared/models/IUser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { ModalAddStructureComponent } from 'src/app/shared/components/modals/modal-add-structure/modal-add-structure.component';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-dms-inspection',
  templateUrl: './dms-inspection.component.html',
  styleUrls: ['./dms-inspection.component.scss']
})
export class DmsInspectionComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  routerDashboard = ROUTE_DASHBOARD;
  TITLE_VIEW: string = "DMS Inspecciones"
  
  listStructures: IStructure[] = [];

  currentPage: number = 0;
  cantRowsTable: number = 15;
  cantTotalResults: number = 0;
  
  displayedColumns = ['code','structureType', 'feeder', 'circuitId', 'chain', 'location','actions','inspections'];
  dataSource : MatTableDataSource<iTableStructures>;

  filterResult: any ;

  constructor(
    private _router: Router,
    private structuresService: StructuresService,
    private _sidebarService: SidebarService,
    private storageService: StorageService,
    private loaderService: LoaderService,
    private authService: AuthenticationService,
    
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
    this._sidebarService.setTitleHeader(this.TITLE_VIEW);
    this.setEmptyStructures();
    this.handleGetStructuresList(this.cantRowsTable , this.currentPage, {});
  }

  ngAfterViewInit() {
    this.dataSource ? this.dataSource.paginator = this.paginator : null;
  }

  /**
   * Funcion para OBTENER la LISTA DE ESTRUCTURAS
   */
  handleGetStructuresList = (limit:Number, offset: Number, payload?:IPayloadStructureComplete) => {
    this.loaderService.show();
      payload.limit = limit;
      payload.offset = offset;
    this.structuresService.getListStructures(payload)
      .subscribe((res: any) => {
        console.log("RESPONSE : ", res);

        if (res && res.responseCode === 0) {
          this.cantTotalResults = res.responseData.count;
          this.listStructures = res.responseData.rows;
          this.structuresService.setListStructures(this.listStructures);

          
          this.dataSource = new MatTableDataSource<any>(this.listStructures);
          this.loaderService.hide();
        } else {
          this.authService.isActiveToken(res);
        }
      }, error => {
        this.loaderService.hide();
        this.authService.isActiveToken(error.error);
      }, () => {
        this.loaderService.hide();
      });
  }

  /**
   * Abrir modales para crear y eliminar estrucutras
   */
   public openModalCreateStructure = () => {
    const dialogRef = this.dialog.open(ModalAddStructureComponent, {
      width: '600px',
      // data: {listaFiltros: this.listaFiltros}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleGetFiltersSelected(result);
      }
    });
  }

  setEmptyStructures() {
    this.structuresService.setSelectedStructure(null);
    // this.structuresService.setListStructures([]);
    this.storageService.removeData('structureSelected');
    this.storageService.removeData('listDetailStructure');
  }

  
  onclickNavigateDashboardDMS () {
    this._router.navigate(['/dashboard/' + ROUTE_DASHBOARD.path_dms_datastudio]);
  }
  

  getStructureDetail(structure: IStructure) {
    this.structuresService.setSelectedStructure(structure);
    this._router.navigate(['/' + ROUTE_DASHBOARD.path_dms_structuresInfo, structure.code]);
  }

  /**
   * Funcion OBTENER la lista de FILTROS SELECCIONADAS desde el componente hijo
   */
  handleGetFiltersSelected = ($event)=>{
    this.filterResult = this.cleanPayloadFilters($event);
    console.log("EVENT ENVIADO : ", this.filterResult); 
    this.handleGetStructuresList(this.cantRowsTable, this.currentPage, this.filterResult);
  }

  /**
   * Funcion para limpiar y preparar PAYLOAD de consulta LISTA DE FILTROS
   */
  cleanPayloadFilters(filtersSelecteds) {
    for (var propName in filtersSelecteds) {
      if (filtersSelecteds[propName] === null || filtersSelecteds[propName] === undefined) {
        delete filtersSelecteds[propName];
      }
    }
    let payload: any = {};
    filtersSelecteds.filterCode  != "" && filtersSelecteds.filterCode ? payload.code = filtersSelecteds.filterCode : null;
    filtersSelecteds.filterStructureType ? payload.structureType = filtersSelecteds.filterStructureType : null;
    filtersSelecteds.filterZone ? payload.zone = filtersSelecteds.filterZone : null;
    filtersSelecteds.filterFeeder ? payload.feeder = filtersSelecteds.filterFeeder : null;
    filtersSelecteds.filterCircuit ? payload.selectCircuit = filtersSelecteds.filterCircuit : null;
    
    this.currentPage=0;
    
    localStorage.setItem('filtersSelectedStructures', JSON.stringify(payload));
    return payload;
  }

  /**
   * Funcion para el CAMBIO DE PAGINA
   */
  onPaginateChange(event:any) {
    console.log("EVENT : ", event);
    
      this.currentPage = this.cantRowsTable*(event.pageIndex);
      console.log("CurrentPate : ", this.currentPage, " - CANT ROWs: ", this.cantRowsTable);
      
      let payload = localStorage.getItem('filtersSelectedStructures') ?JSON.parse(localStorage.getItem('filtersSelectedStructures')) : {};
    this.handleGetStructuresList(this.cantRowsTable, this.currentPage, payload);
  }

}
