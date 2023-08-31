export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  dni: number;
}

export interface CreateAlumnoData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  dni: number;
}

export interface UpdateAlumnoData {
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
  dni?: number;
}
