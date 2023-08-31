import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/interface/cursos.interface';

export interface Inscripcion {
  id: number;
  cursoId: number;
  alumnoId: number;
}

export interface InscripcionWithCursoAndAlumno extends Inscripcion {
  curso: Curso;
  alumno: Alumno;
}

export interface CreateInscripcionPayload {
  cursoId: number | null;
  alumnoId: number | null;
}
