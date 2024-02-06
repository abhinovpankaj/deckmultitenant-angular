import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

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
    password: ''
    // Add other fields as needed
  };

  isSaving: boolean = false;

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

  submitForm() {
    const tenantId = 'YOUR_TENANT_ID'; // Replace with the actual tenant ID
    this.tenantsService.registerAdmin(tenantId, this.adminData).subscribe(
      (response) => {
        console.log(response);
        // Handle the response as needed
      },
      (error) => {
        console.error(error);
        // Handle errors as needed
      }
    );
  }
}
