import { Injectable } from '@angular/core';
import { CategoryRepository } from '../ports/category.repository';
import { TodoWithCategory } from '../models/todo-with-category.model';
import { TodoRepository } from '../ports/todo.repository';

@Injectable({ providedIn: 'root' })
export class GetTodosWithCategory {

  constructor(
    private todoRepo: TodoRepository,
    private categoryRepo: CategoryRepository
  ) {}

  async execute(): Promise<TodoWithCategory[]> {

    const [todos, categories] = await Promise.all([
      this.todoRepo.getAll(),
      this.categoryRepo.getAll()
    ]);

    return todos.map(todo => ({
      ...todo,
      category: categories.find(c => c.id === todo.categoryId)
    }));
  }
}
