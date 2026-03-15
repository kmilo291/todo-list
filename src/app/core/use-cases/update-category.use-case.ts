import { Injectable } from "@angular/core";
import { Result } from "../models/shared/result.model";
import { CategoryRepository } from "../ports/category.repository";
import { UpdateCategoryDto } from "../models/dtos/update-category.dto";

@Injectable({ providedIn: 'root' })
export class UpdateCategory {

  constructor(private repo: CategoryRepository) {}

  async execute(category: UpdateCategoryDto): Promise<Result<void>> {

    if (!category.name.trim()) {
      return { success: false, error: 'El nombre no puede estar vacío' };
    }

    try {
      await this.repo.update(category);
      return { success: true };
    } catch {
      return { success: false, error: 'No se pudo actualizar' };
    }
  }
}
