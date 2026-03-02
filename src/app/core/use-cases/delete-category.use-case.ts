import { Injectable } from '@angular/core';
import { CategoryRepository } from '../ports/category.repository';
import { DeleteCategoryDto } from '../models/dtos/delete-category.dto';
import { Result } from '../models/shared/result.model';


@Injectable({ providedIn: 'root' })
export class DeleteCategory {

  constructor(private repo: CategoryRepository) {}

  async execute(data: DeleteCategoryDto): Promise<Result<void>> {

    if (!data.id || data.id <= 0) {
      return {
        success: false,
        error: 'Id inválido'
      };
    }

    try {
      await this.repo.delete(data.id);
      return { success: true };
    } catch {
      return {
        success: false,
        error: 'No se pudo eliminar la categoria'
      };
    }
  }
}
