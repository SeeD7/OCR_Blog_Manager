import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { PostsService } from '../services/posts.service';
import { of, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { Post } from '../model/post-model';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  const post1 = new Post('Un titre 1', 'Un contenu 1');
  post1.createdAt = new Date('24 Sep 2018 15:10:00 GMT').getTime();
  const post2 = new Post('Un titre 2', 'Un contenu 2');
  post2.createdAt = new Date('24 Sep 2018 15:10:00 GMT').getTime();

  const mockPostClient = jasmine.createSpyObj('PostsService', ['emitPosts']);
  mockPostClient.emitPosts.and.callFake(() => of({}));
  mockPostClient.postsSubject = new Subject<Post[]>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListComponent, PostListItemComponent ],
      imports: [ RouterTestingModule, RouterModule ],
      providers: [{ provide: PostsService, useValue: mockPostClient }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.posts = [post1, post2];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
