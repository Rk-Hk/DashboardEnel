import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StructuresService } from 'src/app/shared/services/structures.service';

@Component({
  selector: 'app-modal-add-structure',
  templateUrl: './modal-add-structure.component.html',
  styleUrls: ['./modal-add-structure.component.scss']
})
export class ModalAddStructureComponent implements OnInit {

  
  public loading : boolean = false;

  listFiltrosREsult: any;
  
  listTypeStructures: Array<any>= ["POSTE","RECLOSER","PMI","SAM","PF","SAB","REGULADOR"];
  listFilterZone: Array<any>;
  listFilterFeeder: Array<any>;
  listFilterCircuit: Array<any>;
  listFilterChain: Array<any>;
  // listTypeStructures: Array<any>= ["POSTE","RECLOSER","PMI","SAM","PF","SAB","REGULADOR"];

  formNewStructure: FormGroup ;
  constructor(private _structuresService: StructuresService,
    public dialogRef: MatDialogRef<ModalAddStructureComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("DATA : ", data);
      this.formNewStructure = new FormGroup({
        code: new FormControl("", Validators.required) ,
        structureType: new FormControl("") ,
        feeder: new FormControl("") ,
        circuitId: new FormControl("") ,
        chain: new FormControl( "") ,
        zone: new FormControl("")
     
      });
      
     }

  ngOnInit(): void {
    this.listFilterZone = this._structuresService.getLSZones(this.data.listaFiltros);
    this.listFilterFeeder = this._structuresService.getLSOnlyFeeders(this.data.listaFiltros);
    this.listFilterCircuit = this._structuresService.getLSOnlyCircuits(this.data.listaFiltros);
    this.listFilterChain = this._structuresService.getLSOnlyChain(this.data.listaFiltros);
  }


  createNewStructure = () => {
    console.log("VALORES FORM : ", this.formNewStructure);

    

    this._structuresService.createNewStructure(this.formNewStructure.value).subscribe(
      response => {
        
        this.dialogRef.close({result: 'OK'});
      },error => {
        this.dialogRef.close({result: 'ERROR'});
      }
    )
    
    
    // this.loading= true;
    // console.log("CREATE : ", this.formTablepsi.value);
    // this._tablapsiService.insertUpdateItemPSI(this.formTablepsi.value, 'create').subscribe(
    //   response => {
    //     if(response.data){
    //       this.dialogRef.close({OK: 'OK', message: "Guardado correctamente"});
    //     }else{
    //       this.dialogRef.close({OK: 'ERROR', message: "Error Al guardar los datos"});
    //     }
    //     console.log("RESPONSE : ", response);
        
    //     this.loading= false;
    //   },error => {
        
    //     this.loading= false;
    //     this.dialogRef.close({OK: 'ERROR', message: "Error conexion con el servidor"});
    //     console.log("ERROR  : ", error);
    //   }
    // )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.dialogRef.close(this.formNewStructure.value);
  }
  


}
