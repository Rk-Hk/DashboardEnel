import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StructuresService } from 'src/app/shared/services/structures.service';

@Component({
  selector: 'app-filters-dms',
  templateUrl: './filters-dms.component.html',
  styleUrls: ['./filters-dms.component.scss']
})
export class FiltersDmsComponent implements OnInit {

  @Input() filterModify: any ;
  @Output() eventFiltersSelected: EventEmitter<any> = new EventEmitter<any>();

  listaFiltros: Array<any>
  listFilterZone: Array<any>
  listFilterFeeder: Array<any>
  listFilterCircuit: Array<any>
  
  listTypeStructures: Array<any>
  
  structureForm: FormGroup;

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private structuresService: StructuresService,
    private storageService: StorageService,
    private loaderService: LoaderService,
    
    public dialog: MatDialog) { }

  ngOnInit() {
    this.buildStructuresForm();
    this.getListFilters();
  }

  buildStructuresForm = () => {
    this.structureForm = this._formBuilder.group({
      filterCode:null,
      filterStructureType:null,
      filterZone:null,
      filterFeeder: null,
      filterCircuit: null,
    });
  }

  getListFilters = () => {
    this.structuresService.getListFilters().subscribe(
      response => {
        if (response && response.responseData) {
          this.listTypeStructures = response.responseData.filterTypeStructure;
          this.listaFiltros = response.responseData.filtersList;
          this.listFilterZone = this.structuresService.getLSZones(this.listaFiltros)
          this.listFilterFeeder = this.structuresService.getLSOnlyFeeders(this.listaFiltros)
          this.listFilterCircuit = this.structuresService.getLSOnlyCircuits(this.listaFiltros)

        } else {
          console.log("Ocurrio algo inesperado");

        }
      }
    )
  }

  onChangeEventSelectZone = (zoneSelected:string) =>{
    this.listFilterFeeder=null;
    this.listFilterCircuit=null;
    this.listFilterFeeder = this.structuresService.getLSFeeders(this.listaFiltros, zoneSelected);
    console.log("ZONA SELECCIONADA :", zoneSelected, " - ", this.listFilterFeeder);
  }

  onChangeEventSelectFeeder = (feederSelecred:string) => {
    this.listFilterCircuit=null;
    this.listFilterCircuit = this. structuresService.getLSCircuit(this.listaFiltros, feederSelecred);
    console.log("FEEDER SELECCIONADO : ", feederSelecred, " - ", this.listFilterCircuit);
    
  }

  /**
   * Funcion para LIMPIAR LOS CAMPOS DE FILTRO
   */
  cleanFilterFields = () => {
    this.structureForm.reset();
    this.listFilterZone = this.structuresService.getLSZones(this.listaFiltros)
    this.listFilterFeeder = this.structuresService.getLSOnlyFeeders(this.listaFiltros)
    this.listFilterCircuit = this.structuresService.getLSOnlyCircuits(this.listaFiltros)
  }

  /** Funcion EMITE LISTA DE FILTROS SELECCIONADAS */
  onClickSendFiltersSelected = () => {
    this.eventFiltersSelected.emit(this.structureForm.value);
  }
}
