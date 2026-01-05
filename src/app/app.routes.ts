import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { AddNewArticle } from './components/add-new-article/add-new-article';
import { EditArticle } from './components/edit-article/edit-article';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'add-new-article',
    component: AddNewArticle
  },
  {
    path: 'edit-article/:id',
    component: EditArticle
  },
  {
    path: '**',
    redirectTo: '',
  },
];
