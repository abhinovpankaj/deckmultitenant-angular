import { Component } from '@angular/core';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  tenants: any[] = [];
  selectedTenant: any;

  constructor(private tenantService: TenantsService) { }

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
  }
}
