import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditWebsiteComponent } from './dialog-edit-website.component';

describe('DialogEditWebsiteComponent', () => {
  let component: DialogEditWebsiteComponent;
  let fixture: ComponentFixture<DialogEditWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
