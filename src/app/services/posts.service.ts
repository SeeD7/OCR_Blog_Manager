import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataSnapshot } from 'firebase/database';
import * as firebase from 'firebase';
import { Post } from '../model/post-model';

@Injectable()
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts();
  }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts').on('value', (data: DataSnapshot) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Posts' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const PostIndexToRemove = this.posts.findIndex(
      (PostEl) => {
        if (PostEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(PostIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }
}
