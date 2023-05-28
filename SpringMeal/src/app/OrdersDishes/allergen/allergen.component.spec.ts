import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenComponent } from './allergen.component';

describe('AllergenComponent', () => {
  let component: AllergenComponent;
  let fixture: ComponentFixture<AllergenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergenComponent]
    });
    fixture = TestBed.createComponent(AllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
