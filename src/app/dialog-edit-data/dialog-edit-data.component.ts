import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dialog-edit-data',
  templateUrl: './dialog-edit-data.component.html',
  styleUrls: ['./dialog-edit-data.component.scss'],
})
export class DialogEditDataComponent {
  data = {
    id: '',
    iconHeader: '',
    iconFooter: '',
    companyIdentifier: '',
  };

  headerFile: File | null = null;
  footerFile: File | null = null;
  storedUsername: string | null = null;

  isSaving: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditDataComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private tenantsService: TenantsService,
    private toast: HotToastService,
    public loginService: LoginService
  ) {
    this.data = { ...dialogData };
  }

  ngOnInIt(){
    const storedUsername = localStorage.getItem('loggedInUsername');
    if (storedUsername) {
      // If available, set it to the component property
      this.storedUsername = storedUsername;
    } else {
      // Otherwise, get it from the service and store it
      this.storedUsername = this.loginService.currentlyLoggedInUsername;
      localStorage.setItem('loggedInUsername', this.storedUsername);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onFileSelected(type: string, event: any) {
    // const file = event.target.files && event.target.files[0];
    const file: File = event.target.files && event.target.files[0];
    if (type === 'iconHeader') {
      this.headerFile = file;
    } else if (type === 'iconFooter') {
      this.footerFile = file;
    }
  }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;
      let dataHeader = {
        'entityName': "header",
        'uploader': "anshgr",
        'containerName': this.data.companyIdentifier.replace(/\s+/g, '').toLowerCase(),
        'picture': this.headerFile,
        'id': this.data.id,
      }

      let dataFooter = {
        'entityName': "footer",
        'uploader': "anshgr",
        'containerName': this.data.companyIdentifier.replace(/\s+/g, '').toLowerCase(),
        'picture': this.footerFile,
        'id': this.data.id,
      }

      console.log("Header", dataHeader);
      console.log("Footer", dataFooter);
      const iconsData: any = {};
      // Upload icon header
      const headerUpload = this.headerFile
        ? this.tenantsService.uploadFile(dataHeader).subscribe(
          (response) => {
            console.log(response.url); // Close the dialog after a successful update
            iconsData["iconHeader"] = response.url;
          },
          (error) => {
            console.log("Header error", error);
            // alert('Failed to update or add icons for the tenant!');
          }
        )
        : null;

      // Upload icon footer
      const footerUpload = this.footerFile
       ? this.tenantsService.uploadFile(dataFooter).subscribe(
          (response) => {
            console.log(response.url); // Close the dialog after a successful update
            iconsData["iconFooter"] = response.url;
          },
          (error) => {
            console.log("Footer error", error);
            // alert('Failed to update or add icons for the tenant!');
          }
        )
        : null;

      
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
    return true; // Implement your validation logic
  }
}
