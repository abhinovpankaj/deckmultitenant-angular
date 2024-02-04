import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-dialog-edit-disk-space',
  templateUrl: './dialog-edit-disk-space.component.html',
  styleUrls: ['./dialog-edit-disk-space.component.scss']
})
export class DialogEditDiskSpaceComponent {
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
    public dialogRef: MatDialogRef<DialogEditDiskSpaceComponent>,
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

      // Call the API for adding disk space
      const diskSpace = this.data.allowedDiskSpace/* Set the desired disk space value */

      this.tenantsService.addDiskSpace(this.data.id, diskSpace).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after a successful addition
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          alert('Failed to add disk space!');
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
