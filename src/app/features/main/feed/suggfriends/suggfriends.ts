import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../../core/auth/services/auth';
import { sign } from 'crypto';
import { SerchFollwoersPipe } from '../../../../core/pipes/serch-follwoers-pipe';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-suggfriends',
  imports: [SerchFollwoersPipe, FormsModule],
  templateUrl: './suggfriends.html',
  styleUrl: './suggfriends.css',
})
export class Suggfriends {
  myWords :string =""
  allFrindes = signal<Friend[]>([]);
  private readonly auth: Auth = inject(Auth);
  ngOnInit(): void {
    this.getAllSuFirends();
  }
  getAllSuFirends() {
    this.auth.getSuggFriends().subscribe({
      next: (res) => {
        this.allFrindes.set(res.data.suggestions);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
