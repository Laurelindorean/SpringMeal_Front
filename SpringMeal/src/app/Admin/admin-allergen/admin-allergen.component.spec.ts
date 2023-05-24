import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllergenComponent } from './admin-allergen.component';

describe('AdminAllergenComponent', () => {
  let component: AdminAllergenComponent;
  let fixture: ComponentFixture<AdminAllergenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAllergenComponent]
    });
    fixture = TestBed.createComponent(AdminAllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
