import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditValidityComponent } from './dialog-edit-validity.component';

describe('DialogEditValidityComponent', () => {
  let component: DialogEditValidityComponent;
  let fixture: ComponentFixture<DialogEditValidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditValidityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
