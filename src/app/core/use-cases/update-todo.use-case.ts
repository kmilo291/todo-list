import { Injectable } from "@angular/core";
import { TodoRepository } from "../ports/todo.repository";
import { Result } from "../models/shared/result.model";
import { UpdateTodoDto } from "../models/dtos/update-todo.dto";

@Injectable({ providedIn: 'root' })
export class UpdateTodo {

  constructor(private repo: TodoRepository) {}

  async execute(todo: UpdateTodoDto): Promise<Result<void>> {

    if (!todo.title.trim()) {
      return { success: false, error: 'Título inválido' };
    }

    try {
      await this.repo.update(todo);
      return { success: true };
    } catch {
      return { success: false, error: 'No se pudo actualizar' };
    }
  }
}
