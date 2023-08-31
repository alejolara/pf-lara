export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: string;
  precio: number;
}
export interface CreateCursoData {
  nombre: string;
  descripcion: string;
  duracion: string;
  precio: number;
}
export interface UpdateCursoData {
  nombre?: string;
  descripcion?: string;
  duracion?: string;
  precio?: number;
}
