import { Component, inject, Input, input, signal, output } from '@angular/core';
import { Post as PostInterface } from '../../../core/interfaces/post.inrerface';
import { User } from '../../../core/interfaces/user';
import { AllComments } from '../../all-comments/all-comments';
import { Auth } from '../../../core/auth/services/auth';
import { Post as PostService } from '../../../core/auth/services/post';
import { RouterLink } from '@angular/router';
import { GenderUserPipe } from '../../../core/pipes/gender-user-pipe';
@Component({
  selector: 'app-posts',
  imports: [AllComments, RouterLink, GenderUserPipe],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  // allcomments = signal<User[]>([]);

  // onePost = @input<any>();
  // @Input() onePost = []
  postDeleted = output<string>();
  private readonly postService: PostService = inject(PostService);
  onePost = input<PostInterface>({} as PostInterface);
  private readonly authService: Auth = inject(Auth);

  //hiden drop dawon put if is me is show
  sameUser() {
    return this.authService.userData()._id == this.onePost().user._id ? true : false;
    // this.authService.userData()._id;
  }

  //Delet post
  DeletePost(postId: string) {
    let userResponse = confirm('Are you sure ??');

    if (userResponse) {
      this.postService.deletPost(postId).subscribe({
        next: (res) => {
          console.log(res);

          // Send deleted post ID to Parent
          this.postDeleted.emit(postId);
        },

        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  //drop dawon in delet and save and edite
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
