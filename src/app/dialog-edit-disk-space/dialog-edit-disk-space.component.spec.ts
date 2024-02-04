import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDiskSpaceComponent } from './dialog-edit-disk-space.component';

describe('DialogEditDiskSpaceComponent', () => {
  let component: DialogEditDiskSpaceComponent;
  let fixture: ComponentFixture<DialogEditDiskSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditDiskSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditDiskSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
