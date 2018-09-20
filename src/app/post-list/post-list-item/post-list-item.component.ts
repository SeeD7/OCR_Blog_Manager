import { Component, OnInit, Inject, Input } from '@angular/core';
import { Post } from '../../model/post-model';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

   @Input() post: Post;

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
  }

  loveIt() {
    this.post.loveIts++;
    this.postsService.savePosts();
  }

  dontLoveIt() {
    this.post.loveIts--;
    this.postsService.savePosts();
  }

  onDeletePost() {
    this.postsService.removePost(this.post);
    this.router.navigate(['/posts']);
  }
}
