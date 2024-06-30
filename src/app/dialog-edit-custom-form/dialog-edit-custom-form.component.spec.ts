import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCustomFormComponent } from './dialog-edit-custom-form.component';

describe('DialogEditCustomFormComponent', () => {
  let component: DialogEditCustomFormComponent;
  let fixture: ComponentFixture<DialogEditCustomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditCustomFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditCustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
