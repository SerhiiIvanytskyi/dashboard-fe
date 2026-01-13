import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Field, form } from '@angular/forms/signals';
import { User } from '../../shared/services/user';
import { UserTokenData } from '../../shared/interfaces';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-edit-profile',
  imports: [MatFormField, MatLabel, MatError, MatInput, MatButton, RouterLink, Field],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfile implements OnInit {
  user!: UserTokenData;

  editProfileModel = signal({
    name: '',
    age: '',
  });

  editProfileForm = form(this.editProfileModel);

  private userService = inject(User);
  private auth = inject(Auth);
  private router = inject(Router);

  ngOnInit(): void {
    this.getCurrentUserData();
  }

  getCurrentUserData(): void {
    this.user = this.userService.getUserData();
    this.setDataToForm(this.user);
  }

  saveProfile(): void {
    const formData = {
      name: this.editProfileForm.name().value(),
      age: this.editProfileForm.age().value(),
    };
    this.userService.updateUserData(formData).subscribe((res) => {
      this.auth.logout();
      this.router.navigate(['login']);
    });
  }

  setDataToForm(data: UserTokenData): void {
    this.editProfileForm.name().setControlValue(data.name);
    this.editProfileForm.age().setControlValue(data.age);
  }
}
