import { Injectable } from '@angular/core';
import { TodoRepository } from '../ports/todo.repository';
import { Todo } from '../models/entities/todo.model';
import { CreateTodoDto } from '../models/dtos/create-todo.dto';

@Injectable({ providedIn: 'root' })
export class CreateTodo {

  constructor(private repo: TodoRepository) {}

  async execute(data: CreateTodoDto): Promise<void> {

    const todo: Todo = {
        id: Date.now(),
        completed: false,
        ...data
      };

    await this.repo.save(todo);
  }
}
