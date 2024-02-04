import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-dialog-edit-allowed-user',
  templateUrl: './dialog-edit-allowed-user.component.html',
  styleUrls: ['./dialog-edit-allowed-user.component.scss']
})
export class DialogEditAllowedUserComponent {
  data = {
    name: '',
    companyDescription: '',
    expenses: '',
    validity: '',
    allowedUsersCount: '',
    id: '',
    allowedDiskSpace: '',
    website: '',
    iconHeader: '',
    iconFooter: '',
    accountName: '',
    connectionString: ''
  };// Update data type as per your tenant model

  firstname: String = '';
  lastname: String = '';
  isSaving: boolean = false;
  isDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAllowedUserComponent>,
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

      // Call the API for increasing the number of allowed users
      const count = this.data.allowedUsersCount/* Set the desired count value */

      this.tenantsService.increaseTenantUsers(this.data.id, count).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after a successful increase
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          alert('Failed to increase allowed users!');
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
