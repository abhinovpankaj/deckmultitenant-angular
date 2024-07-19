import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { FormsService } from "../forms.service";

@Component({
  selector: 'app-dialog-add-form',
  templateUrl: './dialog-add-form.component.html',
  styleUrls: ['./dialog-add-form.component.scss']
})
export class DialogAddFormComponent implements OnInit {
  isSaving: boolean = false;
  multiValueComponents = ["Dropdown", "Radiobutton", "Checkbox"];
  form: any;
  isForEdit: boolean = false;
  selectedTenantObj: any = {};
  selectedFormObj: any = {};
  selectedForm: any = {};
  loadingObj: any = {};
  isShowError: boolean = false;

  constructor(private dialog: MatDialog, private toast: HotToastService, private formsService: FormsService,
              public dialogRef: MatDialogRef<DialogAddFormComponent>){
    this.form = {
      questions: [
        {
          name: '',
          type: 'Text',
          answer:'',
          allowedValues:[],
          multipleAnswers:[],
          isMandatory:true,
        }
      ]
    };
  }

  ngOnInit() {
    const selectedTenant = JSON.parse(JSON.stringify(this.selectedTenantObj));
    this.selectedForm = JSON.parse(JSON.stringify(this.selectedFormObj));
    this.form.name = (this.selectedForm && this.selectedForm.name) ? this.selectedForm.name : '';
    if (selectedTenant) {
      this.form.companyIdentifier = selectedTenant.companyIdentifier;
    }
    if (this.selectedForm && this.selectedForm._id) {
      this.form = this.selectedForm;
      if (!this.form.questions.length) {
        this.form.questions = [
          {
            name: '',
            type: 'Text',
            answer:'',
            allowedValues:[],
            multipleAnswers:[],
            isMandatory:true,
          }
        ];
      }
      this.isForEdit = true;
    }
  }

  onChange(event: any, question: any, index: number) {
    const questionType = event.target.value;
    const newQuestionObj: any = {
      name: question?.name || '',
      type: questionType,
      isMandatory: question.isMandatory,
      allowedValues: this.multiValueComponents.includes(questionType) ? ((question.allowedValues && question.allowedValues.length) ? question.allowedValues : ['']) : [],
      multipleAnswers: [],
      answer: ''
    };
    if (question._id) {
      newQuestionObj._id = question._id;
    }
    this.form.questions.splice(index, 1, newQuestionObj);
  }
  get questions(){
    return this.form.questions;
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    if (this.formValidator()) {
      if (this.isForEdit) {
        this.updateForm();
      } else {
        this.addForm();
      }
    } else {
      this.toast.error(
        'Please complete form with valid data! All fields need to contain a value.'
      );
    }
  }

  addForm(): any {
    if (this.isSaving) {
      return false;
    }
    this.isSaving = true;
    this.formsService.addForm(this.form).subscribe(
      (result)=>{
        if (result.success) {
          this.dialogRef.close(result.success);
        }
      },
      (error)=>{
        if (error && error.error && error.error.message) {
          this.toast.error(error.error.message);
        } else {
          this.toast.error((error as any).toString());
        }
        this.isSaving = false;
      }
    );
  }

  updateForm(): any {
    if (this.isSaving) {
      return false;
    }
    this.isSaving = true;
    let formObj = JSON.parse(JSON.stringify(this.form));
    delete formObj._id;
    this.formsService.editForm(this.form._id, formObj).subscribe(
      (result)=>{
        if (result.success) {
          this.dialogRef.close(result.success);
        }
      },
      (error)=>{
        if (error && error.error && error.error.message) {
          this.toast.error(error.error.message);
        } else {
          this.toast.error((error as any).toString());
        }
        this.isSaving = false;
      }
    );
  }

  formValidator(){
    let flag: boolean = true;
    this.isShowError = false;
    if (!this.form.name || this.form.name === '') {
      this.isShowError = true;
      flag = false;
    }

    this.form.questions.forEach((questionObj: any) => {
      if (!questionObj.name || questionObj.name === '') {
        this.isShowError = true;
        flag = false;
        questionObj.error = true;
      } else {
        delete questionObj.error;
      }

      if (questionObj.type !== 'Text' && questionObj.type !== 'Textarea') {
        if (!questionObj.allowedValues.length) {
          this.isShowError = true;
          flag = false;
        } else {
          let subFlag: boolean = false;
          questionObj.allowedValues.forEach((value: any) => {
            if (!value || value === '') {
              this.isShowError = true;
              flag = false;
              subFlag = true;
            }
          });
          if (subFlag) {
            questionObj.optionError = subFlag;
          } else {
            delete questionObj.optionError;
          }
        }
      }
    })

    return flag;
  }

  async addquestion(){
    const newQuestionObj: any = {
      name: '',
      type: 'Text',
      isMandatory: false,
      allowedValues: [],
      multipleAnswers: [],
      answer: ''
    };
    this.form.questions.push(newQuestionObj);
  }

  saveQuestion(index: number) {
    let question = JSON.parse(JSON.stringify(this.form.questions[index]));
    if (question._id) {
      this.updateQuestionToForm(index);
    } else {
      this.addQuestionToForm(question, index);
    }
  }

  addQuestionToForm(newQuestionObj: any, index: number): any {
    if (this.loadingObj[index]) {
      return false;
    }
    this.loadingObj[index] = true;
    this.formsService.addQuestionToForm(this.form._id, newQuestionObj).subscribe(
      (result)=>{
        if (result.success) {
          newQuestionObj._id = result._id;
          this.form.questions.splice(index, 1, newQuestionObj);
          // this.form.questions.push(newQuestionObj);
          this.toast.success('Question added successfully');
        } else {
          this.toast.error(`Failed to add the question`);
        }
        this.loadingObj[index] = false;
      },
      (error)=>{
        // this.toast.error((error as any).toString());
        this.toast.error(`Failed to add the question`);
        this.loadingObj[index] = false;
      }
    );
  }

  updateQuestionToForm(index: number): any {
    let question = JSON.parse(JSON.stringify(this.form.questions[index]));
    if (question._id) {
      if (this.loadingObj[index]) {
        return false;
      }
      this.loadingObj[index] = true;
      const questionId: string = question._id;
      delete question._id;
      this.formsService.updateQuestionToForm(this.form._id, questionId, question).subscribe(
        (result)=>{
          if (result.success) {
            this.toast.success('Question updated successfully');
          } else {
            this.toast.error(`Failed to update the question`);
          }
          this.loadingObj[index] = false;
        },
        (error)=>{
          // this.toast.error((error as any).toString());
          this.toast.error(`Failed to update the question`);
          this.loadingObj[index] = false;
        }
      );
    }
  }

  removequestion(index: any): any{
    if (this.form.questions.length > 1){
      const question = this.form.questions[index];

      if (question._id) {
        if (this.loadingObj[index]) {
          return false;
        }
        this.loadingObj[index] = true;
        this.formsService.deleteQuestionToForm(this.form._id, question._id).subscribe(
          (result) => {
            if (result.success) {
              this.form.questions.splice(index, 1);
              this.toast.success('Question removed successfully');
            } else {
              this.toast.error(`Failed to remove the question`);
            }
            this.loadingObj[index] = false;
          },
          (error) => {
            // this.toast.error((error as any).toString());
            this.toast.error(`Failed to remove the question`);
            this.loadingObj[index] = false;
          }
        );
      } else {
        this.form.questions.splice(index, 1);
      }
    }
  }

  addOption(itemIndex: any, optionIndex: any){
    this.form.questions[itemIndex]?.allowedValues?.splice(optionIndex + 1, 0, ``)
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
