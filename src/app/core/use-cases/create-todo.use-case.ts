import { Injectable } from '@angular/core';
import { TodoRepository } from '../ports/todo.repository.ts';
import { Todo } from '../models/todo.model';
import { CreateTodoDto } from '../models/create-todo.dto';

@Injectable({ providedIn: 'root' })
export class CreateTodo {

  constructor(private repo: TodoRepository) {}

  async execute(data: CreateTodoDto): Promise<void> {

    const todo: Todo = {
      id: Date.now(),
      ...data
    };

    await this.repo.save(todo);
  }
}
