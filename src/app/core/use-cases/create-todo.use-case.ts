import { Injectable } from '@angular/core';
import { TodoRepository } from '../ports/todo.repository';
import { Todo } from '../models/shared/todo.model';
import { CreateTodoDto } from '../models/dtos/create-todo.dto';
import { Result } from '../models/shared/result.model';
import { CategoryRepository } from '../ports/category.repository';
import { IdGeneratorPort } from '../ports/id-generator.port';


@Injectable({ providedIn: 'root' })
export class CreateTodo {

  constructor(private todoRepo: TodoRepository,
    private categoryRepo: CategoryRepository,
    private idGenerator: IdGeneratorPort
  ) {}

  async execute(data: CreateTodoDto): Promise<Result<void>> {

    if (!data.title || !data.title.trim()) {
      return {
        success: false,
        error: 'El título no puede estar vacío'
      };
    }

    if (!data.categoryId) {
      return {
        success: false,
        error: 'Debes seleccionar una categoría'
      };
    }

    const todo: Todo = {
      id: this.idGenerator.generate(),
      title: data.title.trim(),
      completed: false,
      categoryId: data.categoryId
    };

    await this.todoRepo.save(todo);

    return { success: true };
  }
}
