import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from '../core/guards/admin.guard';
import { Curso } from './pages/cursos/interface/cursos.interface';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./pages/cursos/curso.module').then(
            (m) => m.CursoModule
          ),
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () =>
          import('./pages/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
