import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { CursoComponent } from './curso.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { CursoFormDialogComponent } from './curso-form-dialog/curso-form-dialog.component';


@NgModule({
  declarations: [
    CursoComponent,
    CursoFormDialogComponent,

  ],
  imports: [
    CommonModule,
    CursoRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [CursoComponent],
  providers: [
    {
      provide: 'IS_DEV',
      useValue: false,
    },

  ],

})
export class CursoModule { }
