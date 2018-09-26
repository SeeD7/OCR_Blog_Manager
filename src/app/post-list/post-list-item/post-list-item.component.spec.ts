import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListItemComponent } from './post-list-item.component';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Post } from '../../model/post-model';
import { By } from '@angular/platform-browser';
import { Button } from 'protractor';

describe('PostListItemComponent', () => {
  let component: PostListItemComponent;
  let fixture: ComponentFixture<PostListItemComponent>;
  const post = new Post('Un titre', 'Un contenu');
  post.createdAt = new Date('24 Sep 2018 15:10:00 GMT').getTime();

  const mockPostsService = jasmine.createSpyObj('PostsService', ['savePosts']);
  mockPostsService.savePosts.and.callFake(() => of({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListItemComponent ],
      imports: [ RouterTestingModule, RouterModule ],
      providers: [{ provide: PostsService, useValue: mockPostsService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListItemComponent);
    component = fixture.componentInstance;
    component.post = post;
    fixture.detectChanges();
    mockPostsService.savePosts.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Content is setted', () => {
    it('shoud have the title set', async(() => {
      const title = fixture.debugElement.nativeElement;
      expect(title.querySelector('h3').textContent).toContain('Un titre');
    }));

    it('shoud have the date set', async(() => {
      const title = fixture.debugElement.nativeElement;
      expect(title.querySelector('.date').textContent).toContain('9/24/18, 5:10 PM');
    }));

    it('shoud have the content set', async(() => {
      const title = fixture.debugElement.nativeElement;
      expect(title.querySelector('.content').textContent).toContain('Un contenu');
    }));
  });

  describe('Call to functions', () => {
    it('shoud modify loveIt and call loveIt function', async(() => {
      const loves = component.post.loveIts;
      const spy = spyOn(component, 'loveIt').and.callThrough();
      const loveItButton = fixture.debugElement.query(By.css('button.loveIt')).nativeElement;
      fixture.detectChanges();
      loveItButton.click();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockPostsService.savePosts).toHaveBeenCalledTimes(1);
      expect(component.post.loveIts).toEqual(loves + 1);
    }));

    it('shoud modify loveIt and call dontLoveIt function', async(() => {
      const loves = component.post.loveIts;
      const spy = spyOn(component, 'dontLoveIt').and.callThrough();
      const loveItButton = fixture.debugElement.query(By.css('button.dontLoveIt')).nativeElement;
      fixture.detectChanges();
      loveItButton.click();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockPostsService.savePosts).toHaveBeenCalledTimes(1);
      expect(component.post.loveIts).toEqual(loves - 1);
    }));

    it('shoud call onDeletePost function', async(() => {
      const loves = component.post.loveIts;
      const spy = spyOn(component, 'onDeletePost');
      const loveItButton = fixture.debugElement.query(By.css('button.delete')).nativeElement;
      fixture.detectChanges();
      loveItButton.click();
      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });
});
