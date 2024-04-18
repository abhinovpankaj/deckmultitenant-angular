import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-dialog-edit-description',
  templateUrl: './dialog-edit-description.component.html',
  styleUrls: ['./dialog-edit-description.component.scss']
})
export class DialogEditDescriptionComponent {
  data = {
    name: '',
    companyDescription: '',
    id: '',
    footerText: '',
    mobileUserCount: '',
    webUserCount: '',
    bothUserCount: '',
  };// Update data type as per your tenant model

  firstname: String = '';
  lastname: String = '';
  isSaving: boolean = false;
  isDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private tenantsService: TenantsService,
    private toast: HotToastService
  ) {
    // Clone the existing data to avoid modifying the original data
    this.data = { ...dialogData };
  }

  onNoClick() {
    this.dialogRef.close();
  }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;
  
      // Prepare the data to be sent to the server
      const updateData = {
        name: this.data.name,
        companyDescription: this.data.companyDescription,
        footerText: this.data.footerText,
        mobileUserCount: this.data.mobileUserCount,
        webUserCount: this.data.webUserCount,
        bothUserCount: this.data.bothUserCount,
        // Add other properties as needed based on your API
      };
  
      // Call the editTenant method for updating an existing tenant
      this.tenantsService.editTenant(this.data.id, updateData).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after successful edit
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          alert('Editing tenant failed!');
        }
      );
    } else {
      this.toast.error('Please complete the form with valid data!');
    }
  }
  

  formValidator() {
    let valid = true;
    return valid;
  }
}
