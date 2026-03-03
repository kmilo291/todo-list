import { Injectable } from '@angular/core';
import { TodoRepository } from '../ports/todo.repository';
import { Todo } from '../models/shared/todo.model';
import { CreateTodoDto } from '../models/dtos/create-todo.dto';
import { Result } from '../models/shared/result.model';
import { CategoryRepository } from '../ports/category.repository';


@Injectable({ providedIn: 'root' })
export class CreateTodo {

  constructor(private TodoRepo: TodoRepository, private categoryRepo: CategoryRepository) {}

async execute(data: CreateTodoDto): Promise<Result<void>> {

  if (!data.title.trim()) {
    return {
      success: false,
      error: 'El título no puede estar vacío'
    };
  }

  try {

    let categoryId = data.categoryId;

    //Si no viene categoría, seleccionar una al azar
    if (!categoryId) {
      const categories = await this.categoryRepo.getAll();

      if (!categories.length) {
        return {
          success: false,
          error: 'No existen categorías disponibles'
        };
      }

      const randomIndex = Math.floor(Math.random() * categories.length);
      categoryId = categories[randomIndex].id;
    }

    const todo: Todo = {
      id: Date.now(),
      completed: false,
      title: data.title,
      categoryId
    };

    await this.TodoRepo.save(todo);

    return { success: true };

  } catch {
    return {
      success: false,
      error: 'No se pudo guardar el Todo'
    };
  }
}
}
