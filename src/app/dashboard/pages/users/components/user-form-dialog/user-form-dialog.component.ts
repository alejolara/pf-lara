import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noHomeroValidator } from 'src/app/shared/utils/form-validators';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent {
  editingUser?: User;
  otroValor = "";
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
    noHomeroValidator(),
  ]);

  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required]);
  passwordControl = new FormControl<string | null>(null, [Validators.required]);

  roleControl = new FormControl<string| null>(null, [Validators.required]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    role: this.roleControl,
  });

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (this.data) {
      if (this.data.otroValor) {
        this.userForm.get('name')?.disable();
        this.userForm.get('surname')?.disable();
        this.userForm.get('password')?.disable();
        this.userForm.get('email')?.disable();
        this.userForm.get('role')?.disable();

        this.otroValor = this.data.otroValor;
        this.nameControl.setValue(this.data.userToEdit.name);
        this.surnameControl.setValue(this.data.userToEdit.surname);
        this.passwordControl.setValue(this.data.userToEdit.password);
        this.emailControl.setValue(this.data.userToEdit.email);
        this.roleControl.setValue(this.data.userToEdit.role)
      }else{
        this.editingUser = this.data;
        this.nameControl.setValue(this.data.name);
        this.surnameControl.setValue(this.data.surname);
        this.passwordControl.setValue(this.data.password);
        this.emailControl.setValue(this.data.email);
        this.roleControl.setValue(this.data.role)
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      const payload: any = {
        ...this.userForm.value
      }

      if (this.editingUser) {
        payload['token'] = this.editingUser.token;
      }

      this.dialogRef.close(payload);
    }
  }
}
