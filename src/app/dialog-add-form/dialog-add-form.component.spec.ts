import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFormComponent } from './dialog-add-form.component';

describe('DialogAddFormComponent', () => {
  let component: DialogAddFormComponent;
  let fixture: ComponentFixture<DialogAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
