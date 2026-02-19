import { Injectable } from '@angular/core';
import { TodoRepository } from '../ports/todo.repository';
import { Todo } from '../models/entities/todo.model';
import { CreateTodoDto } from '../models/dtos/create-todo.dto';
import { Result } from '../models/entities/result.model';


@Injectable({ providedIn: 'root' })
export class CreateTodo {

  constructor(private repo: TodoRepository) {}

  async execute(data: CreateTodoDto): Promise<Result<void>> {

    if (!data.title.trim()) {
      return {
        success: false,
        error: 'El título no puede estar vacío'
      };
    }

    try {

      const todo: Todo = {
        id: Date.now(),
        completed: false,
        ...data
      };

      await this.repo.save(todo);

      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: 'No se pudo guardar el Todo'
      };
    }
  }
}
