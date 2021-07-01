import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IControlValidation } from 'src/app/shared/models/IControlValidation';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IUser } from 'src/app/shared/models/IUser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ROUTE_DASHBOARD } from 'src/app/shared/configs/constant.common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('modalUpdatePwd', {static: false}) modalUpdatePwd: TemplateRef<any>;
  userModel: IUser = {} as IUser;
  controlsConfig: {
    dni: IControlValidation;
  } = {
    dni : {
      minlength: 8,
      maxlength: 8,
      pattern: 'onlyNumbers'
    }
  };

  // Formulario de Login
  loginForm = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.minLength(8)]),
    pwd: new FormControl('', Validators.required)
  });
  // Formulario para actualización de contraseña
  updatePwdForm = new FormGroup({
    pwd1: new FormControl('', Validators.required),
    pwd2: new FormControl('', Validators.required)
  });

  validatedUpdateForm = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/' + ROUTE_DASHBOARD.pr_dashboard]);
    }
    this.validFormUpdate();
  }

  submitLogin() {
    this.loaderService.show();
    console.log(this.loginForm.value);
    this.authService.validatedSignIn(
      this.loginForm.value.dni,
      this.loginForm.value.pwd).subscribe((res: any) => {
        // console.log(res);
        if (res && res.responseCode === 0) {
          this.userModel = res.responseData.employee;
          console.log(this.userModel);
          if (this.userModel.isFirstLogin) {
            this.authService.setUserModel(this.userModel);
            this.authService.createTokenSession(res.responseData.authToken);
            this.openUpdatePwd();
          } else {
            this.authService.setUserModel(this.userModel);
            this.authService.createTokenSession(res.responseData.authToken);
            this.router.navigate(['/' + ROUTE_DASHBOARD.pr_dashboard]);
          }
          this.loaderService.hide()
        } else {
          this.loaderService.hide()
          // Swal.fire({
          //   title: 'Error, contraseña incorrecta!',
          //   text: res.responseMessage,
          //   icon: 'error',
          //   confirmButtonText: 'Ok',
          // });
        }
      }, error => {
        this.loaderService.hide();
        if (error && error.error.responseCode){
          // Swal.fire({
          //   title: 'Error, contraseña incorrecta!',
          //   text: error.error.responseMessage,
          //   icon: 'error',
          //   confirmButtonText: 'Ok',
          // });
        }
      });
  }

  // Formulario de actualizacion de contraseña
  validFormUpdate() {
    this.updatePwdForm.valueChanges.subscribe((form) => {
      // console.log(form);
      if (this.updatePwdForm.valid) {
        console.log(form);
        if (this.pwd1.value && this.pwd2.value) {
          if (this.pwd1.value === this.pwd2.value) {
            console.log('son iguales');
            this.validatedUpdateForm = true;
          } else {
            console.log('son !=');
            this.validatedUpdateForm = false;
          }
        } else {
          this.validatedUpdateForm = false;
        }
      } else {
        this.validatedUpdateForm = false;
      }
    });
  }

  openUpdatePwd(): void {
    const dialogRef = this.dialog.open(this.modalUpdatePwd, {
      width: '600px',
      maxWidth: '600px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  closeGenericDialog() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('overflow');
    this.dialog.closeAll();
  }

  sendUpdatePwd() {
    console.log('actualizar contraseña');
    this.authService.changePwd(
      this.pwd1.value,
      this.userModel.id).subscribe((res: any) => {
        if (res && res.responseCode === 0) {
          // Swal.fire({
          //   title: 'Listo!',
          //   text: res.responseData,
          //   icon: 'success',
          //   confirmButtonText: 'Ok',
          //   onClose: (close) => {
          //     this.closeGenericDialog();
          //     this.router.navigate(['/']);
          //   }
          // });
        }
      });
  }

  get pwd1(): any {
    return this.updatePwdForm.get('pwd1');
  }
  get pwd2(): any {
    return this.updatePwdForm.get('pwd2');
  }

}
