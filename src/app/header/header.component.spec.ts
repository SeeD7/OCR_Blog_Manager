import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['signInUser']);
  mockAuthService.signInUser.and.callFake(() => of({}));
  const mockAuthGuardService = jasmine.createSpyObj('AuthService', ['canActivate']);
  mockAuthGuardService.canActivate.and.callFake(() => of(false));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{ provide: AuthService, useValue: mockAuthService},
        { provide: AuthGuardService, useValue: mockAuthGuardService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a list', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('ul').length).toBe(2);
  }));
  it('should have five list element', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li').length).toBe(5);
  }));
  it('should have four <a> tag when not authenticated', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('a').length).toBe(4);
    expect(compiled.querySelectorAll('a')[0].text).toContain('Liste des posts');
    expect(compiled.querySelectorAll('a')[1].text).toContain('Créer un post');
    expect(compiled.querySelectorAll('a')[2].text).toContain('Créer un compte');
    expect(compiled.querySelectorAll('a')[3].text).toContain('Connexion');
  }));
  it('should have four <a> tag when not authenticated', async(() => {
    component.isAuth = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('a').length).toBe(3);
    expect(compiled.querySelectorAll('a')[0].text).toContain('Liste des posts');
    expect(compiled.querySelectorAll('a')[1].text).toContain('Créer un post');
    expect(compiled.querySelectorAll('a')[2].text).toContain('Déconnexion');
  }));
});
