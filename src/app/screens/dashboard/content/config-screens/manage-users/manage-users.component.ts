import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalUsersComponent } from 'src/app/shared/components/modals/modal-users/modal-users.component';
import { IControlValidation } from 'src/app/shared/models/IControlValidation';
import { ICompany, IUser } from 'src/app/shared/models/IUser';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  TITLE_VIEW: string = "Configuración"
  listUsers: IUser[] = [];
  listRoles = [{
    id: 1,
    nameRole: 'Administrador'
  }, {
    id: 2,
    nameRole: 'Supervisor'
  }, {
    id: 3,
    nameRole: 'Operario'
  }];
 

  // Formulario de Usuarios


  constructor(
    // private _snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private userService: UserService,
    private storageService: StorageService,
    private _sidebarService: SidebarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._sidebarService.setTitleHeader(this.TITLE_VIEW);
    this.getListUsers();
  }

  existListUsers() {
    let existUsers;
    this.userService.listUsers.subscribe((list: IUser[]) => {
      existUsers = list && list.length > 0 ? list : JSON.parse(this.storageService.getData(('listUsers')));
    });

    if (existUsers) {
      this.listUsers = existUsers;
    } else {
      this.getListUsers();
    }
  }


  /**
   * Obtiene todos los usuarios
   */
  getListUsers() {
    this.userService.getListUsers()
      .subscribe((res: any) => {
        if (res && res.responseCode === 0) {
          this.listUsers = res.responseData;
          this.userService.setListUsers(this.listUsers);
        } else {
          this.authService.isActiveToken(res);
        }
      }, error => {
        this.authService.isActiveToken(error.error);
      });
  }
 

  getRoleById(role: string) {
    switch (role) {
      case '1': return 'label-success';
      case '2': return 'label-info';
      case '3': return 'label-inverse';
    }
  }

  openModalAddUser(): void {
    const dialogRef = this.dialog.open(ModalUsersComponent, {
      width: '450px',
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULT MODAL USER REGISTER : ", result);
      
     });
  }

  closeGenericDialog() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('overflow');
    this.dialog.closeAll();
  }

  // showtoast = (mensaje) => {
  //     this._snackBar.open(mensaje, 'OK', {
  //       duration: 4000,
  //     });
  // }

  // Agregando nuevo usuario
  submitUserForm(userModel) {
    this.userService.sendNewUser(
      userModel.dni.value, userModel.fullName.value,
      userModel.role.value, userModel.sector.value.id,
      userModel.sector.value.companyName)
      .subscribe((res: any) => {
        if (res && res.responseCode === 0) {
          this.getListUsers();
          // Swal.fire({
          //   title: 'Listo!',
          //   text: 'Usuario registrado correctamente.',
          //   icon: 'success',
          //   confirmButtonText: 'Ok',
          //   onClose: (close) => {
          //     this.closeGenericDialog();
          //     this.resetUserForm();
          //   }
          // });
        } else {
          console.log("Usuario ya esta registrado");
          
          this.closeGenericDialog();
          this.authService.isActiveToken(res);
          
          // this.showtoast("ERROR: Usuario ya esta registrado")
        }
      }, error => {
        console.log("entramos ");
        // this.showtoast("ERROR: Usuario ya esta registrado")
        
        this.authService.isActiveToken(error.error);
      });
  }

  

}
