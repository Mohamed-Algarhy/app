import { Component, inject, input, Output, output, signal } from '@angular/core';
import { Post } from '../../../../core/auth/services/post';
import { Auth } from '../../../../core/auth/services/auth';
import { User } from '../../../../core/interfaces/user';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-createpost',
  imports: [FormsModule],
  templateUrl: './createpost.html',
  styleUrl: './createpost.css',
})
export class Createpost {
  postImage: File | null = null;
  postForm = new FormData();
  postContent: string = ``;
  // @Output() creatPostFlag = new EventEmitter<boolean>();
  imagePaht: string = ``;
  readonly creatPostEvent = output<boolean>();
  private readonly authService: Auth = inject(Auth);
  private readonly postService: Post = inject(Post);
  // creatpost = input<Post>({} as Post);
  userData = signal<User>({} as User);
  ngOnInit(): void {
    this.userData.set(this.authService.userData());
    this.checkbuttomupload();
  }
  checkbuttomupload() {
    if (this.postContent || this.postImage) {
    }
  }
  createPost() {

if (this.postContent) {
this.postForm.set('body', this.postContent);
}

if (this.postImage) {
this.postForm.set('image', this.postImage);
}

// Call Backend
this.postService.creatPost(this.postForm).subscribe({

 next: (res) => {

  console.log(res);

  // Clear text
  this.postContent = '';

  // Clear image
  this.postImage = null;

  // Clear image preview
  this.imagePaht = '';

  // Reset FormData
  this.postForm = new FormData();

  // Notify Parent
  this.creatPostEvent.emit(true);

},

error: (err) => {
  console.log(err);
},
 
});

}


  // =============
  test(e: any) {
    this.postImage = e.target.files[0];
    // i need the  pass to pass the image in creatpost.html
    this.imagePaht = URL.createObjectURL(this.postImage!);
  }

  // =============

  deleteImage() {
    if (this.imagePaht) {
      URL.revokeObjectURL(this.imagePaht);
    }

    this.postImage = null;
    this.imagePaht = '';
  }
}
