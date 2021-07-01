import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_DASHBOARD } from 'src/app/shared/configs/constant.common';
import { iTableStructures } from 'src/app/shared/models/ITable.interface';
import { IStructureDms } from 'src/app/shared/models/IUser';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { StructuresService } from 'src/app/shared/services/structures.service';

@Component({
  selector: 'app-dms-structure-info',
  templateUrl: './dms-structure-info.component.html',
  styleUrls: ['./dms-structure-info.component.scss']
})
export class DmsStructureInfoComponent implements OnInit {

  routerDashboard = ROUTE_DASHBOARD;
  codeStructure: string;
  structureSelected : any;
  listDetailStructure: IStructureDms[];

  
  lsImagesSelected : Array<string>;
  elementDetailSelected: any;
  typePhotos: string;

  
  displayedColumns = ['typeState','code','chain', 'feeder', 'obs_fecha', 'qualification','dv','dhlcdhra','dhlpdhba','obs_foto','lev_fecha','lev_dv','lev_dhlcdhra','lev_dhlpdhba','lev_foto','detail'];
  dataSource : MatTableDataSource<iTableStructures>;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _structuresService: StructuresService,
    private authService: AuthenticationService,
    private loaderService: LoaderService
    ) { }

  ngOnInit(): void {
    this.codeStructure = this.route.snapshot.params.idstruc;
    this.getStructureById(this.codeStructure);
    this._structuresService.structureSelected.subscribe(
      structureSelected => {
        console.log("STRUCTURE SELECTED: ", structureSelected);
        this.structureSelected = structureSelected
      }
    )
  }

  // getStructureById1(idStructure: string){
  //   this.loaderService.show();
  //   if(idStructure){
  //     this._structuresService.getInspectionsByStructure(idStructure)
  //     .subscribe((res: any) => {
  //       if(res && res.responseCode === 0){
  //         this.loaderService.hide();
  //         this.listDetailStructure = res.responseData.rows;
          
  //         this.dataSource = new MatTableDataSource<any>(this.listDetailStructure);
  //         this._structuresService.setListDetailStructure(this.listDetailStructure);
  //       }
  //     }, error => {
  //       this.loaderService.hide();
  //       this.authService.isActiveToken(error.error);
  //     }, () => {
  //       this.loaderService.hide();
  //     });
  //   } else {
  //     this.loaderService.hide();
  //     this.router.navigate(['/' + ROUTE_DASHBOARD.structures]);
  //   }
  // }

  getStructureById = (codeStructure) => {
    
    let payload: any = {};

    codeStructure ? payload.filterCode = codeStructure : null;
    this._structuresService.getListInspections(payload)
      .subscribe((res: any) => {
        console.log("RESPONSE : ", res);

        if (res && res.responseCode === 0 && res.responseData.rows.length>0) {
          this.listDetailStructure = res.responseData.rows;
          !this.structureSelected ? this.structureSelected= this.listDetailStructure[0].structure:null;
          
          this.dataSource = new MatTableDataSource<any>(this.listDetailStructure);
          this._structuresService.setListDetailStructure(this.listDetailStructure);
        } else {
          
          this.loaderService.hide();
          // this.router.navigate(['/' + ROUTE_DASHBOARD.structures]);
        }
      }, error => {
        
      this.loaderService.hide();
      // this.router.navigate(['/' + ROUTE_DASHBOARD.structures]);
      }, () => {
      });
  }

  displayImages = (stringImages, typePhotos) => {
    this.typePhotos = `${typePhotos}`;
    this.lsImagesSelected=  stringImages.replace('[',"").replace(']',"").split(',');
  }

    /**VEr mas detalle de inspeccion */
    showInspectionDetail = (inspection) => {
      this.elementDetailSelected = inspection;
      console.log("ELEMENT : ", this.elementDetailSelected);}
}
