import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('signinComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let spyOnSubmitPost;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['createNewPost']);
  mockAuthService.createNewPost.and.callFake(() => of({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule, RouterModule],
      providers: [{ provide: AuthService, useValue: mockAuthService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
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
    component.signinForm.controls['email'].setValue('');
    component.signinForm.controls['password'].setValue('');
    expect(component.signinForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.signinForm.controls['email'].setValue('toto@titi.com');
    component.signinForm.controls['password'].setValue('unpetitmotdepasse');
    expect(component.signinForm.valid).toBeTruthy();
  }));

  it('form should call authService', async(() => {
    spyOnSubmitPost = spyOn(component, 'onSubmit');
    component.signinForm.controls['email'].setValue('toto@titi.com');
    component.signinForm.controls['password'].setValue('unpetitmotdepasse');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    fixture.detectChanges();
    button.click();
    expect(spyOnSubmitPost).toHaveBeenCalledTimes(1);
    // expect(mockPostService.createNewPost).toHaveBeenCalledTimes(1);
  }));
});
