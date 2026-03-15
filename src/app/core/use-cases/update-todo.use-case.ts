import { Injectable } from "@angular/core";
import { TodoRepository } from "../ports/todo.repository";
import { Result } from "../models/shared/result.model";
import { UpdateTodoDto } from "../models/dtos/update-todo.dto";

@Injectable({ providedIn: 'root' })
export class UpdateTodo {

  constructor(private repo: TodoRepository) {}

  async execute(todo: UpdateTodoDto): Promise<Result<void>> {

    if (!todo.title || !todo.title.trim()) {
      return {
        success: false,
        error: 'El título no puede estar vacío'
      };
    }

    if (!todo.categoryId) {
      return {
        success: false,
        error: 'Debes seleccionar una categoría'
      };
    }

    try {

      await this.repo.update({
        ...todo,
        title: todo.title.trim()
      });

      return { success: true };

    } catch {

      return {
        success: false,
        error: 'No se pudo actualizar'
      };

    }
  }
}
