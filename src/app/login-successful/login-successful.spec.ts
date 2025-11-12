import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSuccessful } from './login-successful';

describe('LoginSuccessful', () => {
  let component: LoginSuccessful;
  let fixture: ComponentFixture<LoginSuccessful>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSuccessful]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSuccessful);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
