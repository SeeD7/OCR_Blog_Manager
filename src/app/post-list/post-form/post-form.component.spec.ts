import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PostListComponent } from '../post-list.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let spyOnSavePost;

  const mockRouterService = jasmine.createSpyObj('Router', ['navigate']);
  mockRouterService.navigate.and.callFake(() => of({}));
  const mockPostService = jasmine.createSpyObj('PostsService', ['createNewPost']);
  mockPostService.createNewPost.and.callFake(() => of({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [ ReactiveFormsModule, FormsModule ],
      providers: [{ provide: PostsService, useValue: mockPostService },
        { provide: Router, useValue: mockRouterService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSavePost method', async(() => {
    spyOnSavePost = spyOn(component, 'onSavePost');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(spyOnSavePost).toHaveBeenCalledTimes(0);
  }));

  it('form should be invalid', async(() => {
    component.postForm.controls['title'].setValue('');
    component.postForm.controls['content'].setValue('');
    expect(component.postForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.postForm.controls['title'].setValue('Un titre');
    component.postForm.controls['content'].setValue('Un contenu');
    expect(component.postForm.valid).toBeTruthy();
  }));

  it('form should call postsService', async(() => {
    spyOnSavePost = spyOn(component, 'onSavePost').and.callThrough();
    component.postForm.controls['title'].setValue('Un titre');
    component.postForm.controls['content'].setValue('Un contenu');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    fixture.detectChanges();
    button.click();
    expect(spyOnSavePost).toHaveBeenCalledTimes(1);
    expect(mockPostService.createNewPost).toHaveBeenCalledTimes(1);
  }));
});
