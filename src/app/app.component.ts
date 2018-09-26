import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyBd33mmcn0to7f4JdJW5bMrDW2MrQ4YCvY',
      authDomain: 'post-manager-b061c.firebaseapp.com',
      databaseURL: 'https://post-manager-b061c.firebaseio.com',
      projectId: 'post-manager-b061c',
      storageBucket: 'post-manager-b061c.appspot.com',
      messagingSenderId: '238174578915'
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }
}
