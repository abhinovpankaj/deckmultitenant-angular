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
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    companyIdentifier: '',
    // Add other fields as needed
  };

  isSaving: boolean = false;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<AdminSignupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private tenantsService: TenantsService,
    private toast: HotToastService,
  ) {
    this.adminData = { ...dialogData };
  } // Replace ApiService with your actual service

  onNoClick() {
    this.dialogRef.close();
  }

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  submitForm() {
    const tenantId = this.adminData.id
    // console.log(tenantId);
    
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
