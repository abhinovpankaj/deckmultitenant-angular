import { Component } from '@angular/core';
import { TenantsService } from '../tenants.service';
import { TenantUserService } from '../tenant-user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteClientComponent } from '../dialog-delete-client/dialog-delete-client.component';

@Component({
  selector: 'app-tenant-users',
  templateUrl: './tenant-users.component.html',
  styleUrls: ['./tenant-users.component.scss']
})
export class TenantUsersComponent {
  tenants: any[] = [];
  selectedTenant: any;
  filteredUsers: any[] = [];

  constructor(private tenantService: TenantsService, private tenantUserService: TenantUserService, private toast: HotToastService,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.fetchTenants();
  }

  fetchTenants() {
    // Assuming TenantService has a method to fetch tenants
    this.tenantService.getAllTenants().subscribe((data: any) => {
      this.tenants = data.Tenants;
    });
  }

  onTenantChange() {
    this.fetchUsers();
  }

  async fetchUsers(){
    this.filteredUsers = await this.tenantUserService.getAllUsers(this.selectedTenant.companyIdentifier);
  }

  async resetDevice(username: any){
    let user = await this.tenantUserService.updateUserDeviceId(username);
  }

  openDialog(username: any) {
    const dialogRef = this.dialog.open(DialogDeleteClientComponent, {data: {username}});
    dialogRef.afterClosed().subscribe((response) => {
      this.fetchUsers();
    });
  }

}
