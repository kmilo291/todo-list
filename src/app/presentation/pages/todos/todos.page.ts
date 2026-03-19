import { Component, signal } from '@angular/core';
import { Category } from 'src/app/core/models/shared/category.model';
import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';
import { Todo } from 'src/app/core/models/shared/todo.model';

import { ModalController, AlertController, SegmentCustomEvent } from '@ionic/angular';

import { TodosFacade } from '../../facades/todos.facade';
import { TodoFilterService } from '../../services/todo-filter.service';
import { ToastService } from '../../services/toast.service';
import { TodoEventsService } from '../../services/todo-events.service';

import { CategoryModalComponent } from './category-modal.component';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';

import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, map, startWith, switchMap, Subject, from, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

type TodoFilter = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  standalone: false
})
export class TodosPage {

  // STATE (Signals)
  searchTerm = signal('');
  currentStatus = signal<TodoFilter>('all');
  selectedCategoryFilter = signal<number | 'all'>('all');

  // SIGNAL → OBSERVABLE
  searchTerm$ = toObservable(this.searchTerm);
  status$ = toObservable(this.currentStatus);
  category$ = toObservable(this.selectedCategoryFilter);

  private addTodoAction$ = new Subject<any>();
  private deleteTodoAction$ = new Subject<Todo>();
  private updateTodoAction$ = new Subject<TodoWithCategory>();

  // REFRESH
  refresh$ = this.todoEvents.refresh$;

  //TODOS STREAM
  todos$ = this.refresh$.pipe(
    startWith(null),
    switchMap(() => this.todosFacade.getTodos$())
  );

  // FILTERED STREAM
  filteredTodos$ = combineLatest([
    this.todos$,
    this.searchTerm$,
    this.status$,
    this.category$
  ]).pipe(
    map(([todos, search, status, category]) =>
      this.todoFilterSrv.apply({
        todos,
        search,
        status,
        categoryId: category
      })
    )
  );

  categories: Category[] = [];

  constructor(
    private todosFacade: TodosFacade,
    private toastSrv: ToastService,
    private modalCtrl: ModalController,
    private todoFilterSrv: TodoFilterService,
    private alertCtrl: AlertController,
    private todoEvents: TodoEventsService,
    private createCategory: CreateCategory
  ) {

    // ADD TODO
    this.addTodoAction$.pipe(

      switchMap((eve: any) => {
        const categoryId  = eve?.categoryId;
        const todoTitle   = eve?.title;

        console.log(eve);

        if (categoryId === 'all') {
          this.toastSrv.warning('Debes seleccionar una categoría');
          return EMPTY;
        }

        return from(this.todosFacade.create(todoTitle, categoryId));
      }),
      tap(result => {
        if (!result.success) {
          this.toastSrv.error(result.error ?? "Error general");
          throw new Error();
        }
      }),
      tap(() => this.todoEvents.notifyRefresh()),
      catchError(() => EMPTY)
    ).subscribe();

    // DELETE TODO
    this.deleteTodoAction$.pipe(
      switchMap(todo => from(this.todosFacade.delete(todo.id))),
      tap(result => {
        if (!result.success) {
          this.toastSrv.error(result.error ?? "Error general");
          throw new Error();
        }
      }),
      tap(() => this.todoEvents.notifyRefresh()),
      catchError(() => EMPTY)
    ).subscribe();

    // UPDATE TODO
    this.updateTodoAction$.pipe(
      switchMap(todo => from(this.todosFacade.update(todo))),
      tap(result => {
        if (!result.success) {
          this.toastSrv.error(result.error ?? "Error general");
          throw new Error();
        }
      }),
      tap(() => this.todoEvents.notifyRefresh()),
      catchError(() => EMPTY)
    ).subscribe();
  }


  async ionViewWillEnter() {
    this.categories = await this.todosFacade.getCategoriesList();
  }


  onSegmentChanged(event: SegmentCustomEvent) {
    this.currentStatus.set(event.detail.value as TodoFilter);
  }

  onCategoryFilterChanged(value: any) {
    const parsed = value === 'all' ? 'all' : Number(value);
    debugger
    this.selectedCategoryFilter.set(parsed);
  }

  delete(todo: Todo) {
    this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Deseas eliminar ${todo.title}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.deleteTodoAction$.next(todo)
        }
      ]
    }).then(alert => alert.present());
  }

  changeCategory(todo: TodoWithCategory, categoryId: number) {
    this.updateTodoAction$.next({
      ...todo,
      categoryId
    });
  }

  updateTodoStatus(todo: TodoWithCategory, completed: boolean) {
    this.updateTodoAction$.next({
      ...todo,
      completed
    });
  }

  updateTodoTitle(todo: TodoWithCategory, newTitle: string) {
    this.updateTodoAction$.next({
      ...todo,
      title: newTitle
    });
  }

  async openCategoryModal(todo: TodoWithCategory) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: {
        categories: this.categories,
        selectedCategoryId: todo.categoryId,
        completed: todo.completed,
        todoTitle: todo.title,
        isNew: false
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && (
      data.categoryId !== todo.categoryId ||
      data.completed !== todo.completed ||
      data.title !== todo.title
    )) {
      this.updateTodoAction$.next({
        ...todo,
        categoryId: data.categoryId,
        completed: data.completed,
        title: data.title
      });
    }
  }

  async openNewTodoModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: {
        categories: this.categories,
        selectedCategoryId: null,
        completed: false,
        isNew: true
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    console.log("data", data);

    if (data?.title && data?.categoryId) {
      this.addTodoAction$.next({
        categoryId: '123',
        title: data.title,
      });
    }

    if (data?.newCategory) {
      await this.createCategory.execute(data.newCategory);
      this.categories = await this.todosFacade.getCategoriesList();
    }
  }
}
