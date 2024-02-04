import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAllowedUserComponent } from './dialog-edit-allowed-user.component';

describe('DialogEditAllowedUserComponent', () => {
  let component: DialogEditAllowedUserComponent;
  let fixture: ComponentFixture<DialogEditAllowedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditAllowedUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditAllowedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
