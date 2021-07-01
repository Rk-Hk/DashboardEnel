import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalManageCompaniesComponent } from 'src/app/shared/components/modals/modal-manage-companies/modal-manage-companies.component';
import { ICompany } from 'src/app/shared/models/IUser';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent  implements OnInit {
  listCompanies: ICompany[] = [];

  constructor(
    private authService: AuthenticationService,
    private companiesService: CompaniesService,
    private _sidebarService: SidebarService,
    private storageService: StorageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.handleGetCompaniesList();
  }

  /**
   * Obtiene todas las empresas
   */
  handleGetCompaniesList() {
    this.companiesService.getListCompanies()
      .subscribe((res: any) => {
        if (res && res.responseCode === 0) {
          this.listCompanies = res.responseData;
          this.companiesService.setListCompanies(this.listCompanies);
        } else {
          this.authService.isActiveToken(res);
        }
      }, error => {
        this.authService.isActiveToken(error.error);
      });
  }

  openModalAddCompany(): void {
    const dialogRef = this.dialog.open( ModalManageCompaniesComponent, {
      width: '450px',
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULT MODAL COMPANY : ", result); 
      if(result) this.handleSendCompanyToRegister(result);
    });
  }

  

  handleSendCompanyToRegister(company){
    this.companiesService.sendNewCompany(company)
    .subscribe((res: any) => {
        if (res && res.responseCode === 0){
          this.handleGetCompaniesList();
          // Swal.fire({
          //   title: 'Listo!',
          //   text: 'Empresa registrada correctamente.',
          //   icon: 'success',
          //   confirmButtonText: 'Ok',
          //   onClose: (close) => {
          //     this.closeGenericDialog();
          //     this.companyForm.reset();
          //   }
          // });
        } else {
          this.authService.isActiveToken(res);
        }
      }, error => {
        this.authService.isActiveToken(error.error);
      });
  }


}
