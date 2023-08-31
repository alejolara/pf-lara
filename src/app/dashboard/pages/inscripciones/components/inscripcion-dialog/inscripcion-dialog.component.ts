import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscripcionActions } from '../../store/inscripcion.actions';
import { Alumno } from '../../../alumnos/models';
import { selectAlumnoOptions, selectCursoOptions } from '../../store/inscripcion.selectors';
import { Observable } from 'rxjs';
import { Curso } from '../../../cursos/interface/cursos.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscripcion-dialog',
  templateUrl: './inscripcion-dialog.component.html',
  styles: [
  ]
})
export class InscripcionDialogComponent implements OnInit {

  cursoIdControl = new FormControl(null, Validators.required);
  alumnoIdControl = new FormControl(null, Validators.required);

  inscripcionForm = new FormGroup({
    cursoId: this.cursoIdControl,
    alumnoId: this.alumnoIdControl,
  });

  AlumnoOptions$: Observable<Alumno[]>;
  cursoOptions$: Observable<Curso[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<InscripcionDialogComponent>) {
    this.AlumnoOptions$ = this.store.select(selectAlumnoOptions);
    this.cursoOptions$ = this.store.select(selectCursoOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionActions.loadCursoOptions());
    this.store.dispatch(InscripcionActions.loadAlumnoOptions());
  }

  onSubmit(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscripcionActions.createInscripcion({ payload: this.inscripcionForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}
