import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { CATEGORIES, SORT_OPTIONS } from '../../shared/consts';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatIcon, MatFabButton, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly CATEGORIES = CATEGORIES;
  protected readonly SORT_OPTIONS = SORT_OPTIONS;

  selectedCategory = 'All Categories';
  selectedSortOption = 'Ascending';

  search = false;

  protected getAllArticles() {}

  protected getArticles() {}

  protected getArticlesByCategory(option: any) {}

  protected sorting(option: any) {}
}
