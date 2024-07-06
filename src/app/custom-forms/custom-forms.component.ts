import { Component } from '@angular/core';
import { TenantsService } from '../tenants.service';
import { FormsService } from '../forms.service';
import { TenantUserService } from '../tenant-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddFormComponent } from '../dialog-add-form/dialog-add-form.component';
import { Form } from '../models/form';



@Component({
  selector: 'app-custom-forms',
  templateUrl: './custom-forms.component.html',
  styleUrls: ['./custom-forms.component.scss']
})
export class CustomFormsComponent {
  tenants: any[] = [];
  forms:Form[]=[];
  selectedTenant: any;
  constructor(private tenantService: TenantsService, private tenantUserService: TenantUserService, private formsService:FormsService,
    private dialog: MatDialog) { }

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
        this.forms = data.projects;
    });
  }
  async fetchUsersCount(){
    const data = await this.tenantUserService.getAllUsers(this.selectedTenant.companyIdentifier);
     
  }
  onTenantSelected(event:any){ 
    //console.log(this.selectedTenant.icons.logoUrl);
    this.fetchForms(this.selectedTenant.companyIdentifier);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddFormComponent, {});

    dialogRef.afterClosed().subscribe(() => {
     
    });
  }
  
  selectedForm?: Form;

  onSelect(form: Form): void {
    this.selectedForm = form;
  }

}
