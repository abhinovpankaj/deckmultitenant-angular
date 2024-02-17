import { Tenant } from './../models/tenant';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent {
  tenantDetails: any; // Adjust the type based on your tenant model

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tenantsService: TenantsService // Inject your TenantsService
  ) {
    this.getTenantDetails(data);
  }

  getTenantDetails(tenantId: string): void {
    this.tenantsService.getTenantById(tenantId).subscribe(
      (tenantDetails) => {
        this.tenantDetails = tenantDetails.Tenant;
        console.log("tenant", this.tenantDetails);
        
      },
      (error) => {
        console.error('Error fetching tenant details:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }
}
