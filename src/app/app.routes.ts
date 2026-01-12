import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { AddNewArticle } from './components/add-new-article/add-new-article';
import { EditArticle } from './components/edit-article/edit-article';
import { Login } from './components/login/login';
import { SignUp } from './components/sing-up/sign-up';
import { Article } from './components/article/article';
import { EditProfile } from './components/edit-profile/edit-profile';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'sign-up',
    component: SignUp,
  },
  {
    path: 'add-new-article',
    component: AddNewArticle,
  },
  {
    path: 'edit-article/:id',
    component: EditArticle,
  },
  {
    path: 'article/:id',
    component: Article,
  },
  {
    path: 'edit-profile',
    component: EditProfile,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
