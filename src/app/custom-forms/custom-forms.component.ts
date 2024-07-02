import { Component } from '@angular/core';
import { TenantsService } from '../tenants.service';
import { TenantUserService } from '../tenant-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddFormComponent } from '../dialog-add-form/dialog-add-form.component';

@Component({
  selector: 'app-custom-forms',
  templateUrl: './custom-forms.component.html',
  styleUrls: ['./custom-forms.component.scss']
})
export class CustomFormsComponent {
  tenants: any[] = [];
  selectedTenant: any;
  constructor(private tenantService: TenantsService, private tenantUserService: TenantUserService, 
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

  async fetchUsersCount(){
    const data = await this.tenantUserService.getAllUsers(this.selectedTenant.companyIdentifier);
     
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddFormComponent, {});

    dialogRef.afterClosed().subscribe(() => {
     
    });
  }

}
