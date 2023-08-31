import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { AlumnosService } from '../../alumno.service';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styles: [
  ]
})
export class AlumnoDetailComponent {
  public alumno: Alumno | null = null;
  public alumnoId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private AlumnosService: AlumnosService,
  ) {
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'alumnos']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    } else {
      this.alumnoId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadAlumno();
    }
  }

  loadAlumno(): void {
    if (this.alumnoId) {

      this.AlumnosService.getAlumnoById(this.alumnoId).subscribe({
      })
    }

  }
}
