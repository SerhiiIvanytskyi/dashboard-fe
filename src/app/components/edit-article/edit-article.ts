import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CATEGORIES } from '../../shared/consts';
import { Field, form, required } from '@angular/forms/signals';
import { Api } from '../../shared/services/api';
import { Article } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-article',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatMiniFabButton,
    MatInput,
    MatIcon,
    MatCardActions,
    MatButton,
    RouterLink,
    MatCardTitle,
    Field,
  ],
  templateUrl: './edit-article.html',
  styleUrl: './edit-article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArticle implements OnInit {
  protected readonly CATEGORIES = CATEGORIES;

  editArticleModel = signal({
    title: '',
    category: '',
    text: '',
  });

  editArticleForm = form(this.editArticleModel, (schemaPath) => {
    required(schemaPath.title);
    required(schemaPath.category);
    required(schemaPath.text);
  });

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(Api);

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getArticle(id).subscribe((article) => {
        console.log(article);
        this.setDataToForm(article);
      });
    }
  }

  setDataToForm(article: Article): void {
    this.editArticleForm.title().setControlValue(article.title);
    this.editArticleForm.category().setControlValue(article.category);
    this.editArticleForm.text().setControlValue(article.text);
  }

  updateArticle(): void {
    const formData = this.editArticleForm;

    const article: Article = {
      title: formData.title().value(),
      category: formData.category().value(),
      text: formData.text().value(),
      date: new Date().toLocaleDateString(),
      imageUrl: '',
      userId: '',
      userName: '',
      userAvatar: '',
      id: this.route.snapshot.paramMap.get('id')!,
    };

    console.log(article);

    this.apiService.editArticle(article).subscribe((updatedArticle) => {
      console.log(updatedArticle);
      this.router.navigate(['/']);
    });
  }

  protected onFileSelected($event: Event) {}

  protected onClick(fileUpload: HTMLInputElement) {}
}
