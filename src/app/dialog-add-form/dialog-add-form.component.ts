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
  multiValueComponents = ["Dropdown", "Radiobutton", "Checkbox"];
  form: any;
  
  constructor(private dialog: MatDialog, private toast: HotToastService){
    this.form = {
      questions: [
        {         
          name: '',
          type: 'Text',
          answer:'',
          allowedValues:[],
          answers:[],
          isMandatory:true,    
        }
      ]
    };
  }
  onChange(event: any) {
    //remove last question and add new
    this.form.questions.pop();
    var questionType =event.target.value;
    this.addquestion(this.form.questions.length,questionType);
    
  }
  get questions(){
    return this.form.questions;
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;
      console.log(this.form);
     
    } else {
      this.toast.error(
        'Please complete form with valid data! All fields need to contain a value.'
      );
    }
  }

  formValidator(){
    return true;
  }

  addquestion(index: any,questionType: string){
    console.log(questionType);
    var question = {          
      name: '',
      type: questionType,
      isMandatory:false,
      allowedValues:this.multiValueComponents.includes(questionType)? ['']:[],
      answers:[],
      answer:''
    } 
    
    this.form.questions.splice(index + 1, 0, question );
  }

  removequestion(index: any){
    if (this.form.questions.length > 1){
      this.form.questions.splice(index, 1);
    }
  }

  addOption(itemIndex: any, optionIndex: any){
    this.form.questions[itemIndex]?.allowedValues?.splice(optionIndex + 1, 0, `Option ${optionIndex+1}`)
  }

  removeOption(itemIndex: any, optionIndex: any){
    if (this.form.questions[itemIndex]?.allowedValues?.length > 1){
      this.form.questions[itemIndex]?.allowedValues?.splice(optionIndex, 1);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id; // or some unique identifier
  }
}
