import { Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { TodoRepository } from "../ports/todo.repository.ts";

@Injectable({ providedIn: 'root' })
export class CreateTodo {

  constructor(private repo: TodoRepository) {}

  async execute(todo: Todo) {
    return this.repo.save(todo);
  }
}
