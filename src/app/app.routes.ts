import { Routes } from '@angular/router';
import { Auth } from './core/auth/auth';
import { Login } from './core/auth/login/login';
import { core } from '@angular/compiler';
import { register } from 'module';
import { Component } from '@angular/core';
import { Main } from './features/main/main';
import { Register } from './core/auth/register/register';
import { Forgetpassword } from './core/auth/forgetpassword/forgetpassword';
import { Feed } from './features/main/feed/feed';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: ``, redirectTo: `register`, pathMatch: `full` },
  {
    path: ``,
    component: Auth,
    children: [
      {
        path: `login`,
        loadComponent: () => import(`./core/auth/login/login`).then((m) => m.Login),
      },
      {
        path: `register`,
        loadComponent: () => import(`./core/auth/register/register`).then((m) => m.Register),
      },
      {
        path: `forgetpassword`,
        loadComponent: () =>
          import(`./core/auth/forgetpassword/forgetpassword`).then((m) => m.Forgetpassword),
      },
    ],
  },
  // {
  //   path: ``,
  //   redirectTo: `feed`,
  //   pathMatch: `full`,
  // },
  {
    path: ``,
    component: Main,
    children: [
      {
        path: `feed`,
        canActivate: [authGuard],
        loadComponent: () => import(`./features/main/feed/feed`).then((m) => m.Feed),
      },
      {
        path: `notifications`,
        canActivate: [authGuard],
        loadComponent: () =>
          import(`./features/main/notification/notification`).then((m) => m.Notification),
      },
      {
        path: `profile`,
        canActivate: [authGuard],
        loadComponent: () => import(`./features/main/profile/profile`).then((m) => m.Profile),
      },
      {
        path: `postDetails/:idPostDetails`,
        canActivate: [authGuard],
        loadComponent: () => import(`./features/main/feed/postdetails/postdetails`).then((m) => m.Postdetails),
      },
    ],
  },
  {
    path: `**`,
    loadComponent: () => import(`./features/main/notfound/notfound`).then((m) => m.Notfound),
  },
];
