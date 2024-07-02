import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-dialog-edit-validity',
  templateUrl: './dialog-edit-validity.component.html',
  styleUrls: ['./dialog-edit-validity.component.scss'],
})
export class DialogEditValidityComponent {
  data = {
    id: '',
    endDate: new Date(),
  }; // Update data type as per your tenant model

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

  // formatDateAndConvertToISO(date: Date): string {
  //   // Assuming you have a function to format the date
  //   const formattedDate = this.formatDate(date);
  
  //   // Converting to ISO format
  //   const isoFormattedDate = formattedDate ? new Date(formattedDate).toISOString() : "";
  
  //   return isoFormattedDate;
  // }
  
  // formatDate(date: Date): string {
  //   // Implement your own date formatting logic here
  //   // Example: 'MM-dd-yyyy'
  //   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //   return date.toLocaleDateString('en-US', options);
  // }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;

      const endDate = this.data.endDate.toISOString();
      console.log(endDate);

      this.tenantsService.updateValidityDate(this.data.id, {endDate}).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after a successful update
          this.toast.success('Tenant validity date updated successfully!')
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          this.toast.error('Failed to update tenant validity date!');
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
