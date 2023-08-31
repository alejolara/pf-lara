import { Injectable } from '@angular/core';
import { CreateAlumnoData, UpdateAlumnoData, Alumno } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, of, take, mergeMap } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const ALUMNO_DB: Observable<Alumno[]> = of([
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@example.com",
    password: "perez",
    dni: 12345678
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@example.com",
    password: "maria",
    dni: 87654321
  },
  {
    id: 3,
    nombre: "Pedro",
    apellido: "Ramírez",
    email: "pedro.ramirez@example.com",
    password: "ramirez",
    dni: 56789012
  }
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private _alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private alumnos$ = this._alumnos$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();


  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadAlumnos(): void {
     
    this._isLoading$.next(true);
    this.httpClient.get<Alumno[]>(environment.baseApiUrl + '/alumnos', {
      headers: new HttpHeaders({
        'token': '12345678910'
      }),
    }).subscribe({
      next: (response) => {
        this._alumnos$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los alumnos');
      },
      complete: () => {
        this._isLoading$.next(false);
      },
    })
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  getAlumnoById(id: number) {
    return this.alumnos$.pipe(
      take(1),
      map(( alumnos ) =>  alumnos.find((u) => u.id === id)),
    )
  }

  createAlumno(alumno: CreateAlumnoData): void {
    this.httpClient.post<Alumno>(environment.baseApiUrl  + '/alumnos', { ...alumno })
      .pipe(
        mergeMap((userCreate) => this.alumnos$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, userCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._alumnos$.next(arrayActualizado);
          this.notifier.showSuccess('Alumno creado');
        }
      })
  }

  updateAlumnoById(id: number, AlumnoActualizado: UpdateAlumnoData): void {
    this.httpClient.put(environment.baseApiUrl + '/alumnos/' + id, AlumnoActualizado).subscribe({
      next: () => this.loadAlumnos(),
    })
    this.notifier.showSuccess('Alumno Actualizado');
    
  }

  deleteAlumnoById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/alumnos/' + id)
    .pipe(
  
    ).subscribe({
      next: (arrayActualizado) => this.loadAlumnos(),
    })
    this.notifier.showSuccess('Alumno eliminado');

  }
}
