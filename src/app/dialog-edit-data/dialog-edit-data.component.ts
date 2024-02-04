import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';


@Component({
  selector: 'app-dialog-edit-data',
  templateUrl: './dialog-edit-data.component.html',
  styleUrls: ['./dialog-edit-data.component.scss'],
})
export class DialogEditDataComponent {
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
    public dialogRef: MatDialogRef<DialogEditDataComponent>,
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

      // Prepare the icon data
      const iconsData = {
        header: this.data.iconHeader /* Set the desired header icon data */,
        footer: this.data.iconFooter/* Set the desired footer icon data */,
      };

      // Call the API for updating or adding icons for a tenant
      this.tenantsService.upsertIcons(this.data.id, iconsData).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after a successful update
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          alert('Failed to update or add icons for the tenant!');
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