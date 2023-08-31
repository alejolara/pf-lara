import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noHomeroValidator } from 'src/app/shared/utils/form-validators';
import { Curso } from '../interface/cursos.interface';

@Component({
  selector: 'app-curso-form-dialog',
  templateUrl: './curso-form-dialog.component.html',
  styleUrls: [],
})
export class CursoFormDialogComponent {
  editingCurso?: Curso;
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
    noHomeroValidator(),
  ]);

  descripcionControl = new FormControl<string | null>(null, [Validators.required]);
  duracionControl = new FormControl<string | null>(null, [Validators.required]);
  precioControl = new FormControl<number | null>(null, [Validators.required]);

  cursoForm = new FormGroup({
    nombre: this.nameControl,
    descripcion: this.descripcionControl,
    duracion: this.duracionControl,
    precio: this.precioControl,
  });

  constructor(
    private dialogRef: MatDialogRef<CursoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Curso
  ) {
    if (this.data) {
      this.editingCurso = this.data;
      this.nameControl.setValue(this.data.nombre);
      this.descripcionControl.setValue(this.data.descripcion);
      this.precioControl.setValue(this.data.precio);
      this.duracionControl.setValue(this.data.duracion);
    }
  }

  onSubmit(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.cursoForm.value);
    }
  }
}
