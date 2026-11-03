// import { Component, inject, signal } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Post as PostService } from '../../../../core/auth/services/post';
// import { Post as PostInterface } from '../../../../core/interfaces/post.inrerface';

// @Component({
//   selector: 'app-postdetails',
//   imports: [],
//   templateUrl: './postdetails.html',
//   styleUrl: './postdetails.css',
// })
// export class Postdetails {
//   // ActivatedRoute
//   postData = signal<PostInterface>({} as PostInterface);
//   private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
//   // private readonly post: Post = inject(Post);
//   private readonly postService: PostService = inject(PostService);
//   onePostId: string | null = '';
//   ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe({
//       next: (res) => {
//         console.log(res.get(`idPostDetails`));
//         this.onePostId = res.get(`idPostDetails`);
//         this.postService.getSinglePost(this.onePostId ? this.onePostId : '')?.subscribe({
//           next: (res) => {
//             console.log(res)
//             this.postData.set(res.data.post);
//           },
//           error: (err) => {
//             console.log(err);
//           },
//         });
//       },
//     });
//   }
// }
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post as PostService } from '../../../../core/auth/services/post';
import { Post as PostInterface } from '../../../../core/interfaces/post.inrerface';

@Component({
  selector: 'app-postdetails',
  imports: [],
  templateUrl: './postdetails.html',
  styleUrl: './postdetails.css',
})
export class Postdetails implements OnInit {
  postData = signal<PostInterface>({} as PostInterface);

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postService = inject(PostService);

  onePostId: string | null = null;

  ngOnInit(): void {
 this.activatedRoute.paramMap.subscribe({
  next: (params) => {

    this.onePostId = params.get('idPostDetails');

    console.log('Post ID:', this.onePostId);

    if (!this.onePostId) {
      console.error('Post ID not found in route!');
      return;
    }

    this.postService.getSinglePost(this.onePostId).subscribe({
      next: (res) => {
        console.log('Single Post Response:', res);
        this.postData.set(res.data.post);
      },
      error: (err) => {
        console.log('API Error:', err);
      },
    });

  },
});
   }
}
