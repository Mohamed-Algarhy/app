import { Component, inject, OnInit, signal,  } from '@angular/core';
import { Post } from '../../../core/auth/services/post';
import { Posts } from '../../../shared/posts.component/posts/posts';
import { Post as PostModel } from '../../../core/interfaces/post.inrerface';
import { Createpost } from './createpost/createpost';
import { Suggfriends } from './suggfriends/suggfriends';

@Component({
  selector: 'app-feed',
  imports: [Posts, Createpost , Suggfriends],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed implements OnInit {
  private readonly postService = inject(Post);

  allPosts = signal<PostModel[]>([]);

  ngOnInit(): void {
    this.feedgetAllPosts();
  }
  feedgetAllPosts(X?: any) {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.allPosts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removePost(postId: string) {

  this.allPosts.update(posts =>
    posts.filter(post => post._id !== postId)
  );

}
}
