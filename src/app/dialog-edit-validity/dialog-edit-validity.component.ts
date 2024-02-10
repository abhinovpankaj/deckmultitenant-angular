import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-dialog-edit-validity',
  templateUrl: './dialog-edit-validity.component.html',
  styleUrls: ['./dialog-edit-validity.component.scss']
})
export class DialogEditValidityComponent {
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
    connectionString: '',
    endDate: '',
  };// Update data type as per your tenant model

  firstname: String = '';
  lastname: String = '';
  isSaving: boolean = false;
  isDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditValidityComponent>,
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

      // Call the API for updating tenant validity date
      const endDate = this.data.endDate;
      console.log(endDate);
      
      this.tenantsService.updateValidityDate(this.data.id, endDate).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after a successful update
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          alert('Failed to update tenant validity date!');
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
