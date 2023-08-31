import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take , delay, map, of, mergeMap} from 'rxjs';
import { CreateCursoData, UpdateCursoData, Curso } from './interface/cursos.interface';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private _cursos$ = new BehaviorSubject<Curso[]>([]);

  private cursos$ = this._cursos$.asObservable();
  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  getCursos(): Observable<Curso[]> {
    return this._cursos$.asObservable();
  }

  loadCursos(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Curso[]>(environment.baseApiUrl + '/cursos', {
      headers: new HttpHeaders({
        'token': '12345678910'
      }),
    }).subscribe({
      next: (response) => {
        this._cursos$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los cursos');
      },
      complete: () => {
        this._isLoading$.next(false);
      },
    })
  }

  onCreateCurso(curso: CreateCursoData): void {
    this.httpClient.post<Curso>(environment.baseApiUrl  + '/cursos', { ...curso })
      .pipe(
        mergeMap((userCreate) => this.cursos$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, userCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._cursos$.next(arrayActualizado);
          this.notifier.showSuccess('Curso creado');
        }
      })
  }
  
  deleteById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/cursos/' + id)
    .pipe(

    ).subscribe({
      next: (arrayActualizado) => this.loadCursos(),
    })
    this.notifier.showSuccess('cursos eliminado');

  }

}
