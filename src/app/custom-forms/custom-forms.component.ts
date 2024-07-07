import { Component } from '@angular/core';
import { TenantsService } from '../tenants.service';
import { FormsService } from '../forms.service';
import { TenantUserService } from '../tenant-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddFormComponent } from '../dialog-add-form/dialog-add-form.component';
import { Form } from '../models/form';
import { HotToastService } from "@ngneat/hot-toast";



@Component({
  selector: 'app-custom-forms',
  templateUrl: './custom-forms.component.html',
  styleUrls: ['./custom-forms.component.scss']
})
export class CustomFormsComponent {
  tenants: any[] = [];
  forms:Form[]=[];
  selectedTenant: any;
  selectedForm?: Form;

  constructor(private tenantService: TenantsService, private tenantUserService: TenantUserService, private formsService:FormsService,
    private dialog: MatDialog, private toast: HotToastService) { }

  ngOnInit(): void {
    this.fetchTenants();

  }

  fetchTenants() {
    // Assuming TenantService has a method to fetch tenants
    this.tenantService.getAllTenants().subscribe((data: any) => {
      this.tenants = data.Tenants;
    });
  }
  fetchForms(tenant:string){
    this.formsService.getAllForms(tenant).subscribe((data: any)=>{
        this.forms = data.forms || [];
    });
  }
  async fetchUsersCount(){
    const data = await this.tenantUserService.getAllUsers(this.selectedTenant.companyIdentifier);

  }
  onTenantSelected(event:any){
    //console.log(this.selectedTenant.icons.logoUrl);
    this.fetchForms(this.selectedTenant.companyIdentifier);
  }
  openDialog(isForEdit: boolean = false, index: number = 0) {
    const dialogRef = this.dialog.open(DialogAddFormComponent, {});
    dialogRef.componentInstance.selectedTenantObj = this.selectedTenant || {};
    dialogRef.componentInstance.selectedFormObj = isForEdit ? (this.selectedForm || {}) : {};
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.toast.success('Location form saved successfully');
      }
      this.fetchForms(this.selectedTenant.companyIdentifier);
    });
  }

  onSelect(form: Form, index: number = 0): void {
    this.selectedForm = form;
    this.openDialog(true, index);
  }

  deleteForm(formId: string, index: number = 0) {
    this.formsService.deleteFormPermanently(formId).subscribe((result: any)=>{
      if (result.success) {
        this.forms.splice(index, 1);
        this.toast.success('Location form deleted successfully');
      } else {
        this.toast.error(`Failed to delete the Location form`);
      }
    }, (error)=>{
      this.toast.error(`Failed to delete the Location form`);
    });
  }

}
