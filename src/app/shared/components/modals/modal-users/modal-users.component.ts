import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IControlValidation } from "src/app/shared/models/IControlValidation";
import { ICompany } from "src/app/shared/models/IUser";

@Component({
  selector: "app-modal-users",
  templateUrl: "./modal-users.component.html",
  styleUrls: ["./modal-users.component.scss"],
})
export class ModalUsersComponent implements OnInit {
  listCompanies: ICompany[] = [];
  userForm = new FormGroup({
    dni: new FormControl("", [Validators.required, Validators.minLength(8)]),
    fullName: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
    sector: new FormControl("", Validators.required),
  });

  controlsConfig: {
    dni: IControlValidation;
    nombre: IControlValidation;
  } = {
    dni: {
      minlength: 8,
      maxlength: 8,
      pattern: "onlyNumbers",
    },
    nombre: {
      pattern: "onlyLetters",
    },
  };

  listRoles = [
    {
      id: 1,
      nameRole: "Administrador",
    },
    {
      id: 2,
      nameRole: "Supervisor",
    },
    {
      id: 3,
      nameRole: "Operario",
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onClick(): void {
    this.dialogRef.close(this.userForm.value);
  }

  resetUserForm() {
    this.dni.value = "";
    this.fullName.value = "";
    this.role.value = "";
    this.sector.value = "";
  }

  get dni(): any {
    return this.userForm.get("dni");
  }
  get fullName(): any {
    return this.userForm.get("fullName");
  }
  get role(): any {
    return this.userForm.get("role");
  }
  get sector(): any {
    return this.userForm.get("sector");
  }
}
