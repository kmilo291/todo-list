import { Component } from '@angular/core';
import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';
import { GetTodosWithCategory } from 'src/app/core/use-cases/get-todos-with-category.use-case';
import { CreateTodo } from 'src/app/core/use-cases/create-todo.use-case';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  standalone: false
})
export class TodosPage {

  todos: TodoWithCategory[] = [];

  constructor(
    private getTodosWithCategory: GetTodosWithCategory,
    private createTodo: CreateTodo
  ) {}

  async ionViewWillEnter() {
    await this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.getTodosWithCategory.execute();
  }

  async addTodo() {

    const result = await this.createTodo.execute({
      title: 'Nuevo Todo',
      categoryId: 1
    });

    if (!result.success) {
      console.error(result.error);
      return;
    }

    await this.loadTodos();
  }

}
