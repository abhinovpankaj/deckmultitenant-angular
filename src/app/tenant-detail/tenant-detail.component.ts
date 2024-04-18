import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent {
  tenantDetails: any; // Adjust the type based on your tenant model
  showPassword: boolean[]; // Declare the array
  tenantId: string; 

  constructor(private route: ActivatedRoute, private tenantsService: TenantsService) {
    this.showPassword = Array(this.tenantDetails?.adminDetails.length).fill(false);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tenantId = params['id'];
      this.getTenantDetails(this.tenantId);
    });
  }

  formatBytesToGB(bytes: number): string {
    if (bytes === 0) return '0 GB';

    const gigabytes = bytes / (1024 ** 3); // Convert bytes to gigabytes
    return gigabytes.toFixed(2);
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

  toggleStatus(tenantId: string, status: boolean) {
    this.tenantsService
      .toggleShowFooterLogo(tenantId, !status)
      .subscribe(
        (response) => {
          console.log('Footer logo status toggled successfully:', response);
          // Update the current status after successful toggle
          this.tenantDetails.showFooterlogo = !status;
          window.location.reload();
        },
        (error) => {
          console.error('Error:', error);
          // Handle error, e.g., show an error message
        }
      );
  }

  // getTenantDetails(tenantId: string): void {
  //   this.tenantsService.getTenantById(tenantId).subscribe(
  //     (tenantDetails) => {
  //       this.tenantDetails = tenantDetails; // Update based on your API response structure
  //       console.log('Tenant Details:', this.tenantDetails);
  //     },
  //     (error) => {
  //       console.error('Error fetching tenant details:', error);
  //       // Handle the error (e.g., show an error message)
  //     }
  //   );
  // }

  togglePasswordVisibility(index: number): void {
    this.showPassword[index] = !this.showPassword[index];
  }
}
