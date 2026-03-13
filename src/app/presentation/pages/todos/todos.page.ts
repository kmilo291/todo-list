import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';
import { GetTodosWithCategory } from 'src/app/core/use-cases/get-todos-with-category.use-case';
import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { Category } from 'src/app/core/models/shared/category.model';
import { CreateTodo } from 'src/app/core/use-cases/create-todo.use-case';
import { DeleteTodo } from 'src/app/core/use-cases/delete-todo.use-case';
import { UpdateTodo } from 'src/app/core/use-cases/update-todo.use-case';
import { ModalController, SegmentCustomEvent } from '@ionic/angular';
import { CategoryModalComponent } from './category-modal.component';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';

type TodoFilter = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  standalone: false
})
export class TodosPage {

  todos: TodoWithCategory [] = [];
  categories: Category    [] = [];
  selectedCategoryId!: number;
  searchTerm: string = '';
  selectedCategoryFilter: number | null = null;
  filteredTodos: TodoWithCategory[] = [];

  constructor(
    private getTodosWithCategory: GetTodosWithCategory,
    private createTodo: CreateTodo,
    private deleteTodo: DeleteTodo,
    private updateTodo: UpdateTodo,
    private getCategories: GetCategories,
    private createCategory: CreateCategory,
    private toastSrv: ToastService,
    private modalCtrl: ModalController
  ) {}

  async ionViewWillEnter() {
    await this.loadTodos();
    await this.loadCategories();
    this.filterTodos();
  }

   async loadCategories() {
    this.categories = await this.getCategories.execute();
    this.filterTodos();
  }

  async loadTodos() {
    this.todos = await this.getTodosWithCategory.execute();
    this.filterTodos();
  }

  async addTodo() {

    // if (this.selectedCategoryId == null) {
    //   this.toastSrv.warning("Debes seleccionar una categoría");
    //   console.error('Debes seleccionar categoría');
    //   return;
    // }

    const result = await this.createTodo.execute({
      title: 'Nuevo Todo',
      categoryId: this.selectedCategoryId,
      completed: false
    });

    if (!result.success) {
      console.error(result.error);
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }

    await this.loadTodos();
  }


  async delete(idTodo: number){
    const result = await this.deleteTodo.execute({ id: idTodo });

    if (!result.success) {
      console.error(result.error);
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }

    await this.loadTodos();
  }

  async changeCategory(todo: TodoWithCategory, categoryId: number) {

    const updatedTodo = {
      ...todo,
      categoryId
    };

    const result = await this.updateTodo.execute(updatedTodo);

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
      const result = await this.updateTodo.execute(updatedTodo);
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
      const result = await this.createTodo.execute({
        title: data.title,
        categoryId: data.categoryId,
        completed: data.completed
      });
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
    const result = await this.updateTodo.execute(updatedTodo);
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
    const result = await this.updateTodo.execute(updatedTodo);
    if (!result.success) {
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }
    await this.loadTodos();
  }

  filterTodos() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTodos = this.todos.filter(todo => {
      const matchesName = todo.title.toLowerCase().includes(term);
      const matchesCategory = todo.category?.name.toLowerCase().includes(term);
      return matchesName || matchesCategory;
    });
  }

  onSegmentChanged(event: SegmentCustomEvent) {

     const status = event.detail.value as TodoFilter;

    if(status === 'all') {
      this.filteredTodos = this.todos;
      return;
    }

    this.filteredTodos = this.todos.filter(todo => {
      const matchesStatus = status === 'completed' ? todo.completed : !todo.completed;
      return matchesStatus;
    });
  }

}
