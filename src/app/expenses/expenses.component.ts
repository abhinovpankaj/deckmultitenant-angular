import { Component } from '@angular/core';
import { TenantsService } from '../tenants.service';
import { TenantUserService } from '../tenant-user.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  tenants: any[] = [];
  selectedTenant: any;
  perGbCharge: number = 5; // Default value for per GB charge
  // perUserCharge: number = 1; // Default value for per GB charge
  perImageCharge: number = 0.25; // Default value for per GB charge
  perReportCharge: number = 2; // Default value for per GB charge
  perMobileUsersCountCharge: number = 1;
  perWebUsersCountCharge: number = 1;
  perBothUsersCountCharge: number = 2;
  spaceUsageExpense: number = 0;
  // allowedUsersExpense: number = 0;
  imageCountExpense: number = 0;
  reportsCountExpense: number = 0;
  mobileUsersCountExpense: number = 0;
  webUsersCountExpense: number = 0;
  bothUsersCountExpense: number = 0;

  spaceUsage: number = 0;
  // users: number = 0;
  reports: number = 0;
  images: number = 0;
  mobileUsersCount: number = 0;
  webUsersCount: number = 0;
  bothUsersCount: number = 0;

  totalExpenses: number = 0;

  constructor(private tenantService: TenantsService, private tenantUserService: TenantUserService) { }

  ngOnInit(): void {
    this.fetchTenants();
    this.calculateExpenses();
  }

  fetchTenants() {
    // Assuming TenantService has a method to fetch tenants
    this.tenantService.getAllTenants().subscribe((data: any) => {
      this.tenants = data.Tenants;
    });
  }

  async fetchUsersCount(){
    const data = await this.tenantUserService.getAllUsers(this.selectedTenant.companyIdentifier);
      data.forEach((user: any) =>{
        if (user.access_type === "mobile"){
          ++this.mobileUsersCount;
        }
        else if (user.access_type === "web"){
          ++this.webUsersCount;
        }
        else if (user.access_type === "both"){
          ++this.bothUsersCount;
        }
      })
  }

  onTenantChange() {
    this.calculateExpenses();
  }

  bytesToGB(bytes: any) {
    return bytes / Math.pow(1024, 3);
}


  async calculateExpenses() {
    if (this.selectedTenant && this.perGbCharge) {
      const spaceUsed = this.selectedTenant.usedDiskSpace? parseFloat(this.selectedTenant.usedDiskSpace) : 0;
      // this.users = this.selectedTenant.allowedUsersCount? parseInt(this.selectedTenant.allowedUsersCount): 0;
      this.reports = this.selectedTenant.reportsCount? parseInt(this.selectedTenant.reportsCount) : 0;
      this.images = this.selectedTenant.imageCount? parseInt(this.selectedTenant.imageCount) : 0;
      this.spaceUsage = parseFloat(this.bytesToGB(spaceUsed).toFixed(8));
      // console.log(spaceUsageInGB, users, reports, images);
      await this.fetchUsersCount();
      this.mobileUsersCountExpense = this.mobileUsersCount * this.perMobileUsersCountCharge;
      this.webUsersCountExpense = this.webUsersCount * this.perWebUsersCountCharge;
      this.bothUsersCountExpense = this.bothUsersCount * this.perBothUsersCountCharge;

      this.spaceUsageExpense = this.spaceUsage * this.perGbCharge;
      this.spaceUsageExpense = parseFloat(this.spaceUsageExpense.toFixed(6))
      // this.allowedUsersExpense = this.users * this.perUserCharge;
      this.reportsCountExpense = this.reports * this.perReportCharge;
      this.imageCountExpense = this.images * this.perImageCharge;
      const total = this.spaceUsageExpense + this.reportsCountExpense + this.imageCountExpense 
      + this.mobileUsersCountExpense + this.webUsersCountExpense + this.bothUsersCountExpense;
      this.totalExpenses = parseFloat(total.toFixed(2));
    }
  }
}
