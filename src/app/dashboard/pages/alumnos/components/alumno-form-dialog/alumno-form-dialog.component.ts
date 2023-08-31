import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noHomeroValidator } from 'src/app/shared/utils/form-validators';
import { Alumno } from '../../models';

@Component({
  selector: 'app-alumno-form-dialog',
  templateUrl: './alumno-form-dialog.component.html',
  styleUrls: [],
})
export class AlumnoFormDialogComponent {
  editingAlumno?: Alumno;
  miVariableBooleana=false;
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
    noHomeroValidator(),
  ]);

  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required]);
  passwordControl = new FormControl<string | null>(null, [Validators.required]);
  dniControl = new FormControl<number | null>(null, [Validators.required]);

  alumnoForm = new FormGroup({
    nombre: this.nameControl,
    apellido: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    dni: this.dniControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AlumnoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Alumno,
  ) {

    if (this.data) {
      this.editingAlumno = this.data;
      this.miVariableBooleana = true;
      this.nameControl.setValue(this.data.nombre);
      this.surnameControl.setValue(this.data.apellido);
      this.passwordControl.setValue(this.data.password);
      this.emailControl.setValue(this.data.email);
      this.dniControl.setValue(this.data.dni);
    }
  }

  onSubmit(): void {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.alumnoForm.value);
    }
  }
}
