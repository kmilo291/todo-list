import { Component, OnInit } from '@angular/core';
import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';
import { GetTodosWithCategory } from 'src/app/core/use-cases/get-todos-with-category.use-case';
import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { Category } from 'src/app/core/models/shared/category.model';
import { CreateTodo } from 'src/app/core/use-cases/create-todo.use-case';
import { DeleteTodo } from 'src/app/core/use-cases/delete-todo.use-case';
import { UpdateTodo } from 'src/app/core/use-cases/update-todo.use-case';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  standalone: false
})
export class TodosPage {

  todos: TodoWithCategory [] = [];
  categories: Category    [] = [];
  selectedCategoryId!: number;

  constructor(
    private getTodosWithCategory: GetTodosWithCategory,
    private createTodo: CreateTodo,
    private deleteTodo: DeleteTodo,
    private updateTodo: UpdateTodo,
    private getCategories: GetCategories
  ) {}

  async ionViewWillEnter() {
    await this.loadTodos();
    await this.loadCategories();
  }

   async loadCategories() {
    this.categories = await this.getCategories.execute();
    console.log(this.categories)
  }

  async loadTodos() {
    this.todos = await this.getTodosWithCategory.execute();
  }

  async addTodo() {

    if (!this.selectedCategoryId) {
      console.error('Debe seleccionar categoría');
      return;
    }

    const result = await this.createTodo.execute({
      title: 'Nuevo Todo',
      categoryId: this.selectedCategoryId
    });

    if (!result.success) {
      console.error(result.error);
      return;
    }

    await this.loadTodos();
  }


  async delete(idTodo: number){
    const result = await this.deleteTodo.execute({ id: idTodo });

    if (!result.success) {
      console.error(result.error);
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
      return;
    }

    await this.loadTodos();
  }



}
