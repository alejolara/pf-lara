import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscripcionActions } from './store/inscripcion.actions';
import { InscripcionWithCursoAndAlumno } from './models';
import { selectInscripciones } from './store/inscripcion.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionDialogComponent } from './components/inscripcion-dialog/inscripcion-dialog.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styles: [],
})
export class InscripcionesComponent implements OnInit {
  displayedColumns = ['id', 'curso', 'alumno', 'total'];
  inscripciones$: Observable<InscripcionWithCursoAndAlumno[]>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.inscripciones$ = this.store.select(selectInscripciones)
  }

  onAdd(): void {
    this.matDialog.open(InscripcionDialogComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionActions.loadInscripciones())
  }
}
