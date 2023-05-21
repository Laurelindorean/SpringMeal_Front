import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlotComponent } from './admin-slot.component';

describe('AdminSlotComponent', () => {
  let component: AdminSlotComponent;
  let fixture: ComponentFixture<AdminSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSlotComponent]
    });
    fixture = TestBed.createComponent(AdminSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
