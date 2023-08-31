import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/dashboard/pages/alumnos/models';

@Pipe({
  name: 'fullNameAlumno'
}) 
export class FullNameAlumnoPipe implements PipeTransform {
transform(alumno: Alumno, ...args: unknown[]): unknown {
    const isUppercase = args[0] === 'uppercase';
    const fullName = `${alumno.nombre} ${alumno.apellido}`;
    return isUppercase ? fullName.toUpperCase() : fullName;
    }
}
 