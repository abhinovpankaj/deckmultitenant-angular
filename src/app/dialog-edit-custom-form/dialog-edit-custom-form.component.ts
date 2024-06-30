import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TenantsService } from '../tenants.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dialog-edit-custom-form',
  templateUrl: './dialog-edit-custom-form.component.html',
  styleUrls: ['./dialog-edit-custom-form.component.scss']
})
export class DialogEditCustomFormComponent {
  data = {
    id: '',
    allowedCustomFormCount: ''
  };// Update data type as per your tenant model

  firstname: String = '';
  lastname: String = '';
  isSaving: boolean = false;
  isDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditCustomFormComponent>,
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
      const allowedCustomForms = this.data.allowedCustomFormCount
        // Add other properties as needed based on your API
  
      // Call the editTenant method for updating an existing tenant
      this.tenantsService.increaseCustomFormCount(this.data.id, allowedCustomForms).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after successful edit
          this.toast.success('Allowed cutom form count has been successfully updated');
          setTimeout(() => {
            window.location.reload();
          }, 1500); 
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          this.toast.error('Editing tenant failed!');
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
