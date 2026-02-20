import { Injectable } from "@angular/core";
import { TodoRepository } from "../ports/todo.repository";
import { Result } from "../models/shared/result.model";
import { Todo } from "../models/shared/todo.model";

@Injectable({ providedIn: 'root' })
export class UpdateTodo {

  constructor(private repo: TodoRepository) {}

  async execute(todo: Todo): Promise<Result<void>> {

    if (!todo.id) {
      return { success: false, error: 'Id inválido' };
    }

    try {
      await this.repo.update(todo);
      return { success: true };
    } catch {
      return { success: false, error: 'No se pudo actualizar' };
    }
  }
}
