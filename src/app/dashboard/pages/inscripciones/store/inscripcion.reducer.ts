import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { InscripcionWithCursoAndAlumno } from '../models';
import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/interface/cursos.interface';

export const inscripcionFeatureKey = 'inscripcion';

export interface State {
  data: InscripcionWithCursoAndAlumno[];
  AlumnoOptions: Alumno[];
  cursoOptions: Curso[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  AlumnoOptions: [],
  cursoOptions: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(InscripcionActions.loadInscripciones, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscripcionActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),

  on(InscripcionActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),

  on(InscripcionActions.loadAlumnoOptions, (state) => state),
  on(InscripcionActions.loadAlumnoOptionsSuccess, (state, action) => {
    return {
      ...state,
      AlumnoOptions: action.data,
    }
  }),

  on(InscripcionActions.loadCursoOptions, (state) => state),
  on(InscripcionActions.loadCursoOptionsSuccess, (state, action) => {
    return {
      ...state,
      cursoOptions: action.data,
    }
  })

);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

