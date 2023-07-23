import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueSignUpComponent } from './continue-sign-up.component';

describe('ContinueSignUpComponent', () => {
  let component: ContinueSignUpComponent;
  let fixture: ComponentFixture<ContinueSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinueSignUpComponent]
    });
    fixture = TestBed.createComponent(ContinueSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
