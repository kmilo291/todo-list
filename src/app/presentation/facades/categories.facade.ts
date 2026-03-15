import { Injectable } from '@angular/core';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';
import { DeleteCategory } from 'src/app/core/use-cases/delete-category.use-case';
import { UpdateCategory } from 'src/app/core/use-cases/update-category.use-case';
import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { Category } from 'src/app/core/models/shared/category.model';
import { Result } from 'src/app/core/models/shared/result.model';
import { UpdateCategoryDto } from 'src/app/core/models/dtos/update-category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesFacade {

  constructor(
    private createCategory: CreateCategory,
    private deleteCategory: DeleteCategory,
    private updateCategory: UpdateCategory,
    private getCategories: GetCategories
  ) {}

  async getAll(): Promise<Category[]> {
    return this.getCategories.execute();
  }

  async create(name: string, color: string): Promise<void> {
    await this.createCategory.execute({ name, color });
  }

  async delete(id: number): Promise<Result<void>> {
    return this.deleteCategory.execute({ id });
  }

  async update(category: UpdateCategoryDto): Promise<Result<void>> {
    return this.updateCategory.execute(category);
  }

}
