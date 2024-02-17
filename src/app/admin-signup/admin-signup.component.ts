import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent {
  adminData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    companyIdentifier: '',
  };

  isSaving: boolean = false;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<AdminSignupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private tenantsService: TenantsService,
    private toast: HotToastService,
  ) {
    console.log(dialogData.companyIdentifier);
    this.adminData.companyIdentifier = dialogData.companyIdentifier;
  } // Replace ApiService with your actual service

  onNoClick() {
    this.dialogRef.close();
  }

  submitForm() {
    const tenantId = this.dialogData.id
    console.log(this.adminData);
    this.tenantsService.registerAdmin(tenantId, this.adminData).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close(); // Close the dialog after a successful increase
        // Handle the response as needed
      },
      (error) => {
        console.error(error);
        // Handle errors as needed
      }
    );
  }
}
