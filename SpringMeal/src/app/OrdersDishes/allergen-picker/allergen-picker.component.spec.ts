import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenPickerComponent } from './allergen-picker.component';

describe('AllergenPickerComponent', () => {
  let component: AllergenPickerComponent;
  let fixture: ComponentFixture<AllergenPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergenPickerComponent]
    });
    fixture = TestBed.createComponent(AllergenPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
