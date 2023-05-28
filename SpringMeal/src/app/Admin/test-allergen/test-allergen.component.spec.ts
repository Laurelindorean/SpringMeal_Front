import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAllergenComponent } from './test-allergen.component';

describe('TestAllergenComponent', () => {
  let component: TestAllergenComponent;
  let fixture: ComponentFixture<TestAllergenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAllergenComponent]
    });
    fixture = TestBed.createComponent(TestAllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
