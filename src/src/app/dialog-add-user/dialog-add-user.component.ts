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
    expenses: '',
    validity: '',
    allowedUsersCount: '',
    id: '',
    allowedDiskSpace: '',
    website: '',
  };

  firstname: String = '';
  lastname: String = '';

  // customImage: File | null;

  constructor(
    private dialog: MatDialog,
    private tenantsService: TenantsService,
    private toast: HotToastService
  ) {}

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    if (this.formValidator()) {
      this.tenantsService.addTenant(this.data).subscribe(
        (response) =>{
          console.log(response);
        },
        
        (error) =>{
          console.log(error);
        }
      );
      this.dialog.closeAll();
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
    let data = this.data as any;
    this.data.name = `${this.firstname} ${this.lastname}`;
    for (const key in this.data) {
      if (key === 'id') {
        continue;
      }
      if (data[key] === '' || !data[key]) {
        valid = false;
        break;
      }
    }
    return valid;
  }
}
