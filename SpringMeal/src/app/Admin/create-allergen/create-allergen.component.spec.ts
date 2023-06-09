import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAllergenComponent } from './create-allergen.component';

describe('CreateAllergenComponent', () => {
  let component: CreateAllergenComponent;
  let fixture: ComponentFixture<CreateAllergenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAllergenComponent]
    });
    fixture = TestBed.createComponent(CreateAllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
