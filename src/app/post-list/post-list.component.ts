import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../model/post-model';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;

  constructor(private postService: PostsService, private router: Router) { }

  ngOnInit() {
    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }, (error) => {
        console.log('An error occure', error);
      }
    );
    this.postService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) { this.postsSubscription.unsubscribe(); }
  }
}
