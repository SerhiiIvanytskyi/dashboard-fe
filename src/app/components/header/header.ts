import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AVATAR } from '../../shared/consts';
import { UserData } from '../../shared/interfaces';
import { Auth } from '../../shared/services/auth';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-header',
  imports: [MatButton, MatIcon, RouterLink, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly AVATAR = AVATAR;
  user!: UserData;

  private auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef);
  private userService = inject(User);

  constructor() {
    effect(() => {
      this.getUserData();
    });
  }

  getUserData(): void {
    this.user = this.userService.getUserData();
    this.cdr.detectChanges();
  }

  logout(): void {
    this.auth.logout();
    this.getUserData();
  }
}
