import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  data = {
    name: '',
    companyDescription: '',
    mobileUserCount: '',
    webUserCount: '',
    bothUserCount: '',
    id: '',
    allowedDiskSpace: '',
    website: '',
    endDate: '',
    footerText: '',
    showFooterlogo: false,
  };

  firstname: String = '';
  lastname: String = '';
  isSaving: boolean = false;

  // customImage: File | null;

  constructor(
    private dialog: MatDialog,
    private tenantsService: TenantsService,
    private toast: HotToastService,
  ) {}

  // formatEndDate(): string {
  //   const year = this.data.endDate.getFullYear();
  //   const month = (this.data.endDate.getMonth() + 1).toString().padStart(2, '0');
  //   const day = this.data.endDate.getDate().toString().padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // }

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;
      this.tenantsService.addTenant(this.data).subscribe(
        (response) =>{
          console.log(response);
          this.isSaving = false;
          this.dialog.closeAll();
        },
        
        (error) =>{
          console.log(error);
          this.isSaving = false;
          alert('Adding tenant failed!');
        }
      );
    } else {
      this.toast.error(
        'Please complete form with valid data! All fields need to contain a value.'
      );
    }
  }


  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.customImage = file;
  //   }
  // }

  // resetCustomImage() {
  //   this.customImage = null;
  // }

  formValidator() {
    let valid = true;
    for (const key in this.data) {
      if (key !== 'id' && key !== 'showFooterlogo' && !this.data[key as keyof typeof this.data]) {
        valid = false;
        break;
      }
    }
    return valid;
  }
  
}
