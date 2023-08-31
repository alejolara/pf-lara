import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateInscripcionPayload, Inscripcion, InscripcionWithCursoAndAlumno } from '../models';
import { Curso } from '../../cursos/interface/cursos.interface';
import { Alumno } from '../../alumnos/models';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: InscripcionWithCursoAndAlumno[] }>(),
    'Load Inscripciones Failure': props<{ error: HttpErrorResponse }>(),

    'Load Curso Options': emptyProps(),
    'Load Curso Options Success': props<{ data: Curso[] }>(),
    'Load Curso Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Alumno Options': emptyProps(),
    'Load Alumno Options Success': props<{ data: Alumno[] }>(),
    'Load Alumno Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscripcion': props<{ payload: CreateInscripcionPayload }>(),
    'Create Inscripcion Success': props<{ data: Inscripcion }>(),
    'Create Inscripcion Failure': props<{ error: HttpErrorResponse }>(),
  }
});
