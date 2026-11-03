import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Auth } from '../../../core/auth/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private authService = inject(Auth);
  private router = inject(Router);
  navUserData = this.authService.userData;
  ngOnInit(): void {
    // تفعيل تفاعلات Flowbite
    initFlowbite();
  }

  logout(): void {
    localStorage.removeItem(`usertoken`);
    localStorage.removeItem(`userData`);
    this.router.navigate( [`/login`])
  }
}
