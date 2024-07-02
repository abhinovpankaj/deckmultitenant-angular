import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dialog-add-form',
  templateUrl: './dialog-add-form.component.html',
  styleUrls: ['./dialog-add-form.component.scss']
})
export class DialogAddFormComponent {
  isSaving: boolean = false;
  form: any;

  constructor(private dialog: MatDialog, private toast: HotToastService){
    this.form = {
      items: [
        {
          id: 1233,
          question: 'Question text',
          type: 'text',
          options: ["Option 1", "Option 2", "Option 3", "Option 4"]
        }
      ]
    };
  }

  get items(){
    return this.form.items;
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;
      console.log(this.form);
      // this.tenantsService.addTenant(this.data).subscribe(
      //   (response) =>{
      //     console.log(response);
      //     this.isSaving = false;
      //     this.dialog.closeAll();
      //   },
        
      //   (error) =>{
      //     console.log(error);
      //     this.isSaving = false;
      //     alert('Adding tenant failed!');
      //   }
      // );
    } else {
      this.toast.error(
        'Please complete form with valid data! All fields need to contain a value.'
      );
    }
  }

  formValidator(){
    return true;
  }

  addItem(index: any){
    this.form.items.splice(index + 1, 0, {
      id: 1234,
      question: 'Question text',
      type: 'text',
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    })
  }

  removeItem(index: any){
    if (this.form.items.length > 1){
      this.form.items.splice(index, 1);
    }
  }

  addOption(itemIndex: any, optionIndex: any){
    this.form.items[itemIndex]?.options?.splice(optionIndex + 1, 0, `Option ${optionIndex+1}`)
  }

  removeOption(itemIndex: any, optionIndex: any){
    if (this.form.items[itemIndex]?.options?.length > 1){
      this.form.items[itemIndex]?.options?.splice(optionIndex, 1);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id; // or some unique identifier
  }
}
