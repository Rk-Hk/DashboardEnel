import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-manage-companies',
  templateUrl: './modal-manage-companies.component.html',
  styleUrls: ['./modal-manage-companies.component.scss']
})
export class ModalManageCompaniesComponent implements OnInit {


  companyForm = new FormGroup({
    company: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<ModalManageCompaniesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeGenericDialog() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('overflow');
    // this.dialog.closeAll();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(): void {
    this.dialogRef.close(this.company.value);
  }

  get company(): any {
    return this.companyForm.get('company');
  }

}
