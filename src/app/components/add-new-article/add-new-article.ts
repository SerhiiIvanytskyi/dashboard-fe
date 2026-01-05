import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { Field, form, required } from '@angular/forms/signals';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { CATEGORIES } from '../../shared/consts';
import { Router, RouterLink } from '@angular/router';
import { Article } from '../../shared/interfaces';
import { Api } from '../../shared/services/api';

@Component({
  selector: 'app-add-new-article',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatIcon,
    MatCardActions,
    MatMiniFabButton,
    MatInput,
    MatButton,
    RouterLink,
    Field,
  ],
  templateUrl: './add-new-article.html',
  styleUrl: './add-new-article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewArticle {
  protected readonly form = form;
  protected readonly CATEGORIES = CATEGORIES;
  protected fileName: any;

  newArticleModel = signal({
    title: '',
    category: '',
    text: '',
  });

  newArticleForm = form(this.newArticleModel, (schemaPath) => {
    required(schemaPath.title);
    required(schemaPath.category);
    required(schemaPath.text);
  });

  private apiService = inject(Api);
  private router = inject(Router);

  createArticle(): void {
    const formData = this.newArticleForm;

    const article: Article = {
      title: formData.title().value(),
      category: formData.category().value(),
      text: formData.text().value(),
      date: new Date().toLocaleDateString(),
      imageUrl: '',
      userId: '',
      userName: '',
      userAvatar: '',
    };

    console.log(article);

    this.apiService.addNewArticle(article).subscribe((newArticle) => {
      console.log(newArticle);
      this.router.navigate(['/']);
    });
  }

  onClick(fileUpload: HTMLInputElement) {}

  onFileSelected($event: Event) {}
}
