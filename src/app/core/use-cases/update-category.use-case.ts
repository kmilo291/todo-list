import { Injectable } from "@angular/core";
import { TodoRepository } from "../ports/todo.repository";
import { Result } from "../models/shared/result.model";
import { UpdateTodoDto } from "../models/dtos/update-todo.dto";
import { CategoryRepository } from "../ports/category.repository";
import { UpdateCategoryDto } from "../models/dtos/update-category.dto";

@Injectable({ providedIn: 'root' })
export class UpdateCategory {

  constructor(private repo: CategoryRepository) {}

  async execute(category: UpdateCategoryDto): Promise<Result<void>> {

    if (!category.id) {
      return { success: false, error: 'Id inválido' };
    }

    try {
      await this.repo.update(category);
      return { success: true };
    } catch {
      return { success: false, error: 'No se pudo actualizar' };
    }
  }
}
