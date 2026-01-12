import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Field, form, required } from '@angular/forms/signals';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-edit-profile',
  imports: [MatFormField, MatLabel, MatError, MatInput, MatButton, RouterLink, Field],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfile {

  userService = inject(User);
  editProfileModel = signal({
    name: '',
    age: '',
  });

  editProfileForm = form(this.editProfileModel);

  protected saveProfile() {
    const formData = {
      name: this.editProfileForm.name().value(),
      age: this.editProfileForm.age().value(),
    };
    this.userService.updateUserData(formData).subscribe((res) => {
      console.log(res);
    });
  }
}
