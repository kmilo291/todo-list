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

    if (!data.title.trim()) {
      return {
        success: false,
        error: 'El título no puede estar vacío'
      };
    }

    let categoryId = data.categoryId;

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
      id: this.idGenerator.generate(),
      title: data.title,
      completed: false,
      categoryId
    };

    await this.todoRepo.save(todo);

    return { success: true };
  }
}
