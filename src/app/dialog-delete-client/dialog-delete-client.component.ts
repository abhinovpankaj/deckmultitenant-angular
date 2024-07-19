import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TenantUserService } from '../tenant-user.service';

@Component({
  selector: 'app-dialog-delete-client',
  templateUrl: './dialog-delete-client.component.html',
  styleUrls: ['./dialog-delete-client.component.scss'],
})
export class DialogDeleteClientComponent {
  url: any;
  success: boolean = true;

  constructor(
    private dialog: MatDialog,
    private tenantUserService: TenantUserService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async deleteClientAccount() {
    await this.tenantUserService.deleteUser(this.data.username);
    this.dialog.closeAll();
  }
}
