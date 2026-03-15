import { Category } from 'src/app/core/models/shared/category.model';
import { CategoryModalComponent } from './category-modal.component';
import { Component, computed, signal } from '@angular/core';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';
import { ModalController, SegmentCustomEvent } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { TodoFilterService } from '../../services/todo-filter.service';
import { TodosFacade } from '../../facades/todos.facade';
import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';
import { AlertController } from '@ionic/angular';
import { Todo } from 'src/app/core/models/shared/todo.model';

type TodoFilter = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  standalone: false
})
export class TodosPage {

  categories: Category [] = [];
  selectedCategoryId!: number;
  selectedCategoryFilter = signal<number | null>(null);
  todos = signal<TodoWithCategory[]>([]);
  searchTerm = signal('');
  currentStatus = signal<TodoFilter>('all');
  filteredTodos = computed(() => {

    const todos = this.todos();
    const search = this.searchTerm();
    const status = this.currentStatus();
    const category = this.selectedCategoryFilter();

    return this.todoFilterSrv.apply({
      todos,
      search,
      status,
      categoryId: category
    });

  });


  constructor(
    private todosFacade: TodosFacade,
    private createCategory: CreateCategory,
    private toastSrv: ToastService,
    private modalCtrl: ModalController,
    private todoFilterSrv: TodoFilterService,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.loadTodos();
    await this.loadCategories();
  }

  onCategoryFilterChanged(categoryId: number | null) {
    this.selectedCategoryFilter.set(categoryId);
  }

   async loadCategories() {
    this.categories = await this.todosFacade.getCategoriesList();
  }

  async loadTodos() {
    this.todos.set(await this.todosFacade.getTodos());
  }

  async addTodo() {

    const result = await this.todosFacade.create("Nuevo todo", this.selectedCategoryFilter()!);

    if (!result.success) {
      console.error(result.error);
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }

    await this.loadTodos();
  }


  async delete(todo: Todo) {

    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Deseas eliminar ${todo.title}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {

            const result = await this.todosFacade.delete(todo.id);

            if (!result.success) {
              this.toastSrv.error(result.error ?? "Error general");
              return;
            }

            await this.loadTodos();
          }
        }
      ]
    });

    await alert.present();
  }

  async changeCategory(todo: TodoWithCategory, categoryId: number) {

    const updatedTodo = {
      ...todo,
      categoryId
    };

    const result = await this.todosFacade.update(updatedTodo);

    if (!result.success) {
      console.error(result.error);
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }

    await this.loadTodos();
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
      const updatedTodo = {
        ...todo,
        categoryId: data.categoryId,
        completed: data.completed,
        title: data.title
      };
      const result = await this.todosFacade.update(updatedTodo);
      if (!result.success) {
        this.toastSrv.error(result.error ?? "Error general");
        return;
      }
      await this.loadTodos();
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
    if (data && data.title && data.categoryId) {
      const result = await this.todosFacade.create(data.title, data.categoryId);

      if (!result.success) {
        this.toastSrv.error(result.error ?? "Error general");
        return;
      }
      await this.loadTodos();
    }
    if (data && data.newCategory) {
      await this.createCategory.execute(data.newCategory);
      await this.loadCategories();
    }
  }

  async updateTodoTitle(todo: TodoWithCategory, newTitle: string) {
    const updatedTodo = {
      ...todo,
      title: newTitle
    };
    const result = await this.todosFacade.update(updatedTodo);
    if (!result.success) {
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }
    await this.loadTodos();
  }

  async updateTodoStatus(todo: TodoWithCategory, completed: boolean) {
    const updatedTodo = {
      ...todo,
      completed
    };
    const result = await this.todosFacade.update(updatedTodo);
    if (!result.success) {
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }
    await this.loadTodos();
  }

  onSegmentChanged(event: SegmentCustomEvent) {
    this.currentStatus.set(event.detail.value as TodoFilter);
  }

}
