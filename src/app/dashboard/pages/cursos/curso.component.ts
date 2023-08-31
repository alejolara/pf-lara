import { Component, OnDestroy, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { CursoService } from './curso.service';
import { Observable, take } from 'rxjs';
import { Curso } from './interface/cursos.interface';
import { MatDialog } from '@angular/material/dialog';
import { CursoFormDialogComponent } from './curso-form-dialog/curso-form-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './curso.component.html',
  styles: [
  ]
})
export class CursoComponent implements OnInit, OnDestroy {
  public data$: Observable<Curso[]>;

  public displayedColumns = ['id', 'nombre', 'precio','descripcion','duracion', 'actions'];

  constructor(private matDialog: MatDialog,private CursoService: CursoService) {
    this.data$ = this.CursoService.getCursos();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.CursoService.loadCursos();
  }

  onCreateCurso(): void {
    this.matDialog
      .open(CursoFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.CursoService.onCreateCurso({
              nombre: v.nombre,
              descripcion: v.descripcion,
              precio: v.precio,
              duracion: v.duracion,
            });
          }
        },
      });
  }

  onDelete(id: number): void {
    this.CursoService.deleteById(id);
  }
  @Input()
  dataSource: Curso[] = [];
}
