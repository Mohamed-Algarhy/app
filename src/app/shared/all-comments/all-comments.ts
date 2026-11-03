import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommentService } from '../../core/auth/services/comment-service';
import { Comment } from '../../core/interfaces/Comment';

@Component({
  selector: 'app-all-comments',
  imports: [],
  templateUrl: './all-comments.html',
  styleUrls: ['./all-comments.css'],
})
export class AllComments implements OnInit {
  postId = input<string>('');
  // commentLimit: number = 1;
  allComments = signal<Comment[]>([]);

  private readonly commentService = inject(CommentService);

  ngOnInit(): void {
    this.getAllComments();
  }
  getAllComments() {
    if (this.postId()) {
      this.commentService.getPostComments(this.postId(), 1).subscribe({
        next: (res) => {
          this.allComments.set(res.data.comments);
          // const comments = res?.data?.comments ?? [];
          // this.allComments.set(comments.slice(0, this.commentLimit));
          console.log('post id : ', this.postId());
          console.log('Comments data:', this.allComments());
        },
        error: (err) => {
          console.error('Error fetching comments:', err);
        },
      });
    }
  }
}
