import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoFormDialogComponent } from './components/alumno-form-dialog/alumno-form-dialog.component';
import { Alumno } from './models';
import { AlumnosService } from './alumno.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: [],
})
export class AlumnosComponent implements OnDestroy {
  public alumnos: Observable<Alumno[]>;
  public destroyed = new Subject<boolean>();

  public loading = false;
  constructor(private matDialog: MatDialog, private AlumnosService: AlumnosService) {
    this.AlumnosService.loadAlumnos();
    this.alumnos = this.AlumnosService.getAlumnos();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateAlumno(): void {
    this.matDialog
      .open(AlumnoFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.AlumnosService.createAlumno({
              nombre: v.nombre,
              email: v.email,
              password: v.password,
              apellido: v.apellido,
              dni: v.dni,
            });
          }
        },
      });
  }

  onDeleteAlumno(AlumnoToDelete: Alumno): void {
    if (confirm(`¿Está seguro de eliminar a ${AlumnoToDelete.nombre}?`)) {
      this.AlumnosService.deleteAlumnoById(AlumnoToDelete.id);
    }
  }

  onEditAlumno(alumnoToEdit: Alumno): void {
    this.matDialog
      .open(AlumnoFormDialogComponent, {
        data: alumnoToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (alumnoUpdated) => {
          if (alumnoUpdated) {
            this.AlumnosService.updateAlumnoById(alumnoToEdit.id, alumnoUpdated);
          }
        },
      });
  }
}
