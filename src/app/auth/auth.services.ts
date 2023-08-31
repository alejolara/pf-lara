import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";
import { selectAuthUser } from "../store/auth/auth.selectors";

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authUser$ = this.store.select(selectAuthUser);

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private httpClient: HttpClient,
    private store: Store,
  ) {}



  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) => {

        if (usersResult.length) {
          const authUser = usersResult[0];
          this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }));
        }

        return !!usersResult.length
      })
    )
  }

  login(payload: LoginPayload): void {

    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }));
          this.router.navigate(['/dashboard']);

          localStorage.setItem('token', authUser.token);
        } else {
          this.notifier.showError('Email o contrasena invalida');
          this.store.dispatch(AuthActions.setAuthUser({ payload: null }));
        }
      },
      error: (err) => {

        if (err instanceof HttpErrorResponse) {
          let message = 'Ocurrio un error inespeado';
          if (err.status === 500) {
          }
          if (err.status === 401) {
            message = 'Email o contrasena invalida';
          }
          this.notifier.showError(message)
        }
      }
    })
  }

  public logout(): void {
    this.store.dispatch(AuthActions.setAuthUser({ payload: null }))
  }
}
