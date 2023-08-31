import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscripcionPayload, Inscripcion, InscripcionWithCursoAndAlumno } from '../models';
import { environment } from 'src/environments/environment';
import { AlumnosService } from '../../alumnos/alumno.service';
import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/interface/cursos.interface';
import { Store } from '@ngrx/store';


@Injectable()
export class InscripcionEffects {

  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadInscripciones),

      concatMap(() =>
        this.getInscripcionesFromDB().pipe(

          map(data => InscripcionActions.loadInscripcionesSuccess({ data })),

          catchError(error => of(InscripcionActions.loadInscripcionesFailure({ error }))))
      )
    );
  });

  loadAlumnoOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadAlumnoOptions),

      concatMap(() =>
        this.getAlumnoOptions().pipe(

          map(data => InscripcionActions.loadAlumnoOptionsSuccess({ data })),

          catchError(error => of(InscripcionActions.loadAlumnoOptionsFailure({ error }))))
      )
    );
  });

  loadCursoOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadCursoOptions),

      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCursoOptions().pipe(

          map(data => InscripcionActions.loadCursoOptionsSuccess({ data })),

          catchError(error => of(InscripcionActions.loadCursoOptionsFailure({ error }))))
      )
    );
  });


  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.createInscripcion),


      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createInscripcion(action.payload).pipe(

          map(data => InscripcionActions.createInscripcionSuccess({ data })),

          catchError(error => of(InscripcionActions.createInscripcionFailure({ error }))))
      )
    );
  });

  createInscripcionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.createInscripcionSuccess),
      map(() => this.store.dispatch(InscripcionActions.loadInscripciones()))
    );
  }, { dispatch: false });


  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getInscripcionesFromDB(): Observable<InscripcionWithCursoAndAlumno[]> {
    return this.httpClient.get<InscripcionWithCursoAndAlumno[]>(environment.baseApiUrl + '/inscripciones?_expand=curso&_expand=alumno')
  }

  private getAlumnoOptions(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(environment.baseApiUrl + '/alumnos')
  }

  private getCursoOptions(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseApiUrl + '/cursos');
  }

  private createInscripcion(payload: CreateInscripcionPayload): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(environment.baseApiUrl + '/inscripciones', payload)
  }
}
