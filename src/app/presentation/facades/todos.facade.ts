import { Injectable } from '@angular/core';
import { CreateTodo } from 'src/app/core/use-cases/create-todo.use-case';
import { DeleteTodo } from 'src/app/core/use-cases/delete-todo.use-case';
import { UpdateTodo } from 'src/app/core/use-cases/update-todo.use-case';
import { GetTodosWithCategory } from 'src/app/core/use-cases/get-todos-with-category.use-case';
import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';

import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';
import { Category } from 'src/app/core/models/shared/category.model';
import { Result } from 'src/app/core/models/shared/result.model';
import { Todo } from 'src/app/core/models/shared/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosFacade {

  constructor(
    private createTodo: CreateTodo,
    private deleteTodo: DeleteTodo,
    private updateTodo: UpdateTodo,
    private getTodosWithCategory: GetTodosWithCategory,
    private getCategories: GetCategories
  ) {}

  async getTodos(): Promise<TodoWithCategory[]> {
    return this.getTodosWithCategory.execute();
  }

  async getCategoriesList(): Promise<Category[]> {
    return this.getCategories.execute();
  }

  async create(title: string, categoryId?: number): Promise<Result<void>> {
    return this.createTodo.execute({ title, categoryId });
  }

  async delete(id: number): Promise<Result<void>> {
    return this.deleteTodo.execute({ id });
  }

  async update(todo: Todo): Promise<Result<void>> {
    return this.updateTodo.execute(todo);
  }

}
