import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcion from './inscripcion.reducer';

export const selectInscripcionState = createFeatureSelector<fromInscripcion.State>(
  fromInscripcion.inscripcionFeatureKey
);


export const selectInscripciones = createSelector(selectInscripcionState, (state) => state.data)

export const selectAlumnoOptions = createSelector(selectInscripcionState, (state) => state.AlumnoOptions)
export const selectCursoOptions = createSelector(selectInscripcionState, (state) => state.cursoOptions)
