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
  selectedImage = signal<File | null>(null);
  fileName = '';

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
    const model = this.editArticleForm;
    const formData = new FormData();

    formData.append(
      'req',
      new Blob(
        [
          JSON.stringify({
            title: model.title().value(),
            category: model.category().value(),
            text: model.text().value(),
            date: new Date().toLocaleDateString(),
            userId: '',
            userName: '',
            userAvatar: '',
            id: this.route.snapshot.paramMap.get('id')!,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (this.selectedImage()) {
      formData.append('imageFile', this.selectedImage()!);
    }

    this.apiService.editArticle(formData).subscribe((newArticle) => {
      this.router.navigate(['/']);
    });
  }

  onClick(fileUpload: HTMLInputElement): void {
    fileUpload.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.selectedImage.set(file);
    this.fileName = file.name;
  }
}
