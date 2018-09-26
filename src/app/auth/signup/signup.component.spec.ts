import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let spyOnSubmitPost;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['createNewUser']);
  mockAuthService.createNewUser.and.callFake(() => of({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule, RouterModule],
      providers: [{ provide: AuthService, useValue: mockAuthService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit method', async(() => {
    spyOnSubmitPost = spyOn(component, 'onSubmit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(spyOnSubmitPost).toHaveBeenCalledTimes(0);
  }));

  it('form should be invalid', async(() => {
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.signupForm.controls['email'].setValue('toto@titi.com');
    component.signupForm.controls['password'].setValue('unpetitmotdepasse');
    expect(component.signupForm.valid).toBeTruthy();
  }));

  it('form should call authService', async(() => {
    spyOnSubmitPost = spyOn(component, 'onSubmit');
    component.signupForm.controls['email'].setValue('toto@titi.com');
    component.signupForm.controls['password'].setValue('unpetitmotdepasse');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    fixture.detectChanges();
    button.click();
    expect(spyOnSubmitPost).toHaveBeenCalledTimes(1);
    // expect(mockPostService.createNewPost).toHaveBeenCalledTimes(1);
  }));
});
